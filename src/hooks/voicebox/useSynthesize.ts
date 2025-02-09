import { voiceboxApi } from '@/services/voiceboxApi'
import type { SynthesisParams } from '@/types/voicebox'

export const useSynthesize = () => {
  const synthesize = async (params: SynthesisParams) => {
    try {
      const audioQuery = await voiceboxApi.createAudioQuery(params)
      const audioBlob = await voiceboxApi.synthesize({
        ...audioQuery,
        ...params,
      })
      return {
        audioUrl: URL.createObjectURL(audioBlob),
        error: null,
      }
    } catch (err) {
      return {
        audioUrl: null,
        error: err as Error,
      }
    }
  }

  return {
    synthesize,
  }
}
