const { isMainThread, Worker, MessageChannel } = require('node:worker_threads')

class WorkerThread {
	static __workerUsers(cb) {
		const { port1, port2 } = new MessageChannel()

		if (isMainThread) {
			const addition = new Worker('./worker.users', { name: 'users.js', workerData: 'users' })
			addition.on('message', (chunk) => port2.postMessage(chunk))
			addition.on('messageerror', cb)
			addition.on('error', cb)
		}

		port1.on('message', cb)
		port1.on('messageerror', cb)
		port1.unref()
	}

	static __workerPosts(cb) {
		const { port1, port2 } = new MessageChannel()

		if (isMainThread) {
			const addition = new Worker('./worker.posts', { name: 'posts.js', workerData: 'posts' })
			addition.on('message', (chunk) => port2.postMessage(chunk))
			addition.on('messageerror', cb)
			addition.on('error', cb)
		}

		port1.on('message', cb)
		port1.on('messageerror', cb)
		port1.unref()
	}

	static run() {
		WorkerThread.__workerUsers((data) => console.info(`Worker threads users: ${data.length}`))
		WorkerThread.__workerPosts((data) => console.info(`Worker threads posts: ${data.length}`))
	}
}

exports.WorkerThread = WorkerThread
