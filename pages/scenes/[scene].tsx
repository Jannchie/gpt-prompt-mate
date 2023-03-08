import { SceneBase } from '@/components/SceneBase'
import { useRouter } from 'next/router'
import data from '@/data'
export default function Scene () {
  const router = useRouter()
  const { scene } = router.query
  if (typeof scene !== 'string') {
    return <div>Router error</div>
  }
  const d = data[scene]
  if (!d) {
    return <div>Not found</div>
  }
  return <SceneBase prompts={d.prompts} />
}
