import fs from 'node:fs'
import { randomBytes } from 'node:crypto'
import { Writable, Readable, Duplex, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

// const file = fs.createWriteStream('./big.file')

// for (var i = 0; i <= 1e5; i++) {
//   file.write(randomBytes(16).toString('hex'))
// }

// file.end()

// import { createServer } from 'node:http';
// import { readFile } from 'node:fs/promises';

// const server = createServer();

// server.on('request', async (req, res) => {
//   const src = fs.createReadStream('./big.file');
//   src.pipe(res)
// });

// server.listen(3000, () => {
//   console.log('Server is running...');
// });

// class myWritableStream extends Writable {
// }

// writable stream
const outStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback();
  }
})

// process.stdin.pipe(process.stdout)
process.stdin.pipe(outStream)

// readable stream
const inStream = new Readable()
inStream.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
inStream.push('abcedfghijklmnopqrstuvwxyz')
inStream.push(null)

inStream.pipe(process.stdout)

const inStream1 = new Readable({
  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++))
    if (this.currentCharCode > 90) {
      this.push(null)
    }
  }
})

inStream1.currentCharCode = 65
inStream1.pipe(process.stdout)

const inStream2 = Readable.from('abcedfghijklmnopqrstuvwxyz')
inStream2.pipe(process.stdout)

function* generate() {
  for (var i = 65; i <= 90; i++) {
    yield String.fromCharCode(i)
  }
}

const inStream3 = Readable.from(generate())
inStream3.pipe(process.stdout)

// duplex streams
const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString())
    callback()
  },

  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++))
    if (this.currentCharCode > 122) {
      this.push(null)
    }
  }
})

inoutStream.currentCharCode = 97;
process.stdin.pipe(inoutStream).pipe(process.stdout)

// transform streams
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

process.stdin.pipe(upperCaseTransform).pipe(process.stdout)

async function* ghRepos() {
  const response = await fetch('https://api.github.com/users')
  const users = await response.json()

  for (var i = 0; i < 10; i++) {
    const reposResponse = await fetch(users[i].repos_url)
    yield await reposResponse.json()
  }
}

async function* ghFirsts() {
  for await (const repos of ghRepos()) {
    if (repos[0]) {
      yield repos[0].full_name + '\n'
    }
  }
}

// Readable.from(ghFirsts()).pipe(process.stdout)
// await pipeline(ghFirsts(), process.stdout)

async function* upperCaseTr(source) {
  for await (const chunk of source) {
    yield String(chunk).toUpperCase()
  }
}

await pipeline(
  ghFirsts(),
  upperCaseTr,
  process.stdout
)