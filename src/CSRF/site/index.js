const express = require("express");
const localhost = require("https-localhost");
const session = require("express-session");
const routeLogin = require("./routes/login");
const routeMessages = require("./routes/messages");
const helmet = require('helmet');

const port = 443;
const domain = "localhost.charlesproxy.com";

const app = localhost(domain);
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: false
    }
  })
);
app.use(helmet.hsts({
  maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
  includeSubdomains: true,
  preload: true
}))

routeLogin(app);
routeMessages(app);

app.use("/static", express.static(__dirname + "/static"));

app.listen(port);

/***
 * Are application is running well on port 443 but we need to still
 * support the app on port 80 just redirect all traffic we don't want
 * the http version of the site to 404 but rather re-direct
 */
const redirApp = express();
redirApp.use((req, res) => res.redirect(`https://${domain}${req.url}`))
redirApp.listen(80);

console.log(
  `open https://${domain} to observe localhost network traffic via Charles`
);
