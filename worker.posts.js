const { parentPort, workerData } = require('node:worker_threads')
const https = require('node:https')
const { delay } = require('./delay')

;(async () => {
	await delay(10000)

	if (workerData === 'posts') {
		const req = https.request('https://jsonplaceholder.typicode.com/posts', (res) => {
			let data = ''

			res.on('data', (chunk) => {
				data += chunk.toString()
			})

			res.on('end', () => {
				if (data) {
					parentPort.postMessage(JSON.parse(data))
				} else {
					parentPort.postMessage('No data received')
				}
			})
		})

		req.end()
	} else {
		parentPort.postMessage('Http request failed')
	}
})()
