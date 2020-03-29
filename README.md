# Web Security 🌐🛡️

## Purpose

This Repo will show samples of certain attacks/vulnerabilities leveraged against a node/express server most
of these concepts are framework and language agnostic.

These will serve as my adapted notes from various resources online.

## Topics
1. **[Man-in-the-Middle (M👨ITM)](./docs/MITM.md)**

   1. Simulate a Session Hijacking attack
   1. Set up https
   1. Redirect http to https
   1. Set the Secure cookie flag
   1. Set up HSTS
1. **CSRF**

   1. Create an attack
   1. Set the sameSite cookie flag
   1. Add CSRF tokens to forms and fetch

1. **XSS**

   1. Create a cookie stealing attack via inline JS injection
   1. Set the httpOnly cookie flag
   1. Create a body stealing attack via inline JS injection
   1. Set up a "report only" CSP directive
   1. Block inline script execution and eval with CSP
   1. Create a body stealing attack via script injection
   1. Block script injection with CSP src nonces
   1. Create a credential stealing attack via iframe injection
   1. Explicitly allow only needed sources with CSP

## Credits
  [mikesherov's /web-security-essentials ](https://github.com/mikesherov/web-security-essentials/tree/master)