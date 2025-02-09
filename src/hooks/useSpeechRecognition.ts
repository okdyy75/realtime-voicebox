import { useState } from 'react'

export const useSpeechRecognition = () => {
  const [recognition, setRecognition] = useState<SpeechRecognition>()
  const [error, setError] = useState<Error | null>(null)

  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setError(new Error('お使いのブラウザは音声認識をサポートしていません。'))
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'ja-JP'
    recognition.continuous = true // 継続的に音声認識を行う
    recognition.interimResults = true // 途中結果でも取得する

    recognition.onerror = () => {
      setError(new Error('音声入力が許可されていません。'))
      stopRecognition()
      return
    }

    return recognition
  }

  const startRecognition = () => {
    const recognition = initSpeechRecognition()
    if (recognition) {
      setRecognition(recognition)
      recognition.start()
    }
  }

  const stopRecognition = () => {
    recognition?.stop()
  }

  const onSpeechRecognition = (callback: (text: string) => void) => {
    if (!recognition) {
      return
    }
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = Array.from(event.results)[event.results.length - 1]
      const transcript = result[0].transcript.trim()
      console.log('transcript:', transcript)
      if (!result.isFinal || transcript === '') {
        return
      }
      callback(transcript)
    }
  }

  return {
    startRecognition,
    stopRecognition,
    onSpeechRecognition,
    error,
  }
}
