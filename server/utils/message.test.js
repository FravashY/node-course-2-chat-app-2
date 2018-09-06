const expect = require('expect')

const {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'from'
    const text = 'text'
    const msg = generateMessage(from, text)

    expect(msg.from).toBe(from)
    expect(msg.text).toBe(text)
    expect(msg.createdAt).toBeA('number')
    expect(msg).toInclude({from, text})
  });
})
