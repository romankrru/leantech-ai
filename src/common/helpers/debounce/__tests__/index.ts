import {debounce} from '../index'
import {sleep} from 'common/tests'

describe('debounce', () => {
  it('should work correctly', async () => {
    const testFn = jest.fn()
    const debounced = debounce(testFn, 50)
    expect(testFn).toHaveBeenCalledTimes(0)
    debounced()
    expect(testFn).toHaveBeenCalledTimes(1)
    debounced()
    expect(testFn).toHaveBeenCalledTimes(1)
    debounced()
    expect(testFn).toHaveBeenCalledTimes(1)
    debounced()
    expect(testFn).toHaveBeenCalledTimes(1)
    await sleep(100)
    expect(testFn).toHaveBeenCalledTimes(1)
    debounced()
    expect(testFn).toHaveBeenCalledTimes(2)
    await sleep(100)
    debounced()
    expect(testFn).toHaveBeenCalledTimes(3)
    debounced()
    expect(testFn).toHaveBeenCalledTimes(3)
  })
})
