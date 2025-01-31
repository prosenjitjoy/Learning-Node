import { spawn, exec, fork } from 'node:child_process'

const child = spawn('pwd')
child.on('exit', function (code, signal) {
  console.log(`Child process exited. Code: ${code} - Signal: ${signal}`)
})

child.on('error', function (err) {
  console.error(`Child process encountered an error: ${err.message}`)
})

child.stdout.on('data', function (data) {
  console.log(`child stdout:\n${data}`)
})

child.stderr.on('data', function (data) {
  console.error(`child stderr:\n${data}`)
})

const find = spawn('find', ['.', '-type', 'f'])
const wc = spawn('wc', ['-l'])

find.stdout.pipe(wc.stdin)

wc.stdout.on('data', function (data) {
  console.log(`Number of files ${data}`)
})

exec('find . -type f | wc -l', function (err, stdout, stderr) {
  if (err) {
    console.error(`exec error: ${err}`)
    return
  }

  console.log(`Number of files ${stdout}`)
})

const child1 = spawn('find . -type f | wc -l', {
  stdio: 'inherit',
  shell: true,
  cwd: '/home/prosenjit/Music'
})


const child2 = spawn('echo $HOME/$ANSWER', {
  stdio: 'inherit',
  shell: true,
  env: { ANSWER: 42 }
})

const forked = fork('child.js')

forked.on('message', function (msg) {
  console.log('Message from child:', msg)
})

forked.send({ hello: 'world' })