const socket = io()

socket.on('connect', function () {
  console.log('Connected to server')
})

socket.on('newMessage', function (msg) {
  console.log('newMessage', msg)
  const li = jQuery('<li></li>')
  li.text(`${msg.from}: ${msg.text}`)

  jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (msg) {
  const li = jQuery('<li></li>')
  const a = jQuery('<a target="_blank">My current location</a>')

  li.text(`${msg.from}: `)
  a.attr('href', msg.url)
  li.append(a)

  jQuery('#messages').append(li)
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
