import { expect, test } from '@playwright/test'
import { allCharacters, consonants, vowels } from '../../src/data/hangul'
import { QUIZ_VOCAB } from '../../src/data/vocabulary'

const consonantRomanizations = new Set(consonants.map((char) => char.romanization))
const vowelRomanizations = new Set(vowels.map((char) => char.romanization))
const allRomanizations = new Set(allCharacters.map((char) => char.romanization))
const allHangulCharacters = new Set(allCharacters.map((char) => char.char))
const vocabMeanings = new Set(QUIZ_VOCAB.map((entry) => entry.meaning))

async function openQuiz(page: import('@playwright/test').Page) {
  await page.goto('/quiz')
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { level: 1, name: 'Quiz' })).toBeVisible()
}

async function startMode(page: import('@playwright/test').Page, name: string | RegExp) {
  await page.getByRole('button', { name }).click()
  await expect(page.getByText('Question 1 of 10')).toBeVisible()
}

async function optionTexts(page: import('@playwright/test').Page) {
  return page.locator('button.rounded-xl.border').evaluateAll((buttons) =>
    buttons.map((button) => button.textContent?.trim() ?? '').filter(Boolean),
  )
}

async function answerAndContinue(page: import('@playwright/test').Page) {
  await page.locator('button.rounded-xl.border').first().click()
  await page.getByRole('button', { name: /Next Question|See Results/ }).click()
}

test.describe('quiz mode picker', () => {
  test('shows all enabled subquiz cards with their descriptions', async ({ page }) => {
    await openQuiz(page)

    await expect(page.getByText('Character Recognition')).toBeVisible()
    await expect(page.getByRole('button', { name: /Consonants/ })).toContainText('19 characters')
    await expect(page.getByRole('button', { name: /Vowels/ })).toContainText('21 characters')
    await expect(page.getByRole('button', { name: /^한글\s*All/ })).toContainText('40 characters')

    await expect(page.getByText('More Modes')).toBeVisible()
    await expect(page.getByRole('button', { name: /Audio Contrast/ })).toContainText('pick the sound you hear')
    await expect(page.getByRole('button', { name: /Listen/ })).toContainText('Hear a sound')
    await expect(page.getByRole('button', { name: /Vocabulary/ })).toContainText('Korean word')
    await expect(page.getByRole('button', { name: /Mixed/ })).toContainText('Characters + vocabulary')
  })
})

test.describe('character quiz modes', () => {
  test('consonants mode loads a consonant recognition question', async ({ page }) => {
    await openQuiz(page)
    await startMode(page, /Consonants/)

    await expect(page.getByText('Romanization?')).toBeVisible()
    const options = await optionTexts(page)
    expect(options).toHaveLength(4)
    expect(options.every((option) => consonantRomanizations.has(option))).toBe(true)
  })

  test('vowels mode loads a vowel recognition question', async ({ page }) => {
    await openQuiz(page)
    await startMode(page, /Vowels/)

    await expect(page.getByText('Romanization?')).toBeVisible()
    const options = await optionTexts(page)
    expect(options).toHaveLength(4)
    expect(options.every((option) => vowelRomanizations.has(option))).toBe(true)
  })

  test('all mode loads a recognition question from the full character pool', async ({ page }) => {
    await openQuiz(page)
    await startMode(page, /^한글\s*All/)

    await expect(page.getByText('Romanization?')).toBeVisible()
    const options = await optionTexts(page)
    expect(options).toHaveLength(4)
    expect(options.every((option) => allRomanizations.has(option))).toBe(true)
  })
})

test.describe('audio quiz modes', () => {
  test('listen mode loads a replayable audio question with Hangul options', async ({ page }) => {
    await openQuiz(page)
    await startMode(page, /Listen/)

    await expect(page.getByText('Which character is this?')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Play sound' })).toBeVisible()
    const options = await optionTexts(page)
    expect(options).toHaveLength(4)
    expect(options.every((option) => allHangulCharacters.has(option))).toBe(true)
  })

  test('audio contrast mode loads a contrast listening question with focused Hangul options', async ({ page }) => {
    await openQuiz(page)
    await startMode(page, /Audio Contrast/)

    await expect(page.getByText('Which character is this?')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Play sound' })).toBeVisible()
    const options = await optionTexts(page)
    expect(options.length).toBeGreaterThanOrEqual(2)
    expect(options.length).toBeLessThanOrEqual(3)
    expect(options.every((option) => allHangulCharacters.has(option))).toBe(true)
  })
})

test.describe('word and mixed quiz modes', () => {
  test('vocabulary mode loads a Korean-word question with meaning options', async ({ page }) => {
    await openQuiz(page)
    await startMode(page, /Vocabulary/)

    await expect(page.getByText('What does this mean?')).toBeVisible()
    const options = await optionTexts(page)
    expect(options).toHaveLength(4)
    expect(options.every((option) => vocabMeanings.has(option))).toBe(true)
  })

  test('mixed mode starts with character questions and interleaves a vocabulary question', async ({ page }) => {
    await openQuiz(page)
    await startMode(page, /Mixed/)

    await expect(page.getByText('Romanization?')).toBeVisible()
    let options = await optionTexts(page)
    expect(options).toHaveLength(4)
    expect(options.every((option) => allRomanizations.has(option))).toBe(true)

    await answerAndContinue(page)
    await expect(page.getByText('Question 2 of 10')).toBeVisible()
    await expect(page.getByText('Romanization?')).toBeVisible()

    await answerAndContinue(page)
    await expect(page.getByText('Question 3 of 10')).toBeVisible()
    await expect(page.getByText('What does this mean?')).toBeVisible()
    options = await optionTexts(page)
    expect(options).toHaveLength(4)
    expect(options.every((option) => vocabMeanings.has(option))).toBe(true)
  })
})
