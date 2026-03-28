import yt_dlp
import asyncio
from typing import Dict, Any, List
from playwright.async_api import async_playwright

class MediaFetcher:
    def __init__(self):
        self.ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'format': 'best',
            'skip_download': True,
        }

    async def fetch_metadata(self, url: str) -> Dict[str, Any]:
        """
        Extracts metadata using yt-dlp, with a Playwright fallback for dynamic sites.
        """
        try:
            # Try yt-dlp first
            loop = asyncio.get_event_loop()
            info = await loop.run_in_executor(None, self._extract_info, url)
            return self._format_response(info)
        except Exception as e:
            print(f"yt-dlp failed, falling back to Playwright: {e}")
            return await self._fetch_with_playwright(url)

    def _extract_info(self, url: str):
        with yt_dlp.YoutubeDL(self.ydl_opts) as ydl:
            return ydl.extract_info(url, download=False)

    async def _fetch_with_playwright(self, url: str) -> Dict[str, Any]:
        """
        Fallback scraper using Playwright to handle Javascript-heavy sites.
        """
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            try:
                await page.goto(url, wait_until="networkidle")
                title = await page.title()
                # Basic metadata extraction from page
                # This can be expanded based on specific social media patterns
                return {
                    "title": title,
                    "webpage_url": url,
                    "platform": "Dynamic/Playwright",
                    "formats": [],
                    "note": "Playwright fallback active. Detailed formats might be limited."
                }
            except Exception as e:
                return {"error": f"Scraping failed: {str(e)}"}
            finally:
                await browser.close()

    def _format_response(self, info: Dict[str, Any]) -> Dict[str, Any]:
        if not info:
            return {"error": "No information found"}
        
        formats = []
        for f in info.get('formats', []):
            if f.get('url'):
                formats.append({
                    'format_id': f.get('format_id'),
                    'ext': f.get('ext'),
                    'resolution': f.get('resolution') or f.get('format_note'),
                    'filesize': f.get('filesize'),
                    'url': f.get('url'),
                    'vcodec': f.get('vcodec'),
                    'acodec': f.get('acodec'),
                })

        return {
            'id': info.get('id'),
            'title': info.get('title'),
            'thumbnail': info.get('thumbnail'),
            'description': info.get('description'),
            'uploader': info.get('uploader'),
            'duration': info.get('duration'),
            'view_count': info.get('view_count'),
            'like_count': info.get('like_count'),
            'webpage_url': info.get('webpage_url'),
            'formats': formats,
            'platform': info.get('extractor_key', 'Unknown')
        }
