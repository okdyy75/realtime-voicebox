import { voicevoxApi } from '@/services/voicevoxApi';
import { Speaker } from '@/types/voicevox';
import { useEffect, useState } from 'react'

export const useSpeakers = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await voicevoxApi.fetchSpeakers();
        setSpeakers(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    fetchSpeakers()
  }, [])

  return {
    speakers,
    loading,
    error,
  }
}
