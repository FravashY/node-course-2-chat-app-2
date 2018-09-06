const socket = io()

function scrollToBottom () {
  // Selectors
  const messages = jQuery('#messages')
  const newMessage = messages.children('li:last-child')
  // Heights
  const clientHeight = messages.prop('clientHeight')
  const scrollTop = messages.prop('scrollTop')
  const scrollHeight = messages.prop('scrollHeight')
  const newMessageHeight = newMessage.innerHeight()
  const lastMessageHeight = newMessage.prev().innerHeight()

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('newMessage', function (msg) {
  const formattedTime = moment(msg.createdAt).format('HH:mm:ss')
  const template = jQuery('#message-template').html()
  const html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  })

  jQuery('#messages').append(html)
  scrollToBottom()
})

socket.on('newLocationMessage', function (msg) {
  const formattedTime = moment(msg.createdAt).format('HH:mm:ss')
  const template = jQuery('#location-message-template').html()
  const html = Mustache.render(template, {
    from: msg.from,
    createdAt: formattedTime,
    url: msg.url
  })

  jQuery('#messages').append(html)
  scrollToBottom()
})

socket.on('disconnect', function () {
  console.log('Disconnected from server')
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()

  const msgTextBox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: msgTextBox.val()
  }, function () {
    msgTextBox.val('')
  })
})

const locationButton = jQuery('#send-location')
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch location.')
  })
})
