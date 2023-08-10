use assert_cmd::Command;

const KITCHEN_SINK: &str = "http://jane:doe@foo.bar:123/baz?hello=world#yay";

#[test]
fn kitchen_sink() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin("url_parser_cli")?;
    cmd
        .arg(KITCHEN_SINK);
    cmd.assert().success();

    Ok(())
}

#[test]
fn kitchen_sink_json() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin("url_parser_cli")?;
    cmd
        .arg("--json")
        .arg(KITCHEN_SINK);
    cmd.assert().success();

    Ok(())
}

#[test]
fn base_url() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin("url_parser_cli")?;
    cmd
        .arg("--json")
        .arg("--pretty")
        .arg("/one?two=three")
        .arg(KITCHEN_SINK);
    cmd.assert()
        .success()
        .stdout(r#"{
  "scheme": "http",
  "username": "jane",
  "password": "doe",
  "host": "foo.bar",
  "port": 123,
  "path": "/one",
  "query": "two=three",
  "fragment": null
}
"#);

    Ok(())
}

