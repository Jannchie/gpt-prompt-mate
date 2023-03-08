// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import HttpsProxyAgent from 'https-proxy-agent'
import { getToken } from './utils'
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const url = 'https://api.openai.com/v1/chat/completions'

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello!' }],
    }
    const token = getToken()
    const headers = {
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Bearer ${token}`,
    }
    const proxy = process.env.PROXY_URL
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      agent: proxy ? HttpsProxyAgent(proxy) : undefined,
    }
    const resp = await fetch(url, options)
    res.status(200).json(await resp.json())
    return
  }
  res.status(404).json({ message: 'Not found' })
}
