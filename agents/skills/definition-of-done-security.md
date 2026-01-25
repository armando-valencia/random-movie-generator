Security DoD

-   RapidAPI key is not present anywhere in client source or build output
-   No secrets committed; .env.example exists; .env\* ignored
-   Serverless proxy reads key from env vars only
-   Proxy avoids logging secrets
-   Basic caching in place to protect quota
-   README explains env setup + verification steps
