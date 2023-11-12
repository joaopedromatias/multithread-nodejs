const { Worker } = require('worker_threads')
const os = require('os')

const start = new Date()
const cpuCores = os.cpus()
let longBlockingTasksFinished = 0

const longBlockingTasksPromise = new Promise((resolve, reject) => {
  cpuCores.forEach(() => {
    const thread = new Worker('./long-blocking-task.js')
    thread.on('message', () => {
      longBlockingTasksFinished++
      if (longBlockingTasksFinished === cpuCores.length) {
        resolve()
      }
    })
    thread.on('error', (err) => {
      reject(err)
    })
  })
})

longBlockingTasksPromise
  .then(() => {
    const end = new Date()
    const executionTimeInSeconds = (end - start) / 1000
    console.log(`Execution time: ${executionTimeInSeconds} seconds`)
  })
  .catch((err) => {
    console.error(err)
  })
