import { describe, it, expect } from 'vitest'
import { selectWeeklyProducts } from './weeklySelection'

const pool = [1, 2, 3, 4, 5, 6, 7, 8]

describe('selectWeeklyProducts', () => {
  it('returns the first N in pool order when not randomized', () => {
    expect(selectWeeklyProducts(pool, 3, false)).toEqual([1, 2, 3])
  })

  it('returns the whole pool when count exceeds pool size', () => {
    expect(selectWeeklyProducts([1, 2], 5, false)).toEqual([1, 2])
  })

  it('uses the injected shuffle function when randomized', () => {
    expect(selectWeeklyProducts(pool, 3, true, (arr) => [...arr].reverse())).toEqual([8, 7, 6])
  })

  it('returns exactly `count` items from the pool when randomized with the default shuffle', () => {
    const result = selectWeeklyProducts(pool, 4, true)
    expect(result).toHaveLength(4)
    for (const item of result) expect(pool).toContain(item)
  })
})
