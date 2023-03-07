import { type Message } from '../api/chat'
import { SceneBase } from '../../components/SceneBase'

export default function Scene06 () {
  const prompts: Message[] = [
    {
      role: 'system',
      content: 'I want you to act like {character} from {series}. I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}.',
    },
  ]
  return <SceneBase prompts={prompts} />
}
