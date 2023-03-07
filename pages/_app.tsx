import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'roku-ui/style.css'
import { useTheme } from 'roku-ui'
export default function App ({ Component, pageProps }: AppProps) {
  useTheme()
  return <Component {...pageProps} />
}
