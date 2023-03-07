import { useChat } from '@/utils'
import { useState, useEffect } from 'react'
import { Container, Flex, TextField } from 'roku-ui'
import { type Message } from '../pages/api/chat'
import { MessageComponent } from './MessageComponent'

export function SceneBase ({ prompts }: { prompts: Message[] }) {
  const content = prompts[0].content
  const keys = Array.from(new Set(content.match(/\{(.+?)\}/g)))
  const [params, setParams] = useState<string[]>(keys?.map((d) => d) ?? [])
  const paramComponents = keys?.map((d, i) => {
    return (
      <TextField
        key={d}
        value={params[i]}
        setValue={(v) => {
          const newParams = [...params]
          newParams[i] = v
          setParams(newParams)
        }}
        placeholder={d}
        style={{ width: '100%' }}
      />
    )
  })
  const [msgs, setMsgs] = useState<Message[]>(prompts)

  useEffect(() => {
    let res = content
    for (let i = 0; i < keys.length; i++) {
      res = res.replaceAll(keys[i], params[i])
    }
    const newPrompts = prompts.map((d, i) => ({ ...d, content: i === 0 ? res : d.content }))
    if (newPrompts[0].content === msgs[0].content) return
    setMsgs(newPrompts)
  }, [content, prompts, keys, params, msgs])
  const [msg, setMsg] = useState('')
  const { data, trigger, reset, isMutating } = useChat()
  const [error, setError] = useState('')
  useEffect(() => {
    if (data) {
      if (data.choices) {
        setMsgs([...msgs, data.choices[0].message])
      } else {
        try {
          setError(data.error.message)
        } catch (e) {
          setError('Something went wrong')
        }
      }
      reset()
    }
  }, [data, msgs, reset, trigger])

  return (
    <Container style={{ height: '100vh', maxWidth: '60ch', paddingTop: '1rem', paddingBottom: '1rem' }}>
      <Flex direction="column" gap="0.5rem" justify="between" style={{ height: '100%' }}>
        { paramComponents }
        <Flex direction="column" gap="0.5rem" style={{ flexGrow: 1, overflow: 'scroll' }}>
          { msgs.map((d, i) => (
            <MessageComponent key={i} message={d} />
          )) }
          { isMutating && (
            <MessageComponent
              loading
              message={{
                role: 'assistant',
                content: '',
              }} />
          ) }
        </Flex>
        <div>
          { error }
          <div style={{ textAlign: 'center' }}>Input Your Message</div>
          <TextField value={msg} setValue={setMsg} style={{ width: '100%' }} onKeyUp={(e) => {
            if (e.key === 'Enter') {
              setMsgs([...msgs, {
                role: 'user',
                content: msg,
              }])
              setMsg('')
              void trigger({
                messages: [...msgs, {
                  role: 'user',
                  content: msg,
                }],
              })
            }
          }} />
        </div>
      </Flex>
    </Container>
  )
}
