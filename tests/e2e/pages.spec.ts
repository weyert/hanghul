import { expect, test } from '@playwright/test'

const primaryRoutes = [
  {
    path: '/',
    heading: '한글',
    expectedText: ['Learn the Korean Alphabet', 'Your Learning Path', 'Why Hangul is Remarkable'],
  },
  {
    path: '/consonants',
    heading: 'Consonants',
    expectedText: ['Basic Consonants', 'Full Reference', 'ㄱ'],
  },
  {
    path: '/vowels',
    heading: 'Vowels',
    expectedText: ['Basic Vowels', 'Compound Vowels', 'ㅏ'],
  },
  {
    path: '/quiz',
    heading: 'Quiz',
    expectedText: ['Question', 'Consonants', 'Vowels'],
  },
  {
    path: '/pronounce',
    heading: 'Pronounce',
    expectedText: ['Enter Korean text to see its syllable-by-syllable breakdown', 'Hello', 'Thank you'],
  },
  {
    path: '/builder',
    heading: 'Builder',
    expectedText: ['Pick a consonant + vowel to compose a syllable block', 'Vowel', 'Preview'],
  },
] as const

const expandedRoutes = [
  {
    path: '/learn',
    heading: 'Guided Lessons',
    expectedText: ['Meet each character, then test yourself right away', 'See it. Hear it. Test it.', 'Start Learning'],
  },
  {
    path: '/blocks',
    heading: 'Syllable Blocks',
    expectedText: ['The Three Positions', 'Two Block Shapes', 'Step-by-Step Examples'],
  },
  {
    path: '/syllable-chart',
    heading: 'Syllable Chart',
    expectedText: ['Every initial consonant', 'Hover a cell to highlight its row', 'Builder'],
  },
  {
    path: '/vocabulary',
    heading: 'Vocabulary',
    expectedText: ['Beginner sentence patterns', 'Show Polite Forms', 'Romanization'],
  },
  {
    path: '/stroke-order',
    heading: 'Stroke Order',
    expectedText: ['Universal Rules', 'Consonants', 'Vowels'],
  },
  {
    path: '/typing',
    heading: 'Typing Practice',
    expectedText: ['Type the romanization', 'Beginner', 'All Characters'],
  },
  {
    path: '/progress',
    heading: 'Progress',
    expectedText: ['Your quiz performance across all', 'Mastered', 'Complete some quizzes'],
  },
  {
    path: '/korea-facts',
    heading: 'Korea Facts',
    expectedText: ['facts across history, culture, food', 'Shuffle', 'History'],
  },
  {
    path: '/batchim',
    heading: 'Batchim Basics',
    expectedText: ['Final consonants are where Korean starts', 'Beginner way to think about it', 'The "7 Final Sounds" Rule'],
  },
  {
    path: '/grammar',
    heading: 'Grammar 101',
    expectedText: ['Sentence Structure: SOV', 'Particles: The Language Glue', 'Putting it together'],
  },
  {
    path: '/contrast-drills',
    heading: 'Contrast Drills',
    expectedText: ['Train the sounds beginners confuse most often', 'Listen for:', 'ㄱ / ㅋ / ㄲ'],
  },
  {
    path: '/english-guide',
    heading: 'Learning Hangul as an English Speaker',
    expectedText: ['The good news', 'Sounds that transfer directly', 'Your 5 biggest challenges'],
  },
  {
    path: '/dutch-guide',
    heading: 'Hangul leren voor Nederlandstaligen',
    expectedText: ['Jouw voordeel als Nederlander', 'Klanken die je al kent', 'ㅡ starts from de'],
  },
  {
    path: '/romanization-guide',
    heading: 'Romanization: What It Is and Why to Move Past It',
    expectedText: ['What is romanization?', 'The three main systems', 'Revised Romanization of Korean'],
  },
  {
    path: '/ipa-guide',
    heading: 'IPA Reference for Korean',
    expectedText: ['What is IPA?', 'Modifiers', 'International Phonetic Alphabet'],
  },
] as const

test.describe('page content', () => {
  for (const route of [...primaryRoutes, ...expandedRoutes]) {
    test(`${route.path} renders expected content`, async ({ page }) => {
      await page.goto(route.path)

      await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()

      for (const text of route.expectedText) {
        await expect(page.getByText(text, { exact: false }).first()).toBeVisible()
      }
    })
  }
})

test.describe('navigation', () => {
  test('desktop header links route to the main pages', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('navigation').getByRole('link', { name: 'Consonants' }).click()
    await expect(page).toHaveURL('/consonants')
    await expect(page.getByRole('heading', { level: 1, name: 'Consonants' })).toBeVisible()

    await page.getByRole('navigation').getByRole('link', { name: 'Vowels' }).click()
    await expect(page).toHaveURL('/vowels')
    await expect(page.getByRole('heading', { level: 1, name: 'Vowels' })).toBeVisible()

    await page.getByRole('navigation').getByRole('link', { name: 'Quiz' }).click()
    await expect(page).toHaveURL('/quiz')
    await expect(page.getByRole('heading', { level: 1, name: 'Quiz' })).toBeVisible()
  })

  test('mobile menu opens and navigates', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: 'Toggle menu' }).click()
    await expect(page.locator('header').getByRole('link', { name: 'Consonants', exact: true })).toBeVisible()
    await expect(page.locator('header').getByRole('link', { name: 'Builder', exact: true })).toBeVisible()

    await page.locator('header').getByRole('link', { name: 'Builder', exact: true }).click()
    await expect(page).toHaveURL('/builder')
    await expect(page.getByRole('heading', { level: 1, name: 'Builder' })).toBeVisible()
  })
})

test.describe('app controls', () => {
  test('language switcher updates document language', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: 'NL' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'nl')

    await page.getByRole('button', { name: 'EN' }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('theme toggle persists the selected theme', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.getByRole('button', { name: 'Switch to light mode' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  })
})
