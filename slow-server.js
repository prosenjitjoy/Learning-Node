import { createServer } from 'node:http'

createServer(function (req, res) {
  for (var i = 0; i < 1e9; i++) {
    // console.log(".")
  }
  res.end()
}).listen(3000, function () {
  console.log(`Process ${process.pid}`)
})

process.on('message', function (msg) {
  console.log(`Message from primary: ${msg}`)
})

// setTimeout(function () {
//   console.log(`Server down: ${process.pid}`)
//   process.exit(1)
// }, Math.random() * 10_000)