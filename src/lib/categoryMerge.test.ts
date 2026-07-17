import { describe, it, expect } from 'vitest'
import { mergeCategories } from './categoryMerge'

const hardcoded = [
  { id: 'rings', name: 'Rings' },
  { id: 'chains', name: 'Chains' },
]

describe('mergeCategories', () => {
  it('appends a custom category not in the hardcoded set', () => {
    expect(mergeCategories(hardcoded, [{ slug: 'temple-jewellery', name: 'Temple Jewellery' }])).toEqual([
      { id: 'rings', name: 'Rings' },
      { id: 'chains', name: 'Chains' },
      { id: 'temple-jewellery', name: 'Temple Jewellery' },
    ])
  })

  it('does not duplicate a custom slug that collides with a hardcoded id', () => {
    expect(mergeCategories(hardcoded, [{ slug: 'rings', name: 'Rings (custom image only)' }])).toEqual(hardcoded)
  })

  it('falls back to a title-cased slug when the custom category has no name', () => {
    expect(mergeCategories(hardcoded, [{ slug: 'silver-idols', name: null }])).toEqual([
      ...hardcoded,
      { id: 'silver-idols', name: 'Silver Idols' },
    ])
  })
})
