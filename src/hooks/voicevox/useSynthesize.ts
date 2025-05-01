import { voicevoxApi } from '@/services/voicevoxApi';
import type { SynthesisParams } from '@/types/voicevox';

export const useSynthesize = () => {
  const synthesize = async (params: SynthesisParams) => {
    try {
      const audioQuery = await voicevoxApi.createAudioQuery(params);
      const audioBlob = await voicevoxApi.synthesize({
        ...audioQuery,
        ...params,
      });
      return {
        audioUrl: URL.createObjectURL(audioBlob),
        error: null,
      };
    } catch (err) {
      return {
        audioUrl: null,
        error: err as Error,
      };
    }
  };

  return {
    synthesize,
  };
};
