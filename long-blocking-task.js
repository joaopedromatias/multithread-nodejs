const { parentPort } = require('worker_threads')
const eightBillion = 8000000000

function longBlockingTask() {
  console.log('Starting a long task')
  for (let i = 0; i < eightBillion; i++) {}
  console.log('Finished long task')
  if (parentPort) {
    // if the caller is a thread, sends a message to the caller thread
    parentPort.postMessage('done')
  }
}

if (parentPort) {
  // if the caller is a thread, calls the function to perform the long task
  longBlockingTask()
}

module.exports = { longBlockingTask }
