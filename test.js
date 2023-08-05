import {fileURLToPath} from 'node:url'
import {execa as exec} from 'execa'
import {fail, ok, strictEqual} from 'node:assert'

const bin = fileURLToPath(new URL('cli.js', import.meta.url).href)

{
	try {
		await exec(bin)
		fail('command did not fail')
	} catch (err) {
		ok(err)
		ok(err.exitCode > 0)
		ok(err.stderr.length > 0)
	}
}

{
	try {
		await exec(bin, [
			'http://example.org',
			'some-invalid-component',
		])
		fail('command did not fail')
	} catch (err) {
		ok(err)
		ok(err.exitCode > 0)
		ok(err.stderr.length > 0)
	}
}

{
	const res = await exec(bin, [
		'--json',
		'https://example.org/foo/bar',
	])

	strictEqual(res.stdout, JSON.stringify({
		scheme: 'https',
		username: '',
		password: '',
		host: 'example.org',
		port: null,
		path: ['foo', 'bar'],
		query: null,
		fragment: null,
	}))
}

{
	const res = await exec(bin, [
		'--json', 'https://example.org/foo/bar',
		'host',
	])

	strictEqual(res.stdout, JSON.stringify('example.org'))
}

{
	const res = await exec(bin, [
		'https://example.org/foo/bar',
		'scheme',
	])

	strictEqual(res.stdout, `https`)
}

console.info('seems to work ✔')
