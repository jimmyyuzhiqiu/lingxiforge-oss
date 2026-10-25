# Security notes

## Demonstration authentication is not production authentication

The Vue login/register flow is a browser-only demonstration. User records and derived password hashes are stored in the visitor's own browser. The PBKDF2 change prevents plaintext passwords from being written to local storage, but client-side code and route guards can be modified or bypassed. Do not use real passwords, sensitive data, or real access-control decisions with this flow.

The previous hard-coded demo administrator and legacy local-storage credential records are removed from this release branch. The new demo storage keys are versioned so old plaintext records are cleared when the new demo auth module runs.

## API prototype limitations

The FastAPI service is a prototype, not a production-ready multi-user security boundary. Before exposing it to the public internet, review and implement at least:

- Server-side authentication and authorization on every protected endpoint; session tokens currently do not have full expiry/revocation enforcement middleware.
- Rate limiting and abuse controls for login, captcha, model-generation, and upload endpoints.
- Strict upload validation (content signatures, size quotas, storage lifecycle, and malware scanning as appropriate).
- Deployment-specific CORS origin allowlists and HTTPS.
- Data retention, privacy, backup, and deletion policies for submitted leads and uploaded files.

The API now requires a unique LINGXIFORGE_AUTH_SALT, uses PBKDF2-HMAC-SHA256 with a per-password random salt for new passwords, and requires a valid captcha for API login. Legacy SHA-256 records can be upgraded after a successful login if the original salt remains configured. These measures do not replace the controls listed above.

## Secrets and disclosure

- Never commit .env, API credentials, model-service credentials, private keys, or production data.
- If a secret was committed previously, rotate it; adding it to .gitignore does not remove it from Git history.
- Please do not post undisclosed vulnerabilities in public issues. Contact the maintainer through the GitHub profile: https://github.com/jimmyyuzhiqiu
