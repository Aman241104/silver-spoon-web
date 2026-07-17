import { describe, it, expect } from 'vitest'
import { slugify, generateUniqueId } from './generateUniqueId'

describe('slugify', () => {
  it('lowercases, trims, and hyphenates a product name', () => {
    expect(slugify('Gold Plated Ring!!')).toBe('gold-plated-ring')
    expect(slugify("  Men's   Kada  ")).toBe('mens-kada')
  })
})

describe('generateUniqueId', () => {
  it('succeeds on the first attempt', async () => {
    const id = await generateUniqueId('Gold Ring', async () => ({ ok: true }), 3, () => 'ab12')
    expect(id).toBe('gold-ring-ab12')
  })

  it('retries with a new suffix when the first candidate is taken', async () => {
    const suffixes = ['aa11', 'bb22']
    let calls = 0
    const id = await generateUniqueId(
      'Gold Ring',
      async (candidate) => ({ ok: candidate === 'gold-ring-bb22' }),
      3,
      () => suffixes[calls++]
    )
    expect(id).toBe('gold-ring-bb22')
  })

  it('throws after exhausting all attempts', async () => {
    await expect(
      generateUniqueId('Gold Ring', async () => ({ ok: false }), 2, () => 'zz99')
    ).rejects.toThrow('Could not generate a unique product ID')
  })
})
