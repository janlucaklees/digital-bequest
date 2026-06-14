# Digital Bequest

<p align="center">
<img src="src/assets/digital-bequest.svg" alt="Digital Bequest Logo" width="200">
</p>

A privacy-first web app for leaving encrypted credentials to loved ones after death.

## About

Digital Bequest helps you pass on important credentials - email passwords, bank logins, account
details - to a trusted person without risking exposure while you're alive.

You encrypt your credentials with a password, print the result as a PDF, and leave it somewhere safe
(like an envelope with your will). The printed page contains a human-readable message and a QR code.
When the time comes, the recipient scans the QR code, enters the password, and your credentials are
revealed - no account, no app install, no cloud service required.

The security model is simple: **the printed paper alone is useless** without the password. Paper and
password together grant full access.

To get started, visit **[janlucaklees.github.io/digital-bequest](https://janlucaklees.github.io/digital-bequest/)**.

## How it Works

### 1. Encrypt your credentials

Enter a message (e.g. _"In the event of my death, scan this QR code"_), the credentials you want to
pass on, and a password to encrypt them with.

### 2. Print the PDF

Download and print the generated A4 page. It contains your plain-text message and a QR code
embedding the encrypted credentials.

### 3. Leave it somewhere safe

Store the printed page with your important documents. Share the password separately - verbally, in
your will, or wherever makes sense for your situation.

When the recipient scans the QR code, they land on the same web app, enter the password, and your
credentials are shown.

## Self-Hosting

This app is hosted on GitHub Pages and I don't plan to take it down. But the QR codes you print
point to _my_ deployment - if it ever goes away, so does the decode link.

If you want to be sure your loved ones can always access their credentials, fork this repo and
deploy your own copy. GitHub Pages makes this free and straightforward:

1. Fork the repository on GitHub.
2. In your fork's settings, enable GitHub Pages from the `master` branch `/docs` folder.
3. Your app is now live at `https://<your-username>.github.io/<your-repo>/`.
4. Update the link at the top of this README to point to your own deployment.

Point your printed QR codes at your own deployment and you're no longer dependent on anyone.

---

## Donations

The most valuable contribution to this project is your time and ideas. Open source becomes meaningful through people participating in it.

If you would like to support the project financially, you can do so through the following options:

- [PayPal](https://www.paypal.com/donate/?hosted_button_id=8DBMRF3D9GUFY)

Thank you for using, sharing, contributing and/or supporting the project in whatever way makes sense to you.

---

**Digital Bequest** is a fully client-side web app for encrypting personal credentials into a printable QR code, to be left for loved ones after death. All cryptography runs in the browser - nothing is ever sent to a server. The printed page plus a separately shared password is the only artifact needed to recover the credentials.
