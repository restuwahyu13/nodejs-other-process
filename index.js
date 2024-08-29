const express = require('express')
const { ChildProcess } = require('./child')
const { WorkerThread } = require('./worker')

const app = express()

app.get('*', (_req, res) => {
	// this is other process, not blocking main process or main process not blocking other process
	ChildProcess.run()
	WorkerThread.run()

	// this main process
	res.status(200).json({ msg: 'Hello World! With Get' })
})

app.post('*', (_req, res) => {
	// this main process
	res.status(200).json({ msg: 'Hello World! With Post' })

	// this is other process, not blocking main process or main process not blocking other process
	ChildProcess.run()
	WorkerThread.run()
})

app.listen(3000, () => console.info(`Server listening on port 3000`))
