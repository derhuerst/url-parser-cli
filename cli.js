#!/usr/bin/env node
'use strict'

const mri = require('mri')
const {parseURL} = require('whatwg-url')
const {inspect} = require('util')
const {isatty} = require('tty')

const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'version', 'v',
		'json', 'j'
	]
})

if (argv.help || argv.h) {
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

if (argv.version || argv.v) {
	process.stdout.write(`parse-url v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	if (process.env.NODE_ENV === 'dev') console.error(err)
	else console.error(err.message || (err + ''))
	process.exit(1)
}

const url = argv._[0]
if ('string' !== typeof url || !url) {
	showError('url must be a non-empty string.')
}
let parsed
try {
	parsed = parseURL(url)
} catch (err) {
	showError(err)
}

const component = argv._[1]
let val = parsed
if (component) {
	if (!(component in parsed)) showError('Invalid component.')
	val = parsed[component]
}

if (argv.json || argv.j) {
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
