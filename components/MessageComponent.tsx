import { type CSSProperties, useState } from 'react'
import { type Message } from '../pages/api/chat'
import { TypeAnimation } from 'react-type-animation'

export function MessageComponent ({ message, loading = false }: { message: Message, loading?: boolean }): JSX.Element {
  let textAlign: 'start' | 'center' | 'end' = 'start'
  if (message.role === 'system') {
    textAlign = 'center'
  } else if (message.role === 'user') {
    textAlign = 'end'
  }
  const style: CSSProperties = {
    padding: '0.5rem',
    textAlign,
  }
  if (message.role === 'system') {
    style.color = 'hsl(var(--r-frontground-3))'
    style.fontSize = '0.5rem'
  } else if (message.role === 'assistant') {
    style.background = 'hsl(var(--r-background-1))'
    style.borderRadius = '0.5rem'
  }
  const [progressing, setProgressing] = useState(true)
  if (message.role === 'assistant' && (progressing || loading)) {
    return <TypeAnimation
      sequence={[message.content,
        () => {
          setProgressing(false)
        }]}
      style={style} />
  }
  return <div key={message.content} style={style}>
    { message.content }
  </div>
}
