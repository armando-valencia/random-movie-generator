Quota & Caching

-   Serverless proxy sets cache headers (at least 24h) or uses platform caching
-   Frontend uses local dataset first where possible
-   Live API calls are minimized; no repeated calls on refresh/re-render
-   Error handling for rate limit responses is user-friendly
