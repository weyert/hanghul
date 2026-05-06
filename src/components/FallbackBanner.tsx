import { Link } from '@tanstack/react-router'

export function FallbackBanner({ slug }: { slug: string }) {
  return (
    <div
      className="rounded-xl px-4 py-3 mb-6 text-sm flex items-center gap-3"
      style={{
        background: 'rgba(245,158,11,0.08)',
        border: '1px solid rgba(245,158,11,0.3)',
        color: 'var(--c-2)',
      }}
    >
      <span style={{ color: '#fcd34d' }}>⚠</span>
      <span>
        Deze pagina is nog niet vertaald naar het Nederlands. Je ziet nu de Engelse versie.{' '}
        <Link
          to="/$locale/$slug"
          params={{ locale: 'en', slug }}
          search={{ from: undefined }}
          style={{ color: 'var(--c-accent-text)' }}
          className="underline underline-offset-2"
        >
          View in English
        </Link>
      </span>
    </div>
  )
}
