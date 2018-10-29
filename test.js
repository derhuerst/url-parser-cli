'use strict'

const path = require('path')
const exec = require('execa')
const assert = require('assert')

const bin = path.join(__dirname, 'cli.js')

const showError = (err) => {
	console.error(err)
	process.exitCode = 1
}

exec.shell(bin)
.catch((res) => {
	assert.ok(res)
	assert.ok(res.code > 0)
	assert.ok(res.stderr.length > 0)
})
.catch(showError)

exec.shell(bin + `'example.org' some-invalid-component`)
.catch((res) => {
	assert.ok(res)
	assert.ok(res.code > 0)
	assert.ok(res.stderr.length > 0)
})
.catch(showError)

exec.shell(bin + ` --json 'https://example.org/foo/bar'`)
.then((res) => {
	assert.strictEqual(res.stdout, JSON.stringify({
		scheme: 'https',
		username: '',
		password: '',
		host: 'example.org',
		port: null,
		path: ['foo', 'bar'],
		query: null,
		fragment: null,
		cannotBeABaseURL: false
	}))
})
.catch(showError)

exec.shell(bin + ` --json 'https://example.org/foo/bar' host`)
.then((res) => {
	assert.strictEqual(res.stdout, JSON.stringify('example.org'))
})
.catch(showError)

exec.shell(bin + ` 'https://example.org/foo/bar' scheme`)
.then((res) => {
	assert.strictEqual(res.stdout, `https`)
})
.catch(showError)
