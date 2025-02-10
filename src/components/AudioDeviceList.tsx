import { useState } from 'react'

type AudioDeviceListProps = {
  inputAudioDevices: MediaDeviceInfo[]
  outputAudioDevices: MediaDeviceInfo[]
  defaultInputAudioDevice: string
  defaultOutputAudioDevice: string
  onSelectedInputAudioDevice: (deviceId: string) => void
  onSelectedOutputAudioDevice: (deviceId: string) => void
}

const AudioDeviceList = ({
  inputAudioDevices,
  outputAudioDevices,
  defaultInputAudioDevice,
  defaultOutputAudioDevice,
  onSelectedInputAudioDevice,
  onSelectedOutputAudioDevice,
}: AudioDeviceListProps) => {
  const [inputAudioDevice, setInputAudioDevice] = useState<string>(defaultInputAudioDevice)
  const [outputAudioDevice, setOutputAudioDevice] = useState<string>(defaultOutputAudioDevice)
  const handleInputAudioDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputAudioDevice(e.target.value)
    const inputDevice = inputAudioDevices.find((device) => device.deviceId === e.target.value)
    onSelectedInputAudioDevice(inputDevice?.deviceId || '')
  }

  const handleOutputAudioDevice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOutputAudioDevice(e.target.value)
    const outputDevice = outputAudioDevices.find((device) => device.deviceId === e.target.value)
    onSelectedOutputAudioDevice(outputDevice?.deviceId || '')
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            入力デバイス（変更不可。端末から変更してください）
          </label>
          <select
            value={inputAudioDevice}
            onChange={handleInputAudioDevice}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
          >
            {inputAudioDevices.map((device: MediaDeviceInfo) => (
              <option disabled key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">出力デバイス</label>
          <select
            value={outputAudioDevice}
            onChange={handleOutputAudioDevice}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            {outputAudioDevices.map((device: MediaDeviceInfo) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
export default AudioDeviceList
