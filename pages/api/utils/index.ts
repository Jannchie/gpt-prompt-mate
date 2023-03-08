export function getToken () {
  const storageToken = localStorage.getItem('openai-token')
  if (storageToken && storageToken !== '') {
    return storageToken
  }
  return process.env.OPENAI_API_KEY as string
}
