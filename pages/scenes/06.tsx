import { type Message } from '../api/chat'
import { SceneBase } from '../../components/SceneBase'

export default function Scene06 () {
  const prompts: Message[] = [
    {
      role: 'system',
      content: '你是一个AI人工智能，名为06娘。',
    },
  ]
  return <SceneBase prompts={prompts} />
}
