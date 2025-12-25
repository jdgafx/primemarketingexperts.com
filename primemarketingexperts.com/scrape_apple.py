import os
import requests
from bs4 import BeautifulSoup
import time
import random

# Create directories
base_dir = "apple_clone_data"
html_dir = os.path.join(base_dir, "html")
css_dir = os.path.join(base_dir, "css")

os.makedirs(html_dir, exist_ok=True)
os.makedirs(css_dir, exist_ok=True)

# List of 30 URLs to scrape (based on sitemap and general Apple structure)
urls = [
    "https://www.apple.com/",
    "https://www.apple.com/mac/",
    "https://www.apple.com/macbook-air/",
    "https://www.apple.com/macbook-pro/",
    "https://www.apple.com/imac/",
    "https://www.apple.com/mac-mini/",
    "https://www.apple.com/mac-studio/",
    "https://www.apple.com/mac-pro/",
    "https://www.apple.com/ipad/",
    "https://www.apple.com/ipad-pro/",
    "https://www.apple.com/ipad-air/",
    "https://www.apple.com/ipad-10.9/",
    "https://www.apple.com/ipad-mini/",
    "https://www.apple.com/iphone/",
    "https://www.apple.com/iphone-15-pro/",
    "https://www.apple.com/iphone-15/",
    "https://www.apple.com/iphone-se/",
    "https://www.apple.com/watch/",
    "https://www.apple.com/apple-watch-series-9/",
    "https://www.apple.com/apple-watch-ultra-2/",
    "https://www.apple.com/apple-watch-se/",
    "https://www.apple.com/apple-vision-pro/",
    "https://www.apple.com/airpods/",
    "https://www.apple.com/tv-home/",
    "https://www.apple.com/entertainment/",
    "https://www.apple.com/icloud/",
    "https://www.apple.com/apple-one/",
    "https://www.apple.com/apple-card/",
    "https://www.apple.com/shop/accessories/all",
    "https://www.apple.com/business/",
    "https://www.apple.com/education/",
    "https://www.apple.com/healthcare/",
    "https://www.apple.com/environment/",
    "https://www.apple.com/privacy/",
    "https://www.apple.com/accessibility/"
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

def clean_filename(url):
    name = url.replace("https://www.apple.com/", "").replace("/", "_").strip("_")
    if not name:
        return "home"
    return name

downloaded_css = set()

print(f"Starting scrape of {len(urls)} pages...")

for url in urls:
    try:
        print(f"Fetching {url}...")
        response = requests.get(url, headers=headers, timeout=10)
        
        if response.status_code == 200:
            filename = clean_filename(url)
            filepath = os.path.join(html_dir, f"{filename}.html")
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(response.text)
                
            # Parse for CSS
            soup = BeautifulSoup(response.text, 'html.parser')
            for link in soup.find_all('link', rel='stylesheet'):
                href = link.get('href')
                if href:
                    if href.startswith("//"):
                        css_url = "https:" + href
                    elif href.startswith("/"):
                        css_url = "https://www.apple.com" + href
                    elif href.startswith("http"):
                        css_url = href
                    else:
                        continue
                        
                    if css_url not in downloaded_css:
                        try:
                            css_name = css_url.split("/")[-1].split("?")[0]
                            if not css_name.endswith(".css"):
                                css_name += ".css"
                            
                            print(f"  Downloading CSS: {css_name}")
                            css_res = requests.get(css_url, headers=headers, timeout=5)
                            if css_res.status_code == 200:
                                css_path = os.path.join(css_dir, css_name)
                                with open(css_path, "w", encoding="utf-8") as f:
                                    f.write(css_res.text)
                                downloaded_css.add(css_url)
                        except Exception as e:
                            print(f"  Failed to download CSS {css_url}: {e}")
                            
        else:
            print(f"Failed to fetch {url}: Status {response.status_code}")
            
        time.sleep(random.uniform(0.5, 1.5)) # Polite delay
        
    except Exception as e:
        print(f"Error scraping {url}: {e}")

print("Scrape complete.")
