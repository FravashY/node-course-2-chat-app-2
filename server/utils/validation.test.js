const expect = require('expect')

const {isRealString} = require('./validation')

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const isString = isRealString(4)

    expect(isString).toBeFalsy()
    expect(isString).toBe(false)
  });

  it('should reject string with only spaces', () => {
    const isString = isRealString('   ')

    expect(isString).toBeFalsy()
    expect(isString).toBe(false)
  });

  it('should allow string with non-space characters', () => {
    const isString = isRealString(' 1qaz 2wsx ')

    expect(isString).toBeTruthy()
    expect(isString).toBe(true)
  });
})
