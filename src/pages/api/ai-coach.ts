import type { NextApiRequest, NextApiResponse } from 'next'

type RequestBody = {
  type: 'craving' | 'daily-hack' | 'alternative'
  trigger?: string
  intensity?: number
  currentAdvice?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, trigger, intensity, currentAdvice } = req.body as RequestBody

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured' })
  }

  try {
    let systemPrompt = ''
    let userPrompt = ''
    let temperature = 0.8
    let maxTokens = 150

    if (type === 'craving') {
      temperature = 0.6
      maxTokens = 100
      
      systemPrompt = `You are an elite metabolic health & sugar detox coach for the "AdioSugar" app. Provide ONE specific, actionable 15-20 second intervention to stop a sugar craving RIGHT NOW. Be direct, compassionate, and tactical. Never suggest sugary foods or complex prep.
Format: Single bold action step, followed by 1 short sentence explaining the neuro-chemical mechanism. Maximum 40 words.`
      
      const triggerContext = {
        hunger: 'genuine hunger or skipped meal',
        stress: 'work stress or anxiety',
        fatigue: 'afternoon energy crash',
        boredom: 'mindless scrolling or boredom',
        habit: 'habitual craving after meals'
      }[trigger || 'stress']

      const intensityLevel = {
        1: 'mild (easily distracted)',
        2: 'moderate (noticeable urge)',
        3: 'strong (hard to resist)',
        4: 'EMERGENCY (about to break)'
      }[intensity || 2]

      userPrompt = `User is experiencing a sugar craving from ${triggerContext}, intensity level: ${intensityLevel}. Give ONE tactical intervention they can execute immediately in 15-20 seconds.`
    } else if (type === 'daily-hack') {
      temperature = 0.85
      maxTokens = 100
      
      systemPrompt = `You are a behavioral psychology expert specializing in dopamine management and habit disruption for the "AdioSugar" app. Provide ONE daily 15-second psychological technique to prevent sugar cravings before they start. Focus on sensory tricks, cognitive reframing, or quick nervous-system resets. Be specific and immediate. Maximum 35 words.`
      userPrompt = `Generate a unique, highly practical anti-craving psychological hack that takes under 15 seconds to apply today.`
    } else if (type === 'alternative') {
      temperature = 0.7
      maxTokens = 100
      
      systemPrompt = `You are an emergency crisis intervention coach. The user does NOT have any ingredients, drinks, or items available. Provide a 100% zero-equipment alternative intervention using ONLY their body, breath, or mental focus. Do NOT repeat or reference the previous item-based advice. Must be doable anywhere, immediately. Maximum 35 words.`
      userPrompt = `Previous advice was: "${currentAdvice}". The user has NO items/ingredients. Give a pure zero-equipment physical, breathwork, or mental intervention they can do in 15 seconds instead.`
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
      throw new Error('OpenAI API request failed')
    }

    const data = await response.json()
    const advice = data.choices[0].message.content.trim()

    return res.status(200).json({ advice })
  } catch (error) {
    console.error('AI Coach Error:', error)
    return res.status(500).json({ error: 'Failed to generate advice' })
  }
}