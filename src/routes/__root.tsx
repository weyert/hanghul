/// <reference types="vite/client" />
import { type ReactNode, useState, useEffect } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
  useRouterState,
} from '@tanstack/react-router'
import { OpenFeatureProvider, useBooleanFlagValue } from '@openfeature/react-sdk'
import { LanguageProvider, useLanguage, LANGUAGE_LABELS } from '../contexts/LanguageContext'
import type { Language } from '../contexts/LanguageContext'
import { FLAGS } from '../flags'
import '../styles.css'

// Runs before any CSS to avoid flash of wrong theme
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t){document.documentElement.setAttribute('data-theme',t);}else if(window.matchMedia('(prefers-color-scheme: light)').matches){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: '한글 배우기 — Learn Hangul' },
      { name: 'description', content: 'Learn the Korean Hangul alphabet with flashcards and quizzes.' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Inter:wght@400;500;600;700;800;900&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

// ─── Nav link ───────────────────────────────────────────────────────

function NavLink({ to, children, onClick }: { to: string; children: ReactNode; onClick?: () => void }) {
  const { location } = useRouterState()
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
        isActive ? 'text-violet-400 bg-violet-500/10' : 'hover:bg-white/5'
      }`}
      style={{ color: isActive ? undefined : 'var(--c-2)' }}
      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-1)' }}
      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-2)' }}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ to, children, onClick }: { to: string; children: ReactNode; onClick?: () => void }) {
  const { location } = useRouterState()
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-150 cursor-pointer ${
        isActive ? 'text-violet-400 bg-violet-500/10' : 'hover:bg-white/5'
      }`}
      style={{ color: isActive ? undefined : 'var(--c-2)' }}
    >
      {children}
    </Link>
  )
}

// ─── Language switcher ───────────────────────────────────────────────

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const languages = Object.entries(LANGUAGE_LABELS) as Array<[Language, string]>
  return (
    <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ background: 'var(--c-surface-2)', border: '1px solid var(--c-border)' }}>
      {languages.map(([code, label]) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          title={`Switch to ${label}`}
          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-150 cursor-pointer ${
            language === code ? 'bg-violet-500 text-white shadow-sm' : 'hover:text-violet-400'
          }`}
          style={{ color: language === code ? undefined : 'var(--c-3)' }}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

// ─── Theme toggle ────────────────────────────────────────────────────

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
    setTheme(current === 'light' ? 'light' : 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch (_) {}
  }

  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150 cursor-pointer hover:bg-white/8"
      style={{ color: 'var(--c-3)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-1)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-3)')}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        // Sun icon
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        // Moon icon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

// ─── Flagged nav links ────────────────────────────────────────────────

function FlaggedNavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const syllableChart = useBooleanFlagValue(FLAGS.SYLLABLE_CHART, false)
  const vocabulary = useBooleanFlagValue(FLAGS.VOCABULARY, false)
  return (
    <>
      {syllableChart && <NavLink to="/syllable-chart" onClick={onLinkClick}>Chart</NavLink>}
      {vocabulary && <NavLink to="/vocabulary" onClick={onLinkClick}>Vocabulary</NavLink>}
    </>
  )
}

function FlaggedMobileNavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const syllableChart = useBooleanFlagValue(FLAGS.SYLLABLE_CHART, false)
  const vocabulary = useBooleanFlagValue(FLAGS.VOCABULARY, false)
  return (
    <>
      {syllableChart && <MobileNavLink to="/syllable-chart" onClick={onLinkClick}>Chart</MobileNavLink>}
      {vocabulary && <MobileNavLink to="/vocabulary" onClick={onLinkClick}>Vocabulary</MobileNavLink>}
    </>
  )
}

// ─── Root ──────────────────────────────────────────────────────────────

function RootComponent() {
  return (
    <OpenFeatureProvider>
      <LanguageProvider>
        <RootDocument>
          <Outlet />
        </RootDocument>
      </LanguageProvider>
    </OpenFeatureProvider>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      {open ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </>
      ) : (
        <>
          <line x1="3" y1="5.5" x2="17" y2="5.5" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="14.5" x2="17" y2="14.5" />
        </>
      )}
    </svg>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <html lang="en">
      <head>
        {/* Anti-FOUC: apply saved/system theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <HeadContent />
      </head>
      <body
        style={{
          fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
          background: 'var(--c-page)',
          color: 'var(--c-1)',
          minHeight: '100vh',
          transition: 'background 0.2s ease, color 0.2s ease',
        }}
      >
        {/* Header */}
        <header className="nav-glass sticky top-0 z-50" style={{ borderBottom: '1px solid var(--c-border-sub)' }}>
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2.5 cursor-pointer">
              <span className="text-2xl font-black korean-text gradient-brand">한글</span>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--c-5)' }}>배우기</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              <NavLink to="/consonants">Consonants</NavLink>
              <NavLink to="/vowels">Vowels</NavLink>
              <NavLink to="/quiz">Quiz</NavLink>
              <NavLink to="/pronounce">Pronounce</NavLink>
              <NavLink to="/builder">Builder</NavLink>
              <FlaggedNavLinks />
              <div className="w-px h-4 mx-2" style={{ background: 'var(--c-divider)' }} />
              <ThemeToggle />
              <div className="w-px h-4 mx-2" style={{ background: 'var(--c-divider)' }} />
              <LanguageSwitcher />
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="p-1.5 cursor-pointer transition-colors"
                style={{ color: 'var(--c-3)' }}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-1)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-3)')}
              >
                <MenuIcon open={menuOpen} />
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              className="md:hidden menu-slide-down px-4 py-3 space-y-1"
              style={{ background: 'var(--c-overlay)', borderTop: '1px solid var(--c-border-sub)' }}
            >
              <MobileNavLink to="/consonants" onClick={closeMenu}>Consonants</MobileNavLink>
              <MobileNavLink to="/vowels" onClick={closeMenu}>Vowels</MobileNavLink>
              <MobileNavLink to="/quiz" onClick={closeMenu}>Quiz</MobileNavLink>
              <MobileNavLink to="/pronounce" onClick={closeMenu}>Pronounce</MobileNavLink>
              <MobileNavLink to="/builder" onClick={closeMenu}>Builder</MobileNavLink>
              <FlaggedMobileNavLinks onLinkClick={closeMenu} />
            </div>
          )}
        </header>

        <main className="max-w-6xl mx-auto px-4 py-10">
          {children}
        </main>

        <Scripts />
      </body>
    </html>
  )
}
