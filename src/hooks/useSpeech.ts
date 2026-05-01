import { useCallback, useState } from 'react'

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    window.speechSynthesis.cancel()
    setSpeaking(true)

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'ko-KR'
    utterance.rate = 0.75
    utterance.pitch = 1.0
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    const doSpeak = () => {
      const voices = window.speechSynthesis.getVoices()
      const koVoice =
        voices.find((v) => v.lang === 'ko-KR') ||
        voices.find((v) => v.lang.startsWith('ko'))
      if (koVoice) utterance.voice = koVoice
      window.speechSynthesis.speak(utterance)
    }

    // Voices may not be loaded yet on first call
    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak()
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', doSpeak, { once: true })
    }
  }, [])

  const cancel = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  return { speak, cancel, speaking }
}
