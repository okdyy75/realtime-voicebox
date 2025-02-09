import { useEffect, useState } from 'react'

export const useAudioDevices = (): {
  inputAudioDevices: MediaDeviceInfo[]
  outputAudioDevices: MediaDeviceInfo[]
  loading: boolean
  error: Error | null
} => {
  const [inputAudioDevices, setInputAudioDevices] = useState<MediaDeviceInfo[]>([])
  const [outputAudioDevices, setOutputAudioDevices] = useState<MediaDeviceInfo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        const audioInputs = devices.filter((device) => device.kind === 'audioinput')
        const audioOutputs = devices.filter((device) => device.kind === 'audiooutput')
        setInputAudioDevices(audioInputs)
        setOutputAudioDevices(audioOutputs)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }
    getDevices()
  }, [])

  return {
    inputAudioDevices,
    outputAudioDevices,
    loading,
    error,
  }
}
