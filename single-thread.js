const os = require('os')

const { longBlockingTask } = require('./long-blocking-task')

const start = new Date()
const cpuCores = os.cpus()

cpuCores.forEach(() => {
  longBlockingTask()
})

const end = new Date()
const executionTimeInSeconds = (end - start) / 1000

console.log(`Execution time: ${executionTimeInSeconds} seconds`)
