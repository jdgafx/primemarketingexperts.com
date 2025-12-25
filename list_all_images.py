import re
import glob

def extract_images():
    # Matches src="..." and src='...' with common image extensions
    image_pattern = re.compile(r'src=["\']([^"\']+\.(?:jpg|jpeg|png|webp|svg))["\']')
    unique_urls = set()
    files = glob.glob("scraped_full_sitemap/*.html")
    print(f"Scanning {len(files)} files...")

    for file_path in files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            # Also look for CSS url(...)
            css_matches = re.findall(r'url\(["\']?([^"\')]+\.(?:jpg|jpeg|png|webp|svg))["\']?\)', content)
            unique_urls.update(css_matches)
            
            matches = image_pattern.findall(content)
            unique_urls.update(matches)

    print(f"Found {len(unique_urls)} unique images:")
    for url in sorted(unique_urls):
        print(url)

if __name__ == "__main__":
    extract_images()
