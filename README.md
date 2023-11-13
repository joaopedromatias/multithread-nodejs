This is a basic study of decreasing NodeJs programs execution time using multithreading.

## Multiple threads or multiple processes?

Taking advantage of the underlying hardware CPU cores allows developers to achieve `paralelism`. It means that the tasks running on the program will be processed at the same time by different CPU cores, which will decrease the execution time of the program. One of the best ways to do it is by using `multiple threads` wihtin a process.

It is better than spawning multiple processes due to the fact that:

- Spawning a new process has more cost to the computer, since it needs to allocate memory to the new process. Threads use the memory of the process that already exists.
- Processes do not share memory among them, but threads running within a process does, which makes it easy to establish communication among them.

## NodeJs

NodeJs runs JavaScript code in a single-thread. Some operations, like `disk I/O` and `network`, are automatically offloaded to the `libuv` threadpool, which has 4 threads available. This makes some NodeJs programs multithreaded by default. This behaviour allows tasks to be executed in the main thread while other tasks are being executed on other threads, avoiding that the main thread gets blocked.

A blocked main thread could lead, for example, to a web server being uncapable of responding to new incoming user requests.

```js
fs.readFile('path-to-file.txt', processFileFn) // offloaded to threadpool

otherTask() // not blocked
```

However, not all blocking tasks are automatically offloaded to the threadpool. To resolve this, NodeJs has the `worker-threads` module, which allows developers to offload tasks to new threads instead of running all of them in the main thread.

The advantage of using multithreading that this repository focus is on decreasing the execution time of a program.

- `./single-thread.js` -> long blocking tasks executed without multithreading
- `./multithreading.js` -> long blocking tasks executed using multithreading
- `./long-blocking-task.js` -> represents a long blocking task, which in a real application scnario could be copying some objects from an S3 bucket to another bucket.

## Results

### `Single Thread program`

![Result for single thread](./results/single-thread.png)

### `Multi Thread program`

![Result for multi thread](./results/multithreading.png)

The multi thread program was 27 times faster than the single thread program
