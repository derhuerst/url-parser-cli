#!/usr/bin/env node
import {createRequire} from 'node:module'
const require = createRequire(import.meta.url)

import {parseArgs} from 'node:util'
const pkg = require('./package.json')

const {
	values: flags,
	positionals: args,
} = parseArgs({
	options: {
		'help': {
			type: 'boolean',
			short: 'h',
		},
		'version': {
			type: 'boolean',
			short: 'v',
		},
		'json': {
			type: 'boolean',
			short: 'j',
		},
	},
	allowPositionals: true,
})

if (flags.help) {
	process.stdout.write(`
Usage:
    parse-url <url> [component]
Options:
	--json  -j  Output JSON instead of a pretty represenation.
Examples:
    parse-url 'https://example.org:2000/hello/world?foo=bar#baz' host
\n`)
	process.exit(0)
}

if (flags.version) {
	process.stdout.write(`parse-url v${pkg.version}\n`)
	process.exit(0)
}

import {URL} from 'whatwg-url'
import {inspect} from 'node:util'
import {isatty} from 'node:tty'

const showError = (err) => {
	if (process.env.NODE_ENV === 'dev') console.error(err)
	else console.error(err.message || (err + ''))
	process.exit(1)
}

const url = args[0]
if ('string' !== typeof url || !url) {
	showError('url must be a non-empty string.')
}
let parsed
try {
	const _ = new URL(url)
	parsed = {
		scheme: _.protocol.slice(0, -1), // strip `:`
		username: _.username,
		password: _.password,
		host: _.host,
		// hostname: _.hostname,
		port: _.port ? +_.port : null, // _.port is a string
		path: _.pathname.split('/').slice(1),
		query: _.search.slice(1) || null, // strip `?`
		fragment: _.hash.slice(1) || null, // strip `#`
	}
} catch (err) {
	showError(err)
}
if (parsed === null) showError('invalid URL')

const component = args[1]
let val = parsed
if (component) {
	if (!(component in parsed)) showError('Invalid component.')
	val = parsed[component]
}

if (flags.json) {
	process.stdout.write(JSON.stringify(val) + '\n')
} else if (typeof val === 'string') {
	process.stdout.write(val + '\n')
} else {
	const stdoutIsATerminal = isatty(process.stdout.fd)
	process.stdout.write(inspect(val, {
		depth: null,
		colors: stdoutIsATerminal,
		compact: false
	}) + '\n')
}
