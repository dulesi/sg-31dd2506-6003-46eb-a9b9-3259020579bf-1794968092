import type { NextApiRequest, NextApiResponse } from 'next'

type RequestBody = {
  type: 'craving' | 'daily-hack' | 'alternative' | 'self-control' | 'mindset-assessment'
  trigger?: string
  intensity?: number
  currentAdvice?: string
  feeling?: string
  timing?: string
  supportType?: string
  aiContextSummary?: string
}

const triggerContextMap: Record<string, string> = {
  hunger: 'genuine hunger or skipped meal',
  stress: 'work stress or anxiety',
  fatigue: 'afternoon energy crash',
  boredom: 'mindless scrolling or boredom',
  habit: 'habitual craving after meals'
}

const intensityLevelMap: Record<number, string> = {
  1: 'mild (easily distracted)',
  2: 'moderate (noticeable urge)',
  3: 'strong (hard to resist)',
  4: 'EMERGENCY (about to break)'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, trigger, intensity, currentAdvice, feeling, timing, supportType, aiContextSummary }: RequestBody = req.body

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' })
  }

  try {
    let systemPrompt = ''
    let userPrompt = ''
    let temperature = 0.7
    let maxTokens = 100

    // Prepend user profile personalization if available
    const personalizationPrefix = aiContextSummary 
      ? `User Personalized Context: ${aiContextSummary}. Tailor your tone and response to align with their specific peak triggers, goals, and chosen support style. `
      : '';

    if (type === 'craving') {
      if (!trigger || !intensity) {
        return res.status(400).json({ error: 'Missing trigger or intensity' })
      }

      temperature = 0.6
      maxTokens = 100
      systemPrompt = personalizationPrefix + 'You are an elite metabolic health & sugar detox coach for the "AdioSugar" app. Provide ONE specific, actionable 15-20 second intervention to stop a sugar craving RIGHT NOW. Be direct, compassionate, and tactical. Never suggest sugary foods or complex prep. Format: Single bold action step, followed by 1 short sentence explaining the neuro-chemical mechanism. Maximum 40 words.'
      userPrompt = `User is experiencing a sugar craving from ${triggerContextMap[trigger]}, intensity level: ${intensityLevelMap[intensity]}. Give ONE tactical intervention they can execute immediately in 15-20 second intervention.`
    } else if (type === 'daily-hack') {
      temperature = 0.85
      maxTokens = 100
      systemPrompt = personalizationPrefix + 'You are a behavioral psychology expert specializing in dopamine management and habit disruption for the "AdioSugar" app. Provide ONE daily 15-second psychological technique to prevent sugar cravings before they start. Focus on sensory tricks, cognitive reframing, or quick nervous-system resets. Be specific and immediate. Maximum 35 words.'
      userPrompt = 'Generate a unique, highly practical anti-craving psychological hack that takes under 15 seconds to apply today.'
    } else if (type === 'alternative') {
      if (!currentAdvice) {
        return res.status(400).json({ error: 'Missing currentAdvice' })
      }

      temperature = 0.7
      maxTokens = 100
      systemPrompt = personalizationPrefix + 'You are an emergency crisis intervention coach. The user does NOT have any ingredients, drinks, or items available. Provide a 100% zero-equipment alternative intervention using ONLY their body, breath, or mental focus. Do NOT repeat or reference the previous item-based advice. Must be doable anywhere, immediately. Maximum 35 words.'
      userPrompt = `Previous advice was: "${currentAdvice}". The user has NO items/ingredients. Give a pure zero-equipment physical, breathwork, or mental intervention they can do in 15 seconds instead.`
    } else if (type === 'self-control') {
      temperature = 0.7
      maxTokens = 100
      systemPrompt = personalizationPrefix + 'You are an elite behavioral psychology coach for the "AdioSugar" app. The user has exhausted their emergency panic limit for the day. Provide a short, powerful psychological insight focused on building self-control, emotional regulation, and breaking the impulse loop. Maximum 40 words.'
      userPrompt = 'Generate a tactical self-control mindset hack to help strengthen discipline after multiple daily cravings.'
    } else if (type === 'mindset-assessment') {
      if (!feeling || !timing || !supportType) {
        return res.status(400).json({ error: 'Missing assessment parameters' })
      }

      temperature = 0.7
      maxTokens = 250
      systemPrompt = personalizationPrefix + 'You are an empathetic behavioral coach for the "AdioSugar" app. Generate a structured JSON response with exactly 3 keys: "biology", "community", "action". Do NOT use markdown formatting or numbered headers. Keep each section concise and actionable:\n- "biology": 2 sentences validating their feeling and explaining the dopamine/blood sugar connection\n- "community": 1-2 sentences sharing how others handle this state\n- "action": 1 clear 2-minute mindset shift or practical action\n\nOutput ONLY valid JSON, no additional text.'
      userPrompt = `User check-in: Feeling "${feeling}", started "${timing}", needs "${supportType}". Return structured JSON response.`
    } else {
      return res.status(400).json({ error: 'Invalid type' })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: maxTokens,
        temperature: temperature
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const advice = data.choices[0]?.message?.content?.trim()

    if (!advice) {
      throw new Error('No advice generated')
    }

    if (type === 'mindset-assessment') {
      try {
        const jsonAdvice = JSON.parse(advice)
        return res.status(200).json({ advice: jsonAdvice })
      } catch {
        return res.status(200).json({ advice })
      }
    }

    return res.status(200).json({ advice })
  } catch (error) {
    console.error('AI Coach Error:', error)
    return res.status(500).json({ error: 'Failed to generate advice' })
  }
}