const expect = require('expect')

const {generateMessage, generateLocationMessage} = require('./message')

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'from'
    const latitude = 1
    const longitude = 1
    const url = `http://google.com/maps?q=1,1`
    const msg = generateLocationMessage(from, latitude, longitude)
    // `http://google.com/maps?q=${latitude},${longitude}`

    expect(msg.from).toBe(from)
    expect(msg.createdAt).toBeA('number')
    expect(msg.url).toBe(`http://google.com/maps?q=${latitude},${longitude}`)
    expect(msg).toInclude({from, url})
  });
});
