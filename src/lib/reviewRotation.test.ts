import { describe, it, expect } from 'vitest'
import { nextIndex } from './reviewRotation'

describe('nextIndex', () => {
  it('advances forward by one', () => {
    expect(nextIndex(0, 5)).toBe(1)
  })

  it('wraps forward past the end', () => {
    expect(nextIndex(4, 5)).toBe(0)
  })

  it('wraps backward past the start', () => {
    expect(nextIndex(0, 5, -1)).toBe(4)
  })

  it('moves backward within range', () => {
    expect(nextIndex(2, 5, -1)).toBe(1)
  })

  it('stays put for a single item without dividing by zero', () => {
    expect(nextIndex(0, 1)).toBe(0)
  })
})
