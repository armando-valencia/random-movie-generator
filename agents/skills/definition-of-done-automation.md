Automation DoD

-   Scheduled job runs on the 1st (cron) and can be manually triggered
-   Job updates a repo-owned dataset (e.g., public/data/\*.json)
-   Job respects quota (minimal calls, no loops that can explode)
-   Secrets not printed in logs
-   Script runnable locally with documented steps
