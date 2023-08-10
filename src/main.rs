use url::Url;
use clap::Parser;
use serde::Serialize;

#[derive(Parser, Debug)]
#[clap(version, about, long_about = None)]
struct Cli {
	/// URL to parse
	url: String,
	/// base URL to parse <URL> from
	base_url: Option<String>,

	/// print output as JSON
	#[arg(short, long)]
    json: bool,
}

#[derive(Debug, Serialize)]
struct UrlForOutput {
	scheme: String,
	username: String,
	password: Option<String>,
	host: Option<String>,
	port: Option<u16>,
	path: String,
	query: Option<String>,
	fragment: Option<String>,
}

fn main() {
	let cli = Cli::parse();

	let parsed = match cli.base_url {
		Some(base_url) => Url::parse(&base_url).and_then(|b| b.join(&cli.url)),
		None => Url::parse(&cli.url),
	};
	if let Err(err) = parsed {
		eprintln!("Could not parse the url: {}", err);
		std::process::exit(1);
	}
	let url = parsed.unwrap();

	let url = UrlForOutput {
		scheme: url.scheme().to_string(),
		username: url.username().to_string(),
		password: url.password().map(|p| p.to_string()),
		host: url.host().map(|h| h.to_string()),
		port: url.port(),
		path: url.path().to_string(),
		query: url.query().map(|q| q.to_string()),
		fragment: url.fragment().map(|f| f.to_string()),
	};

	let formatted = match cli.json {
		true => serde_json::to_string(&url).unwrap(),
		false => format!("{:?}", url),
	};
	println!("{}", formatted);
}
