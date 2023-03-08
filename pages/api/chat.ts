// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import HttpsProxyAgent from 'https-proxy-agent'
export interface ReqBody {
  messages: Message[]
  model?: string
  token?: string
}

export interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const url = 'https://api.openai.com/v1/chat/completions'
    const data = req.body
    if (!data) { res.status(400).json({ message: 'Bad request' }); return }
    if (!data.model) {
      data.model = 'gpt-3.5-turbo'
    }
    const headers = {
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Bearer ${data.token ?? process.env.OPENAI_API_KEY}`,
    }
    delete data.token
    const proxy = process.env.PROXY_URL
    const agent = proxy ? HttpsProxyAgent(proxy) : undefined
    const options = {
      agent,
      headers,
      method: 'POST',
      body: JSON.stringify(data),
    }
    const resp = await fetch(url, options)
    res.status(200).json(await resp.json())
    return
  }
  res.status(404).json({ message: 'Not found' })
}
