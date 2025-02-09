export type AudioQueryParams = {
  text: string
  speaker: number
}

export interface SynthesisParams extends AudioQueryParams {
  speedScale?: number
  pitchScale?: number
  intonationScale?: number
  volumeScale?: number
}

export type Speaker = {
  name: string
  speaker_uuid: string
  styles: SpeakerStyle[]
}

export type SpeakerStyle = {
  name: string
  id: number
  type: string
}
