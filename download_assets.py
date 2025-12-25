import os
import requests
from urllib.parse import urljoin

base_url = "https://www.primemarketingexperts.com"
assets = [
    ("/_next/static/media/section05.d7a8244a.jpg", "public/images/hero-slide-1.jpg"),
    ("/_next/static/media/section02.4bb50803.jpg", "public/images/hero-slide-2.jpg"),
    ("/_next/static/media/section6.00b8683f.jpg", "public/images/hero-slide-3.jpg"),
    ("/images/eventmanagement/image.png", "public/images/explore-philosophy.png"),
    ("/images/carousel/image02.png", "public/images/explore-values.png"),
    ("/images/section02.jpg", "public/images/explore-team.jpg"),
    ("/images/section_04.webp", "public/images/explore-careers.webp"),
    ("/_next/static/media/logo.0e55bc8b.png", "public/images/logo-footer.png")
]

os.makedirs("public/images", exist_ok=True)

for src_path, dest_path in assets:
    url = urljoin(base_url, src_path)
    print(f"Downloading {url} to {dest_path}...")
    try:
        r = requests.get(url, timeout=10)
        if r.status_code == 200:
            with open(dest_path, "wb") as f:
                f.write(r.content)
            print("Success.")
        else:
            print(f"Failed: Status {r.status_code}")
    except Exception as e:
        print(f"Error: {e}")
