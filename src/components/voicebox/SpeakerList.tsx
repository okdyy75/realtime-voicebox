import { Speaker } from '@/types/voicebox'
import { useEffect, useState } from 'react'

type SpeakerListProps = {
  speakers: Speaker[]
  defaultSpeaker: number
  onSelectedSpeaker: (speakerId: number) => void
}

const SpeakerList = ({ speakers, defaultSpeaker, onSelectedSpeaker }: SpeakerListProps) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('')
  const [selectedSpeakerStyle, setSelectedSpeakerStyle] = useState<string>('')
  const [speakerStyles, setSpeakerStyles] = useState<Array<{ name: string; id: number }>>([])

  useEffect(() => {
    const speaker = speakers.find((speaker) => speaker.styles.find((style) => style.id === defaultSpeaker))
    if (speaker) {
      setSpeakerStyles(speaker.styles)
      setSelectedSpeaker(speaker.speaker_uuid)
      setSelectedSpeakerStyle(String(defaultSpeaker))
    }
  }, [])

  const handleSpeakerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectSpeaker = speakers.find((speaker) => speaker.speaker_uuid === e.target.value)
    if (selectSpeaker) {
      setSelectedSpeaker(e.target.value)
      setSpeakerStyles(selectSpeaker.styles)
      setSelectedSpeakerStyle('')
    }
  }

  const handleSpeakerStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpeakerStyle(e.target.value)
    onSelectedSpeaker(Number(e.target.value))
  }

  return (
    <div className="max-w-sm">
      <div className="space-y-2">
        <label htmlFor="speaker" className="block text-sm font-medium text-gray-700">
          キャラクター選択
        </label>
        <select
          id="speaker"
          value={selectedSpeaker}
          onChange={handleSpeakerChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value=""></option>
          {speakers.map((speaker) => (
            <option key={speaker.speaker_uuid} value={speaker.speaker_uuid}>
              {speaker.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 space-y-2">
        <label htmlFor="speaker_style" className="block text-sm font-medium text-gray-700">
          スタイル選択
        </label>
        <select
          id="speaker_style"
          value={selectedSpeakerStyle}
          onChange={handleSpeakerStyleChange}
          disabled={!selectedSpeaker}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value=""></option>
          {speakerStyles.map((style) => (
            <option key={style.id} value={style.id}>
              {style.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
export default SpeakerList
