declare module '*.mdx' {
  import type { FlagKey } from '../flags'
  import type { Locale } from '../contexts/LanguageContext'

  export const frontmatter: {
    title: string
    description: string
    flag?: FlagKey
    navLabel: string
    audience?: string
    exclusiveToLocale?: Locale
    hideFromNav?: boolean
  }

  const MDXContent: (props: {
    components?: Record<string, React.ComponentType<Record<string, unknown>>>
  }) => React.ReactElement

  export default MDXContent
}
