# Modernization Plan

## Findings

-   Stack: Vite + React 18 + React Router; Chakra UI theme provider and components; Tailwind CSS configured but lightly used.
-   Netlify: no `netlify.toml`, no functions directory, no redirects detected; build scripts are `vite`/`vite build` in `package.json`.
-   RapidAPI usage: client-side fetch in `src/hooks/useFetchMovie.js` using `X-RapidAPI-Key` and `X-RapidAPI-Host` from `import.meta.env.VITE_API_KEY` / `VITE_API_HOST` (values set in `.env`/`.env.local`).
-   Cursor data: hardcoded monthly cursor lists in `src/util/cursors.js`, randomly selected in `useFetchMovie` to page results; no generation job or storage outside the repo.
-   Project layout: `src/components`, `src/layouts`, `src/pages`, `src/hooks`, `src/util`, `src/styles`, `src/assets`; Chakra theme overrides in `src/styles/theme.js` and `src/styles/components/Button.ts`.

## Decisions

-   Use Netlify Functions for all RapidAPI calls; move RapidAPI credentials to Netlify environment variables (no client exposure).
-   Use GitHub Actions on a monthly cron to refresh cursor lists into a repo-owned dataset at `public/data/cursors.json`.
-   Keep cursor refresh efficient to respect RapidAPI limits (1000/month, 1000/hour).
-   Redesign UI with Tailwind as the primary styling system; migrate away from Chakra to avoid duplicate styling stacks and simplify theming.
-   Implement light/dark mode with CSS variables + Tailwind `dark` class and persist user choice in `localStorage` (respect `prefers-color-scheme` on first load).
-   Preserve the SPA entrypoint and URLs; no breaking access changes for end users.
-   Minimize dependencies and keep the solution understandable.
-   Add caching to the serverless proxy (at least 24h via cache headers) and minimize live API calls (use local dataset first where feasible).

## Milestones / PR Breakdown

1. Netlify baseline setup

    - Add `netlify.toml` (build command, publish dir, functions dir, redirects for SPA routing).
    - Add `netlify/functions` directory and a placeholder function with local dev instructions.
    - Document required env vars in `README.md` (names only, no values).

2. Move RapidAPI calls behind a function

    - Create `get-movie` function to proxy RapidAPI calls and validate query params (service, cursor, genre).
    - Update `useFetchMovie` to call the Netlify function instead of RapidAPI directly.
    - Add basic error handling and response normalization for the UI.

3. Scheduled monthly cursor refresh

    - Add `scripts/refresh-data.py` to fetch/paginate and update `public/data/cursors.json`.
    - Schedule via GitHub Actions to run on the 1st of the month (UTC ok) and add a manual run option.
    - Ensure the job avoids logging secrets and respects the API quota.
    - Update `get-movie` to read cursor lists from the repo dataset with a fallback to static defaults.
    - Add minimal observability (logs, last-refresh timestamp).

4. Tailwind UI redesign + theming

    - Replace Chakra components/providers with Tailwind equivalents.
    - Define design tokens in `tailwind.config.cjs` and CSS variables for light/dark.
    - Update layouts/pages/components for the new visual design and add a theme toggle.
    - Add loading, empty, and error states; ensure accessible focus/keyboard behavior.

5. Cleanup and verification
    - Remove Chakra-related dependencies and unused theme files.
    - Validate Netlify build, function invocation, and scheduled job locally with Netlify CLI.
    - Add/update docs for env vars and local dev.
    - Add `.env.example`, ensure `.env*` remains ignored, and add a preflight env-var check in the function.
    - Add lightweight tests for any data-transform utilities (Vitest) if introduced.
    - Add documentation for local testing and a checklist to verify keys are not exposed.

## Risks / Unknowns

-   RapidAPI pagination/cursor behavior: docs do not prescribe a best way to generate a full cursor list; may need a pragmatic, limited-scan approach.
-   Rate limits are strict (1000/month, 1000/hour), so cursor refresh volume must be controlled.
-   Netlify plan appears to cover functions, storage, and scheduled jobs, but implementation details and quotas for Blobs/KV should be confirmed.
-   Security: ensure no RapidAPI keys are exposed in the client bundle after refactor.
-   Data freshness: monthly refresh may be insufficient or too frequent depending on API limits and content churn.
-   UI migration effort: removing Chakra might require refactoring component logic and accessibility patterns.

## Agent workflow requirement

This repo contains agent prompts and skills in `/agents`. Before starting a task, read `agents/ROUTING.md` and follow exactly one primary agent prompt. Before marking a task complete, validate against relevant skills in `agents/skills` and note what was checked.
