import cluster from 'node:cluster'
import os from 'node:os'

if (cluster.isPrimary) {
  const cpus = os.availableParallelism()
  console.log(`Forking for ${cpus} CPUS`)
  for (var i = 0; i < cpus; i++) {
    cluster.fork()
  }

  setTimeout(function () {
    Object.values(cluster.workers).forEach(function (worker) {
      worker.send(`Hello Worker ${worker.id}`)
    })
  }, 1_000)
} else {
  import('./slow-server.js')
}

cluster.on('exit', function (worker) {
  if (worker.exitedAfterDisconnect === true) {
    return
  }

  console.log(`Worker ${worker.id} crashed. Starting a new worker...`)

  cluster.fork()
})

console.log(`To restart workers, user: kill -SIGUSR2 ${process.pid}`)

process.on('SIGUSR2', function () {
  const workers = Object.values(cluster.workers)
  function restartWorker(workerIndex) {
    const worker = workers[workerIndex]
    if (!worker) {
      return
    }
    worker.on('exit', function () {
      if (worker.exitedAfterDisconnect === false) {
        return
      }
      console.log(`Exited process ${worker.process.pid}`)
      cluster.fork().on('listening', function () {
        restartWorker(workerIndex + 1)
      })
    })
    worker.disconnect()
  }

  restartWorker(0)
})
