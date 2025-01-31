import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const commaSplitter = new Transform({
  readableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().split(','))
    callback()
  }
})

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    const obj = {}
    for (var i = 0; i < chunk.length; i += 2) {
      obj[chunk[i].trim()] = chunk[i + 1].trim()
    }
    this.push(obj)
    callback()
  }
})

const objectToString = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    this.push(JSON.stringify(chunk, null, 2) + '\n')
    callback()
  }
})

await pipeline(
  process.stdin,
  commaSplitter,
  arrayToObject,
  objectToString,
  process.stdout
)

