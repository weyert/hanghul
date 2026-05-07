type PageArtworkProps = {
  src: string
  alt: string
  loading?: 'eager' | 'lazy'
}

export function PageArtwork({ src, alt, loading = 'lazy' }: PageArtworkProps) {
  const extension = src.endsWith('.jpg') ? '.jpg' : ''
  const base = extension ? src.slice(0, -extension.length) : src

  return (
    <figure className="overflow-hidden rounded-2xl glass-card">
      {extension ? (
        <picture>
          <source
            srcSet={`${base}-720.avif 720w, ${base}.avif 1200w`}
            sizes="(min-width: 768px) 768px, 100vw"
            type="image/avif"
          />
          <source
            srcSet={`${base}-720.webp 720w, ${base}.webp 1200w`}
            sizes="(min-width: 768px) 768px, 100vw"
            type="image/webp"
          />
          <img
            src={src}
            alt={alt}
            width={1200}
            height={675}
            loading={loading}
            className="block w-full aspect-video object-cover"
          />
        </picture>
      ) : (
        <img
          src={src}
          alt={alt}
          width={1200}
          height={675}
          loading={loading}
          className="block w-full aspect-video object-cover"
        />
      )}
    </figure>
  )
}

export const CONTENT_ARTWORK: Record<string, PageArtworkProps> = {
  'ipa-guide': {
    src: '/artwork/ipa-guide.jpg',
    alt: 'Hangul tiles with abstract phonetic waveform and mouth-position study marks.',
  },
  'dutch-guide': {
    src: '/artwork/dutch-guide.jpg',
    alt: 'Hangul learning tiles bridging Dutch study notes and Korean letter forms.',
  },
  'english-guide': {
    src: '/artwork/english-guide.jpg',
    alt: 'English-to-Korean sound comparison cards turning into Hangul letter tiles.',
  },
  'vocabulary': {
    src: '/artwork/vocabulary.jpg',
    alt: 'Grouped Korean vocabulary cards with small category symbols and Hangul tiles.',
  },
  'romanization-guide': {
    src: '/artwork/english-guide.jpg',
    alt: 'Study cards comparing romanized sound notes with Hangul letter tiles.',
  },
  'grammar': {
    src: '/artwork/syllable-tools.jpg',
    alt: 'Korean letter pieces arranging into structured syllable blocks.',
  },
  'blocks': {
    src: '/artwork/syllable-tools.jpg',
    alt: 'Modular Hangul letter pieces combining into a Korean syllable block.',
  },
  'batchim': {
    src: '/artwork/syllable-tools.jpg',
    alt: 'Initial, vowel, and final consonant pieces assembling into a Hangul block.',
  },
  'consonants': {
    src: '/artwork/writing-practice.jpg',
    alt: 'Hangul consonant stroke practice cards on a warm dark study surface.',
  },
  'vowels': {
    src: '/artwork/writing-practice.jpg',
    alt: 'Hangul vowel stroke practice cards on a warm dark study surface.',
  },
}
