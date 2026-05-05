/// <reference types="vite/client" />
import { type ReactNode, useState, useEffect, useRef, useCallback } from 'react'
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
import { useAnalytics } from '../hooks/useAnalytics'
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
        href: 'https://fonts.googleapis.com/css2?family=Lora:wght@500;600;700&family=Noto+Sans+KR:wght@300;400;500;700;900&family=Noto+Serif+KR:wght@600;700;900&family=Inter:wght@400;500;600;700;800;900&display=swap',
      },
    ],
  }),
  component: RootComponent,
})

// ─── Nav link ────────────────────────────────────────────────────────

function NavLink({ to, children, onClick }: { to: string; children: ReactNode; onClick?: () => void }) {
  const { location } = useRouterState()
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to + '/'))
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
        isActive ? 'bg-[var(--c-accent-muted)]' : 'hover:bg-[var(--c-ghost-bg)]'
      }`}
      style={{ color: isActive ? 'var(--c-accent-text)' : 'var(--c-2)' }}
      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-1)' }}
      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-2)' }}
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ to, children, onClick }: { to: string; children: ReactNode; onClick?: () => void }) {
  const { location } = useRouterState()
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to + '/'))
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-150 cursor-pointer ${
        isActive ? 'bg-[var(--c-accent-muted)]' : 'hover:bg-[var(--c-ghost-bg)]'
      }`}
      style={{ color: isActive ? 'var(--c-accent-text)' : 'var(--c-2)' }}
      onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-1)' }}
      onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--c-2)' }}
    >
      {children}
    </Link>
  )
}

// ─── More dropdown (desktop flagged links) ────────────────────────────

const FLAGGED_ROUTES = [
  { flag: FLAGS.GUIDED_LEARN,       to: '/learn',              label: 'Lessons'         },
  { flag: FLAGS.SYLLABLE_BLOCKS,    to: '/blocks',             label: 'Blocks'          },
  { flag: FLAGS.SYLLABLE_CHART,     to: '/syllable-chart',     label: 'Syllable Chart'  },
  { flag: FLAGS.VOCABULARY,         to: '/vocabulary',         label: 'Vocabulary'      },
  { flag: FLAGS.STROKE_ORDER,       to: '/stroke-order',       label: 'Stroke Order'    },
  { flag: FLAGS.TYPING_PRACTICE,    to: '/typing',             label: 'Typing'          },
  { flag: FLAGS.PROGRESS_DASHBOARD, to: '/progress',           label: 'Progress'        },
  { flag: FLAGS.KOREA_FACTS,        to: '/korea-facts',        label: 'Korea Facts'     },
  { flag: FLAGS.BATCHIM_LESSON,     to: '/batchim',            label: 'Batchim Basics'  },
  { flag: FLAGS.GRAMMAR_GUIDE,       to: '/grammar',            label: 'Grammar 101'     },
  { flag: FLAGS.CONTRAST_DRILLS,    to: '/contrast-drills',    label: 'Contrast Drills' },
  { flag: FLAGS.ENGLISH_GUIDE,      to: '/english-guide',      label: 'English Guide'   },
  { flag: FLAGS.DUTCH_GUIDE,        to: '/dutch-guide',        label: 'Dutch Guide'     },
  { flag: FLAGS.ROMANIZATION_GUIDE, to: '/romanization-guide', label: 'Romanization'    },
  { flag: FLAGS.IPA_GUIDE,         to: '/ipa-guide',          label: 'IPA Guide'       },
] as const

function MoreDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { location } = useRouterState()

  const guidedLearn       = useBooleanFlagValue(FLAGS.GUIDED_LEARN, false)
  const syllableBlocks    = useBooleanFlagValue(FLAGS.SYLLABLE_BLOCKS, false)
  const syllableChart     = useBooleanFlagValue(FLAGS.SYLLABLE_CHART, false)
  const vocabulary        = useBooleanFlagValue(FLAGS.VOCABULARY, false)
  const typingPractice    = useBooleanFlagValue(FLAGS.TYPING_PRACTICE, false)
  const progressDash      = useBooleanFlagValue(FLAGS.PROGRESS_DASHBOARD, false)
  const strokeOrder       = useBooleanFlagValue(FLAGS.STROKE_ORDER, false)
  const koreaFacts        = useBooleanFlagValue(FLAGS.KOREA_FACTS, false)
  const batchimLesson     = useBooleanFlagValue(FLAGS.BATCHIM_LESSON, false)
  const grammarGuide      = useBooleanFlagValue(FLAGS.GRAMMAR_GUIDE, false)
  const contrastDrills    = useBooleanFlagValue(FLAGS.CONTRAST_DRILLS, false)
  const englishGuide      = useBooleanFlagValue(FLAGS.ENGLISH_GUIDE, false)
  const dutchGuide        = useBooleanFlagValue(FLAGS.DUTCH_GUIDE, false)
  const romanizationGuide = useBooleanFlagValue(FLAGS.ROMANIZATION_GUIDE, false)
  const ipaGuide          = useBooleanFlagValue(FLAGS.IPA_GUIDE, false)

  const flagMap: Record<string, boolean> = {
    [FLAGS.GUIDED_LEARN]:        guidedLearn,
    [FLAGS.SYLLABLE_BLOCKS]:     syllableBlocks,
    [FLAGS.SYLLABLE_CHART]:      syllableChart,
    [FLAGS.VOCABULARY]:          vocabulary,
    [FLAGS.STROKE_ORDER]:        strokeOrder,
    [FLAGS.TYPING_PRACTICE]:     typingPractice,
    [FLAGS.PROGRESS_DASHBOARD]:  progressDash,
    [FLAGS.KOREA_FACTS]:         koreaFacts,
    [FLAGS.BATCHIM_LESSON]:      batchimLesson,
    [FLAGS.GRAMMAR_GUIDE]:       grammarGuide,
    [FLAGS.CONTRAST_DRILLS]:     contrastDrills,
    [FLAGS.ENGLISH_GUIDE]:       englishGuide,
    [FLAGS.DUTCH_GUIDE]:         dutchGuide,
    [FLAGS.ROMANIZATION_GUIDE]:  romanizationGuide,
    [FLAGS.IPA_GUIDE]:           ipaGuide,
  }

  const routes = FLAGGED_ROUTES.filter(r => flagMap[r.flag])

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  if (routes.length === 0) return null

  const anyActive = routes.some(
    r => location.pathname === r.to || location.pathname.startsWith(r.to + '/')
  )

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
          anyActive || open ? 'bg-[var(--c-accent-muted)]' : 'hover:bg-[var(--c-ghost-bg)]'
        }`}
        style={{ color: anyActive || open ? 'var(--c-accent-text)' : 'var(--c-2)' }}
        onMouseEnter={(e) => { if (!anyActive && !open) (e.currentTarget as HTMLElement).style.color = 'var(--c-1)' }}
        onMouseLeave={(e) => { if (!anyActive && !open) (e.currentTarget as HTMLElement).style.color = 'var(--c-2)' }}
      >
        More
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'transform 0.15s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <polyline points="2,4 6,8 10,4" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 min-w-44 rounded-xl py-1.5 z-50"
          style={{ background: 'var(--c-overlay)', border: '1px solid var(--c-border)', boxShadow: 'var(--c-shadow)' }}
        >
          {routes.map(({ to, label }) => {
            const isActive = location.pathname === to || location.pathname.startsWith(to + '/')
            return (
              <Link
                key={to}
                to={to}
                className="block px-4 py-2 text-sm font-medium transition-colors duration-100 cursor-pointer"
                style={{ background: isActive ? 'var(--c-accent-muted)' : undefined, color: isActive ? 'var(--c-accent-text)' : 'var(--c-2)' }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--c-1)'
                    ;(e.currentTarget as HTMLElement).style.background = 'var(--c-ghost-bg)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--c-2)'
                    ;(e.currentTarget as HTMLElement).style.background = ''
                  }
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ─── Flagged mobile nav links ─────────────────────────────────────────

function FlaggedMobileNavLinks({ onLinkClick }: { onLinkClick?: () => void }) {
  const guidedLearn       = useBooleanFlagValue(FLAGS.GUIDED_LEARN, false)
  const syllableBlocks    = useBooleanFlagValue(FLAGS.SYLLABLE_BLOCKS, false)
  const syllableChart     = useBooleanFlagValue(FLAGS.SYLLABLE_CHART, false)
  const vocabulary        = useBooleanFlagValue(FLAGS.VOCABULARY, false)
  const typingPractice    = useBooleanFlagValue(FLAGS.TYPING_PRACTICE, false)
  const progressDash      = useBooleanFlagValue(FLAGS.PROGRESS_DASHBOARD, false)
  const strokeOrder       = useBooleanFlagValue(FLAGS.STROKE_ORDER, false)
  const koreaFacts        = useBooleanFlagValue(FLAGS.KOREA_FACTS, false)
  const batchimLesson     = useBooleanFlagValue(FLAGS.BATCHIM_LESSON, false)
  const grammarGuide      = useBooleanFlagValue(FLAGS.GRAMMAR_GUIDE, false)
  const contrastDrills    = useBooleanFlagValue(FLAGS.CONTRAST_DRILLS, false)
  const englishGuide      = useBooleanFlagValue(FLAGS.ENGLISH_GUIDE, false)
  const dutchGuide        = useBooleanFlagValue(FLAGS.DUTCH_GUIDE, false)
  const romanizationGuide = useBooleanFlagValue(FLAGS.ROMANIZATION_GUIDE, false)
  const ipaGuide          = useBooleanFlagValue(FLAGS.IPA_GUIDE, false)

  const flagMap: Record<string, boolean> = {
    [FLAGS.GUIDED_LEARN]:        guidedLearn,
    [FLAGS.SYLLABLE_BLOCKS]:     syllableBlocks,
    [FLAGS.SYLLABLE_CHART]:      syllableChart,
    [FLAGS.VOCABULARY]:          vocabulary,
    [FLAGS.STROKE_ORDER]:        strokeOrder,
    [FLAGS.TYPING_PRACTICE]:     typingPractice,
    [FLAGS.PROGRESS_DASHBOARD]:  progressDash,
    [FLAGS.KOREA_FACTS]:         koreaFacts,
    [FLAGS.BATCHIM_LESSON]:      batchimLesson,
    [FLAGS.GRAMMAR_GUIDE]:       grammarGuide,
    [FLAGS.CONTRAST_DRILLS]:     contrastDrills,
    [FLAGS.ENGLISH_GUIDE]:       englishGuide,
    [FLAGS.DUTCH_GUIDE]:         dutchGuide,
    [FLAGS.ROMANIZATION_GUIDE]:  romanizationGuide,
    [FLAGS.IPA_GUIDE]:           ipaGuide,
  }

  return (
    <>
      {FLAGGED_ROUTES.filter(r => flagMap[r.flag]).map(({ to, label }) => (
        <MobileNavLink key={to} to={to} onClick={onLinkClick}>{label}</MobileNavLink>
      ))}
    </>
  )
}

// ─── Language switcher ───────────────────────────────────────────────

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const { track } = useAnalytics()
  const languages = Object.entries(LANGUAGE_LABELS) as Array<[Language, string]>
  return (
    <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ background: 'var(--c-surface-2)', border: '1px solid var(--c-border)' }}>
      {languages.map(([code, label]) => (
        <button
          key={code}
          onClick={() => { track('language_changed', { from: language, to: code }); setLanguage(code) }}
          title={`Switch to ${label}`}
          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all duration-150 cursor-pointer ${
            language === code ? 'text-white shadow-sm' : ''
          }`}
          style={{
            background: language === code ? 'var(--c-accent)' : undefined,
            color: language === code ? undefined : 'var(--c-3)',
          }}
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
  const { track } = useAnalytics()

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null
    setTheme(current === 'light' ? 'light' : 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try { localStorage.setItem('theme', next) } catch (_) {}
    track('theme_changed', { theme: next })
  }

  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-150 cursor-pointer hover:bg-[var(--c-ghost-bg)]"
      style={{ color: 'var(--c-3)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-1)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-3)')}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────

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
  const [menuOpen, setMenuOpen]       = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)
  const { language } = useLanguage()
  const { location } = useRouterState()
  const { track } = useAnalytics()

  useEffect(() => {
    track('page_view', { path: location.pathname })
  }, [location.pathname, track])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    setTimeout(() => setMenuMounted(false), 150)
  }, [])

  const openMenu = () => {
    setMenuMounted(true)
    setMenuOpen(true)
  }

  // Close on any route change (handles back/forward navigation)
  useEffect(() => { closeMenu() }, [location.pathname, closeMenu])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', language)
    }
  }, [language])

  return (
    <html lang={language}>
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
              <span className="text-2xl font-black korean-serif" style={{ color: 'var(--c-accent-text)' }}>한글</span>
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'var(--c-3)' }}>배우기</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              <NavLink to="/consonants">Consonants</NavLink>
              <NavLink to="/vowels">Vowels</NavLink>
              <NavLink to="/quiz">Quiz</NavLink>
              <NavLink to="/pronounce">Pronounce</NavLink>
              <NavLink to="/builder">Builder</NavLink>
              <MoreDropdown />
              <div className="w-px h-4 mx-2" style={{ background: 'var(--c-divider)' }} />
              <ThemeToggle />
              <div className="w-px h-4 mx-2" style={{ background: 'var(--c-divider)' }} />
              <LanguageSwitcher />
            </nav>

            {/* Mobile controls — only ThemeToggle + hamburger to keep header slim */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => menuOpen ? closeMenu() : openMenu()}
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
          {menuMounted && (
            <div
              className={`md:hidden px-4 py-3 space-y-1 ${menuOpen ? 'menu-slide-down' : 'menu-slide-up'}`}
              style={{ background: 'var(--c-overlay)', borderTop: '1px solid var(--c-border-sub)' }}
            >
              <MobileNavLink to="/consonants" onClick={closeMenu}>Consonants</MobileNavLink>
              <MobileNavLink to="/vowels" onClick={closeMenu}>Vowels</MobileNavLink>
              <MobileNavLink to="/quiz" onClick={closeMenu}>Quiz</MobileNavLink>
              <MobileNavLink to="/pronounce" onClick={closeMenu}>Pronounce</MobileNavLink>
              <MobileNavLink to="/builder" onClick={closeMenu}>Builder</MobileNavLink>
              <FlaggedMobileNavLinks onLinkClick={closeMenu} />
              <div className="pt-2 mt-1" style={{ borderTop: '1px solid var(--c-border-sub)' }}>
                <LanguageSwitcher />
              </div>
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
