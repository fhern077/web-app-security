# Man In The Middle Attacks

## Overview
A man-in-the-middle attack (often abbreviated MITM) is when an attacker intercepts a request between a user and the site they're connecting to. If that request isn't encrypted, an attacker can read the information it contains. That is, if the session id is unencrypted, a man-in-the-middle can steal it


## Setup For Simulating Attack
- Download Charle Proxy
https://www.charlesproxy.com/download/

1. `vim ~/etc/hosts`
```bash
# add an entry with the following
127.0.0.1 localhost evil.com
```

## Setup For Mitigating Attack
- Set up https
- Redirect http to https
- Set the Secure cookie flag
- Set up HSTS