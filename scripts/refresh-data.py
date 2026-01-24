#!/usr/bin/env python3
import json
import os
import sys
import urllib.parse
import urllib.request
import urllib.error
from datetime import datetime

API_BASE_URL = "https://streaming-availability.p.rapidapi.com/shows/search/filters"
ALLOWED_SERVICES = ["netflix", "hulu", "hbo"]


def read_max_pages():
    raw = os.getenv("MAX_PAGES", "")
    try:
        value = int(raw)
        if value > 0:
            return value
    except ValueError:
        pass
    return 5


def extract_next_cursor(payload):
    if payload.get("hasMore"):
        return payload.get("nextCursor")
    for key in ("next_cursor", "nextCursor", "next"):
        value = payload.get(key)
        if value:
            return value
    pagination = payload.get("pagination") or {}
    for key in ("next_cursor", "nextCursor", "next"):
        value = pagination.get(key)
        if value:
            return value
    return None


def build_url(service, cursor=None, include_catalogs=True):
    params = {
        "country": "us",
        "output_language": "en",
        "show_type": "movie",
        "series_granularity": "show",
        "order_by": "original_title",
        "order_direction": "asc",
        "genres_relation": "and",
        "show_original_language": "en",
    }
    if include_catalogs:
        params["catalogs"] = service
    if cursor:
        params["cursor"] = cursor
    query = urllib.parse.urlencode(params, quote_via=urllib.parse.quote)
    return f"{API_BASE_URL}?{query}"


def fetch_json(url, headers):
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        data = response.read().decode("utf-8")
        return json.loads(data)


def refresh_service(service, headers, max_pages):
    cursors = [""]
    seen = set(cursors)
    cursor = None
    pages = 0

    while pages < max_pages:
        url = build_url(service, cursor, include_catalogs=True)
        try:
            payload = fetch_json(url, headers)
        except (urllib.error.HTTPError, urllib.error.URLError):
            url = build_url(service, cursor, include_catalogs=False)
            payload = fetch_json(url, headers)
        pages += 1

        cursor = extract_next_cursor(payload)
        if not cursor or cursor in seen:
            break
        cursors.append(cursor)
        seen.add(cursor)

    return cursors


def main():
    rapidapi_key = os.getenv("RAPIDAPI_KEY")
    rapidapi_host = os.getenv("RAPIDAPI_HOST")

    if not rapidapi_key or not rapidapi_host:
        print("Missing RAPIDAPI_KEY or RAPIDAPI_HOST.")
        return 1

    max_pages = read_max_pages()
    headers = {
        "X-RapidAPI-Key": rapidapi_key,
        "X-RapidAPI-Host": rapidapi_host,
    }

    services = {}
    for service in ALLOWED_SERVICES:
        services[service] = refresh_service(service, headers, max_pages)
        print(f"{service}: {len(services[service])} cursors")

    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_dir = os.path.join(root, "public", "data")
    os.makedirs(output_dir, exist_ok=True)

    payload = {
        "updatedAt": datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
        "services": services,
    }

    output_path = os.path.join(output_dir, "cursors.json")
    with open(output_path, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2)
        handle.write("\n")

    print(f"Wrote {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
