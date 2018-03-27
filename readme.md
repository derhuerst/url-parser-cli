# parse-url-cli

**Parse a URL, get one or all components pretty-printed or as JSON.** Uses [`whatwg-url`](https://github.com/jsdom/whatwg-url) underneath.

[![npm version](https://img.shields.io/npm/v/parse-url-cli.svg)](https://www.npmjs.com/package/parse-url-cli)
[![build status](https://api.travis-ci.org/derhuerst/parse-url-cli.svg?branch=master)](https://travis-ci.org/derhuerst/parse-url-cli)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/parse-url-cli.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install -g parse-url-cli
```

Or use [`npx`](https://npmjs.com/package/npx). ✨


## Usage

```
Usage:
    parse-url <url> [component]
Options:
	--json  -j  Output JSON instead of a pretty represenation.
Examples:
    parse-url 'https://example.org:2000/hello/world?foo=bar#baz' host
    parse-url --json 'example.org:2000'
```


## Related

- [`url-decode-encode-cli`](https://github.com/derhuerst/url-decode-encode-cli) – Command line utility for URL decoding & encoding.
- [`query-string-cli`](https://github.com/derhuerst/query-string-cli) – Decode & encode URL query strings in the command line.
- [`whatwg-url`](https://github.com/jsdom/whatwg-url) – An implementation of the WHATWG URL Standard in JavaScript


## Contributing

If you have a question or have difficulties using `parse-url-cli`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/parse-url-cli/issues).
