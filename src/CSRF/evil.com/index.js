const localHost = require("https-localhost");
const express = require("express");
const domain = "evil.com";
const app = localHost(domain);

const PORT = 666;
app.use(express.static(__dirname + "/static"));

app.listen(PORT);

console.log(
  `open https://${domain}:${PORT} to observe localhost network traffic via Charles`
);