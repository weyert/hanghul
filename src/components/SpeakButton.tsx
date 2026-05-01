import { useEffect, useState } from 'react'
import { useSpeech } from '../hooks/useSpeech'

interface SpeakButtonProps {
  text: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// Mounted guard prevents SSR/hydration mismatch — the button only appears
// after the client confirms speechSynthesis is available.
export function SpeakButton({ text, size = 'sm', className = '' }: SpeakButtonProps) {
  const [available, setAvailable] = useState(false)
  const { speak, speaking } = useSpeech()

  useEffect(() => {
    setAvailable('speechSynthesis' in window)
  }, [])

  if (!available) return null

  const iconSize =
    size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4'

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        speak(text)
      }}
      aria-label="Play pronunciation"
      title="Play pronunciation"
      className={`flex items-center justify-center rounded-full transition-colors cursor-pointer ${
        speaking
          ? 'text-violet-400'
          : 'text-zinc-600 hover:text-violet-400'
      } ${className}`}
    >
      <svg
        className={`${iconSize} ${speaking ? 'animate-pulse' : ''}`}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 01-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
        <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
      </svg>
    </button>
  )
}
