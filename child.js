process.on('message', function (msg) {
  console.log('Message from parent:', msg)
})

var counter = 0;

setInterval(function () {
  process.send({ counter: counter++ })
}, 1000)