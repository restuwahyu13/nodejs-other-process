const https = require('node:https')
const { delay } = require('./delay')

;(async () => {
	await delay(10000)

	const req = https.request('https://jsonplaceholder.typicode.com/users', (res) => {
		let data = ''

		res.on('data', (chunk) => {
			data += chunk.toString()
		})

		res.on('end', () => {
			if (data) {
				process.send(JSON.parse(data))
			} else {
				process.send('No data received')
			}
		})
	})

	req.end()
})()
