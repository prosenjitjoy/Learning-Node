import fs from 'node:fs'
import zlib from 'node:zlib'
import crypto from 'node:crypto'
import { pipeline } from 'node:stream/promises'

const file = process.argv[2]

const algorithm = 'aes-256-ctr'
const key = crypto.randomBytes(32)
const iv = crypto.randomBytes(16)

await pipeline(
  fs.createReadStream(file),
  zlib.createGzip(),
  // async function* (source) {
  //   for await (const chunk of source) {
  //     process.stdout.write('.')
  //     yield chunk
  //   }
  // },
  crypto.createCipheriv(algorithm, key, iv),
  fs.createWriteStream(file + '.gz')
)