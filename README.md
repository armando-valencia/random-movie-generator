# Random Movie Generator

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

Quickly generate a movie on popular platforms like HBO Max, Hulu, and Netflix. Don’t like what you see? Generate another movie!

## Local Development

Prereqs:

-   Node.js + npm
-   Netlify CLI (required for local Functions)
    -   Homebrew: `brew install netlify-cli`
    -   npm: `npm install -g netlify-cli`

Setup:

```bash
npm install
cp .env.example .env.local
```

Populate `.env.local` with your RapidAPI credentials (required if you want data to be fetched):

-   `RAPIDAPI_KEY`
-   `RAPIDAPI_HOST`

Run the app (includes the Functions proxy):

```bash
netlify dev
```

Open the local site at `http://localhost:8888`.

Optional local test data:
-   Add `public/test_data.json` to use local mock results when `VITE_USE_TEST_DATA=true`.
-   The file is ignored by git, so it stays local only.
Example shape:

```json
{
    "result": [
        {
            "title": "Example Movie",
            "imdbId": "tt1234567",
            "tmdbId": "12345",
            "genres": [{ "id": "28", "name": "Action" }],
            "streamingInfo": {
                "us": {
                    "netflix": [{ "type": "subscription" }]
                }
            }
        }
    ]
}
```

## Todo:

-   [ ] Add more platforms
-   [ ] Bookmark movies

## Environment Variables

Serverless proxy requires these (set in `.env.local`):

-   `RAPIDAPI_KEY`
-   `RAPIDAPI_HOST`

## Netlify Functions (Local)

If you use the Netlify CLI, you can run functions locally with:

```bash
netlify dev
```

If Netlify CLI fails to start due to config permissions on macOS, fix ownership:

```bash
sudo chown -R $USER:$(id -gn $USER) ~/Library/Preferences/netlify
```

Quick local validation steps:

```bash
export RAPIDAPI_KEY=...
export RAPIDAPI_HOST=...
netlify dev
```

Then in another terminal:

```bash
curl "http://localhost:8888/api/get-movie?service=netflix"
```

## Monthly Cursor Refresh

The cursor dataset lives at `public/data/cursors.json` and is updated by GitHub Actions on the 1st of each month (UTC).

Manual run (local):

```bash
RAPIDAPI_KEY=... RAPIDAPI_HOST=... python scripts/refresh-data.py
```

Manual run (GitHub Actions):

-   Use the workflow dispatch input `max_pages` to cap pages per service.
