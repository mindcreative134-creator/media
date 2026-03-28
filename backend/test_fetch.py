import asyncio
from core.scraper import MediaFetcher

async def test():
    fetcher = MediaFetcher()
    url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    print(f"Fetching metadata for {url}...")
    result = await fetcher.fetch_metadata(url)
    if "error" in result:
        print(f"Error: {result['error']}")
    else:
        print(f"Title: {result['title']}")
        print(f"Platform: {result['platform']}")
        print(f"Formats found: {len(result['formats'])}")

if __name__ == "__main__":
    asyncio.run(test())
