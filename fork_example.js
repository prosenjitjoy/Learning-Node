import { createServer } from 'node:http'
import { fork } from 'node:child_process'

const server = createServer()

server.on('request', function (req, res) {
  if (req.url === '/compute') {
    const compute = fork('compute.js')
    compute.send('start')
    compute.on('message', function (sum) {
      res.end(`Sum is ${sum}`)
    })
  } else {
    res.end('Ok')
  }
})

server.listen(3000, function () {
  console.log('Server is running...')
})