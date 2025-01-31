import ld from 'lodash';
import { server } from './server.js';
import { setTimeout } from 'node:timers/promises';
// import { readFileSync, readFile } from 'node:fs';
import data from './file.json' with {type: 'json'};
import { readFile } from 'node:fs';
// import * as config from './config.js';
import { EventEmitter } from 'node:events';


// var randomNum = Math.random();
// console.log(randomNum);
// console.log(ld.random(1, 99));

// server.listen(process.env.PORT, process.env.HOST, function() {
//   console.log('Server is running...');
// })

// const printGreeting = function() {
//   console.log("Hello");
// }
//
// const intervalId = setInterval(printGreeting, 4000);
// setTimeout(function() {
//   console.log("Clearing interval...")
//   clearInterval(intervalId);
// }, 15000);
//
// const timerId = setTimeout(function() {
//   console.log("Will not print")
// }, 0);
//
// clearTimeout(timerId);

// function slowOperation(callbackFunction) {
//   setTimeout(function() {
//     callbackFunction({ success: true })
//   }, 1000);
// }
//
// function handlerFunction(output) {
//   if (!output.success) {
//     // something went wrong
//     console.log("Something went wrong");
//   }
//   // do something with output
//   console.log("Doing something with output");
// }
//
// slowOperation(function(output) {
//   handlerFunction(output);
//   console.log("Operation success");
// });
//
// console.log("Here");

// setTimeout(2000).then(function callback() {
//   console.log('World');
// });
//
// console.log('Hello');

// const data = readFileSync('/home/prosenjit/.bash_history');
// console.log(`Length: ${data.length}`);
// console.log(`Process: ${process.pid}`);

// readFile('/home/prosenjit/.bash_history', function cb(error, data) {
//   console.log(`Length: ${data.length}`);
// })
//
// console.log(`Process: ${process.pid}`);

// async function logFileLength() {
//   const data = await readFile('/home/prosenjit/.bash_history');
//   console.log(`Length: ${data.length}`);
// }
//
// logFileLength();
// console.log(`Process: ${process.pid}`);
//
// for (var i = 0; i < 5; i++) {
//   console.log(i + 0);
// }
//
// for (var i = 0; i < 5; i++) {
//   console.log(i + 5);
// }

// console.log(data)

// function args(...arg) {
//   console.log(arg, import.meta.filename, import.meta.dirname)
// }
//
// args(1, 5, 9, 11)

// console.log(config, config.SERVER_URL())

// // can be used as both callback and promise pattern
// const readFileAsArray = function (file, cb = () => { }) {
//   return new Promise((resolve, reject) => {
//     readFile(file, function (err, data) {
//       if (err) {
//         reject(err)
//         return cb(err)
//       }
//       const lines = data.toString().trim().split('\n');
//       resolve(lines)
//       cb(null, lines)
//     })
//   })
// }

// readFileAsArray('/home/prosenjit/.bash_history')
//   .then((lines) => {
//     console.log(lines)
//   })
//   .catch((err) => {
//     console.error(err)
//   })

// async function countOdd() {
//   try {
//     const lines = await readFileAsArray('./numbers.txt')
//     const numbers = lines.map(Number)
//     const oddCount = numbers.filter(n => n % 2 === 1).length
//     console.log('Odd numbers count:', oddCount)
//   } catch (err) {
//     console.error(err)
//   }
// }

// countOdd()

// // promised-based version
// async function readFileAsArray(file) {
//   const data = await readFile(file, 'utf8')
//   const lines = data.trim().split('\n')
//   return lines
// }

// async function countOdd() {
//   try {
//     const lines = await readFileAsArray('./numbers.txt')
//     const numbers = lines.map(Number)
//     const oddCount = numbers.filter(n => n % 2 === 1).length
//     console.log('Odd numbers count:', oddCount)
//   } catch (err) {
//     console.error(err)
//   }
// }

// countOdd()

// using events 

class ReaderEmitter extends EventEmitter {
  readFileAsArray(file) {
    readFile(file, (err, data) => {
      if (err) {
        this.emit('error', err)
        return
      }
      const lines = data.toString().trim().split('\n')
      this.emit('data', lines)
    })
  }
}

const reader = new ReaderEmitter()

reader.on('data', (lines) => {
  const numbers = lines.map(Number)
  const oddNumbers = numbers.filter((n) => n % 2 == 1)
  console.log('Odd numbers count:', oddNumbers.length)
})

reader.on('error', (err) => {
  throw err;
})

reader.readFileAsArray('./numbers.txt')

class WithLog extends EventEmitter {
  execute(taskFunc) {
    this.emit('begin')
    taskFunc()
    this.emit('end')
  }
}

const withLog = new WithLog()
withLog.on('begin', () => console.log('About to execute'))
withLog.on('end', () => console.log('Done with execute'))
withLog.execute(() => console.log('*** Executing task ***'))

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    this.emit('begin')
    console.time('execute')
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit('error', err)
      }
      this.emit('data', data)
      console.timeEnd('execute')
      this.emit('end');
    })
  }
}

const withTime = new WithTime()
withTime.on('begin', () => console.log('About to execute'))
withTime.on('end', () => console.log('Done with execute'))
withTime.on('error', (err) => {
  // do something with err
  console.log(err)
})
withTime.execute(readFile, '')
withTime.execute(readFile, import.meta.filename)

// // promised based event
// class WithTime extends EventEmitter {
//   async execute(asyncFunc, ...args) {
//     this.emit('begin');
//     try {
//       console.time('execute');
//       const data = await asyncFunc(...args);
//       this.emit('data', data);
//       console.timeEnd('execute');
//       this.emit('end');
//     } catch (err) {
//       this.emit('error', err);
//     }
//   }
// }