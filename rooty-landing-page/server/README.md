Email collection server

This small Express server accepts POST /api/subscribe with JSON { email } and appends it to `subscribers.csv` (CSV compatible with Excel).

Run locally:

```powershell
cd server
npm install
npm start
```

By default the server runs on port 4000. To make the Create React App dev server forward API requests to it during development, add this to the root `package.json` of the React app:

```json
"proxy": "http://localhost:4000"
```

Or run both servers and send requests directly to http://localhost:4000/api/subscribe from the frontend.

Security note: this is a minimal example; in production you'll want validation, rate-limiting, and persistence that isn't a plain CSV file.
