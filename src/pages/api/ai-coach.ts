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

    if (type === 'craving') {
      systemPrompt = `You are an expert sugar detox coach. Provide ONE specific, actionable 15-20 second intervention to help someone overcome a sugar craving RIGHT NOW. Be direct, supportive, and practical. Format: Single clear instruction with reasoning in 2-3 sentences max.`
      
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

      userPrompt = `Person experiencing sugar craving from ${triggerContext}, intensity level: ${intensityLevel}. Give ONE tactical intervention they can do in 15-20 seconds.`
    } else if (type === 'daily-hack') {
      systemPrompt = `You are a behavioral psychology expert specializing in habit formation and sugar addiction. Provide ONE daily 15-second psychological technique to prevent sugar cravings. Be specific, evidence-based, and immediately actionable.`
      userPrompt = `Generate a unique daily anti-craving psychological hack that takes 15 seconds or less to implement. Focus on cognitive reframing, sensory tricks, or quick physical interventions.`
    } else if (type === 'alternative') {
      systemPrompt = `You are a crisis intervention coach. The person doesn't have the ingredients/items for the suggested intervention. Provide an INSTANT zero-equipment alternative using only their body, breath, or imagination. Must be doable anywhere, anytime.`
      userPrompt = `Original advice was: "${currentAdvice}". They don't have access to those items. Give a zero-equipment alternative intervention (breathing exercise, physical movement, mental technique) that takes 15-30 seconds.`
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
        max_tokens: 150,
        temperature: 0.8
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