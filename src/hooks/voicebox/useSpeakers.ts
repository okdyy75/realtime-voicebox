import { voiceboxApi } from '@/services/voiceboxApi'
import { Speaker } from '@/types/voicebox'
import { useEffect, useState } from 'react'

export const useSpeakers = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const data = await voiceboxApi.fetchSpeakers()
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
