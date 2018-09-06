const moment = require('moment')

const generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}

const generateLocationMessage = (from, latitude, longitude) => {
  // http://google.com/maps?q=55.7473792,37.765119999999996
  return {
    from,
    url: `http://google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}
