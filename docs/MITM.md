# Man In The Middle Attacks

## Overview
A man-in-the-middle attack (often abbreviated MITM) is when an attacker intercepts a request between a user and the site they're connecting to. If that request isn't encrypted, an attacker can read the information it contains. That is, if the session id is un-encrypted, a man-in-the-middle can steal it.

In the repo we have two versions of the server instance one using plain express on http `index.js`.
One leveraging https in the `secured-index.js`.


## Folders
[M👨ITM](../src/MITM)


## Setup For Simulating Attack
- Download & Install Charles Proxy
https://www.charlesproxy.com/download/

1. `vim ~/etc/hosts`
```bash
# add an entry with the following
127.0.0.1 localhost evil.com
```
2. `yarn installation` or `sudo npm i`
3. [M👨ITM](../src/MITM) or run `cd ../src/MITM`
4. run `sudo yarn start:both`
5. As the attacker, open Charles Proxy.
6. As the user, log into http://localhost.charlesproxy.com and then submit a message.
7. As the attacker, find the request in Charles, note that the session id is present as cleartext, modify it, and replay it.

**HINT**
Your curl req should include something like a data param edit that message and execute in terminal
```bash
## Sample Curl Req
curl -H 'Host: localhost.charlesproxy.com' -H 'DNT: 1' -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36' -H 'Content-type: application/x-www-form-urlencoded' -H 'Accept: */*' -H 'Origin: http://localhost.charlesproxy.com' -H 'Referer: http://localhost.charlesproxy.com/' -H 'Accept-Language: en-US,en;q=0.9' -H 'Cookie: _ga=GA1.2.522625857.1584068130; _gid=GA1.2.1231267101.1585434712; connect.sid=s%3ApZPCS7JbHhvDPRy-5v_NdVeGqI6P8f09.MEg50jPduLj8Kcuk2wKCKakS4Wj2SVpWy9hUg6Mu2HQ' --data-binary "message=HACKED" --compressed 'http://localhost.charlesproxy.com/'
```
8. As the user, refresh http://localhost.charlesproxy.com and notice there is now a message present that "you" didn't write.

## Setup For Mitigating Attack
- Set up https
> We leverage the https-localhost package which is a tool for serving static content on SSL using a locally-trusted certificates.
> Charles Proxy now can't intercept cookie and request as it's encrypted
```javascript
const localhost = require("https-localhost");
const app = localhost(domain);
app.use(express.urlencoded({ extended: true }));
```
- Redirect http to https

```javascript
/***
 * Are application is running well on port 443 but we need to still
 * support the app on port 80 just redirect all traffic we don't want
 * the http version of the site to 404 but rather re-direct
 */
const redirApp = express();
redirApp.use((req, res) => res.redirect(`https://${domain}${req.url}`))
redirApp.listen(80);
```

- Set the Secure cookie flag
```javascript
/**
 * We need to ensure cookie is only sent via https
 * */
  session({
    secret: "key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      // secure cookie prop +, cookies not sent over http
      secure: true,
      httpOnly: false
    }
  })
```
- Set up HSTS to auto redirect all reqs to https server.
This will work for every time except the first time
a user hits the site they will need to hit the server and
re-direct. Adding your site domain https://hstspreload.org/
will ensure even that first hit gets re-directed.

```javascript
const helmet = require('helmet')
app.use(helmet.hsts({
  maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
  includeSubdomains: true,
  preload: true
}))
```

## Production Level Solution

There are many options to have this run effectively in production.

One of the most common ways might be to include something like an NGNIX
as the web server handling things like load balancing, serving static files
and running with https.Request to your app server are fed in through a reverse proxy
and your node app runs purely as application server.

You can also do this all within the bounds of node
https://medium.com/@nileshsingh/everything-about-creating-an-https-server-using-node-js-2fc5c48a8d4e

My personal favorite is to use some managed (PaaS, FaaS) to not worry about this
and focus on your application code

https://aws.amazon.com/elasticbeanstalk/
https://aws.amazon.com/lambda/


