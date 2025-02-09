import { useEffect, useState } from 'react'
import { useSpeakers } from '@/hooks/voicebox/useSpeakers'
import { useAudioDevices } from './hooks/useAudioDevices'
import SpeakerList from '@/components/voicebox/SpeakerList'
import AudioDeviceList from './components/AudioDeviceList'
import { useSpeechRecognition } from './hooks/useSpeechRecognition'
import { useSynthesize } from './hooks/voicebox/useSynthesize'

function App() {
  // 初期値
  const [selectedSpeaker, setSelectedSpeaker] = useState<number>(3) // デフォルト=>ずんだもん
  const [selectedInputAudioDevice, setSelectedInputAudioDevice] = useState<string>('default')
  const [selectedOutputAudioDevice, setSelectedOutputAudioDevice] = useState<string>('default')
  const [isRecording, setIsRecording] = useState(false)
  const [recognitionText, setRecognitionText] = useState<string>('')

  // データ取得
  const { inputAudioDevices, outputAudioDevices, loading: audioDevicesLoading, error: audioDevicesError } = useAudioDevices()
  const { speakers, loading: speakersLoading, error: speakersError } = useSpeakers()
  const { startRecognition, stopRecognition, onSpeechRecognition, error: speechRecognitionError } = useSpeechRecognition()
  const { synthesize } = useSynthesize()

  // データ取得時のエラー処理
  useEffect(() => {
    if (speakersError) {
      alert(`キャラクターの取得に失敗しました。\n${speakersError.message}`)
    }
  }, [speakersError])
  useEffect(() => {
    if (audioDevicesError) {
      alert(`デバイスの取得に失敗しました。\n${audioDevicesError.message}`)
    }
  }, [audioDevicesError])
  useEffect(() => {
    if (speechRecognitionError) {
      alert(`音声認識に失敗しました。\n${speechRecognitionError.message}`)
    }
  }, [speechRecognitionError])

  // 音声入力の開始/停止
  const toggleRecording = () => {
    if (!isRecording) {
      startRecognition()
    } else {
      stopRecognition()
    }
    setIsRecording(!isRecording)
  }

  // 音声認識
  onSpeechRecognition(async (text: string) => {
    setRecognitionText(`${recognitionText}\n${text}`.trim())
    const { audioUrl, error } = await synthesize({ text, speaker: selectedSpeaker })
    if (!audioUrl || error) {
      alert('音声合成に失敗しました。' + (error ? `\n${error.message}` : ''))
      return
    }
    const audio = new Audio(audioUrl)
    if (selectedOutputAudioDevice && audio.setSinkId) {
      audio.setSinkId(selectedOutputAudioDevice)
    }
    audio.play()
  })

  return (
    !speakersLoading && !audioDevicesLoading && (
      <>
        <div className="container">
          <main className="max-w-screen-md m-4 md:m-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">リアルタイムVOICEBOX</h2>
            <div className="space-y-6">
              {/* スピーカー選択 */}
              <div className="space-y-2">
                <SpeakerList
                  speakers={speakers}
                  defaultSpeaker={selectedSpeaker}
                  onSelectedSpeaker={setSelectedSpeaker}
                />
                <p>Selected Speaker: {selectedSpeaker}</p>
              </div>

              {/* デバイス選択ボタン */}
              <div className="space-y-2">
                <AudioDeviceList
                  inputAudioDevices={inputAudioDevices}
                  outputAudioDevices={outputAudioDevices}
                  defaultInputAudioDevice={selectedInputAudioDevice}
                  defaultOutputAudioDevice={selectedOutputAudioDevice}
                  onSelectedInputAudioDevice={setSelectedInputAudioDevice}
                  onSelectedOutputAudioDevice={setSelectedOutputAudioDevice}
                />
              </div>

              {/* 音声入力トグル */}
              <button
                onClick={toggleRecording}
                className={`px-4 py-2 rounded-md shadow-sm flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  isRecording
                    ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
                    : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                }`}
              >
                <span className="text-xl">{isRecording ? '▶️' : '⏹️'}</span>
                <span>{isRecording ? '音声入力停止' : '音声入力開始'}</span>
              </button>

              {/* 音声認識結果 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">音声認識結果</label>
                <textarea
                  readOnly
                  className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
                  placeholder="音声認識結果がここに表示されます"
                  value={recognitionText}
                />
              </div>
            </div>
          </main>
        </div>
      </>
    )
  )
}

export default App
