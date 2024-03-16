# url-parser-cli

**Parse a URL, get one or all components pretty-printed or as JSON.** Uses [`url`](https://docs.rs/url/) underneath.

[![crates.io version](https://img.shields.io/crates/v/url_parser_cli.svg)](https://crates.io/crates/url_parser_cli)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/url-parser-cli.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)

*Note:* I'm a Rust beginner, so the code might be unelegant. 🙈

*Note:* This utility has been rewritten in Rust, checkout [url-parser-cli](https://github.com/derhuerst/url-parser-cli).


## Installing

```shell
cargo install url_parser_cli
```

You can also download a binary from the [releases page](https://github.com/derhuerst/chunked-transfer-cli/releases).


## Usage

```txt
Parse a URL, get one or all components pretty-printed or as JSON.

Usage: url_parser_cli [OPTIONS] <URL> [BASE_URL]

Arguments:
  <URL>       URL to parse
  [BASE_URL]  base URL to parse <URL> from

Options:
  -j, --json     print output as JSON
  -p, --pretty   print multi-line output
  -h, --help     Print help
  -V, --version  Print version
```


## Related

- [curl's `trurl`](https://github.com/curl/trurl) – Command line tool for URL parsing and manipulation.
- [`url-decode-encode-cli`](https://github.com/derhuerst/url-decode-encode-cli) – Command line utility for URL decoding & encoding.
- [`query-string-cli`](https://github.com/derhuerst/query-string-cli) – Decode & encode URL query strings in the command line.
- [`url`](https://docs.rs/url/) – An implementation of the WHATWG URL Standard.


## Contributing

If you have a question or have difficulties using url-parser-cli, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/url-parser-cli/issues).
