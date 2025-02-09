import { AudioQueryParams, SynthesisParams } from '@/types/voicebox'

const endpoint = 'http://localhost:50021'

const callApi = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options)
    .catch((err: Error) => {
      throw new Error(`VOICEBOX APIの接続に失敗しました。\n[message: ${err.message}]`)
    })
  if (!response.ok) {
    throw new Error(`VOICEBOX APIのリクエストに失敗しました。\n[message: ${response.statusText}][status_code: ${response.status}]`)
  }
  return response
}

export const voiceboxApi = {
  fetchSpeakers: async () => {
    const response = await callApi(`${endpoint}/speakers`)
    return response.json()
  },
  createAudioQuery: async ({ speaker, text }: AudioQueryParams) => {
    const response = await callApi(`${endpoint}/audio_query?speaker=${speaker}&text=${encodeURIComponent(text)}`, {
      method: 'POST',
    })
    return response.json()
  },
  synthesize: async (params: SynthesisParams) => {
    const response = await callApi(`${endpoint}/synthesis?speaker=${params.speaker}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    return response.blob()
  },
}
