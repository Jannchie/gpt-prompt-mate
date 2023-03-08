
import { type Message } from '@/pages/api/chat'
import useSWR from 'swr'
import useSWRMutation, { type SWRMutationResponse } from 'swr/mutation'
export function useData () {
  const res = useSWR('/api/hello', async (url) => {
    const resp = await fetch(url)
    return await resp.json()
  })
  return res
}

export function getToken () {
  const localToken = localStorage.getItem('openai-token')
  if (localToken && localToken !== '') return localToken
  return process.env.OPENAI_API_KEY
}

interface Messages { messages: Message[] }

export function useChat (): SWRMutationResponse<any, Error, Messages> {
  const res = useSWRMutation('/api/chat', async (url, { arg }: { arg: Messages }) => {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: arg.messages,
        token: getToken(),
      }),
    })
    if (!resp.ok) {
      // eslint-disable-next-line no-console
      console.error(resp.statusText)
    }
    return await resp.json()
  })
  return res
}
