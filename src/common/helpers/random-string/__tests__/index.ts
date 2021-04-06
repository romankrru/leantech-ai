import {randomString} from '../index'

describe('random string', () => {
  it('should generate string', () => {
    const result = randomString(3)
    expect(typeof result).toBe('string')
  })

  it('should generate string of provided length', () => {
    expect(randomString(0)).toHaveLength(0)
    expect(randomString(1)).toHaveLength(1)
    expect(randomString(2)).toHaveLength(2)
    expect(randomString(3)).toHaveLength(3)
    expect(randomString(44)).toHaveLength(44)
    expect(randomString(123)).toHaveLength(123)
    expect(randomString(999)).toHaveLength(999)
  })
})
