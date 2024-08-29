const { fork } = require('node:child_process')

class ChildProcess {
	static _childProcessUsers(cb) {
		const users = fork('./child.users', { detached: true })
		users.on('message', cb)
	}

	static _childProcessPosts(cb) {
		const users = fork('./child.posts', { detached: true })
		users.on('message', cb)
	}

	static async run() {
		ChildProcess._childProcessUsers((data) => console.info(`Child process users: ${data.length}`))
		ChildProcess._childProcessPosts((data) => console.info(`Child process posts: ${data.length}`))
	}
}

exports.ChildProcess = ChildProcess
