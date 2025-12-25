import os
from bs4 import BeautifulSoup
import json
import re

directory = '../scraped_full_sitemap'
files = [f for f in os.listdir(directory) if f.startswith('case-studies_') and f.endswith('.html')]

case_studies = []

def clean_text(text):
    return re.sub(r'\s+', ' ', text).strip()

for filename in files:
    filepath = os.path.join(directory, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
        
        # Initial Title extraction
        h1 = soup.find('h1')
        title = clean_text(h1.text) if h1 else 'Untitled'
        
        # Initial Content extraction
        content_div = soup.find('div', class_='case-study-content')
        if not content_div:
             content_div = soup.find('div', class_='prose')

        content = []
        if content_div:
            for p in content_div.find_all(['p', 'h2', 'h3', 'h4', 'ul', 'ol']):
                item_text = clean_text(p.get_text())
                if item_text:
                    content.append(item_text)
                    
        # Excerpt (first paragraph)
        excerpt = content[0] if content else ''

        # Slug - derive from filename (remove hash) 
        base_name = filename.replace('case-studies_', '').replace('.html', '')
        parts = base_name.split('-')
        if len(parts[-1]) > 8: 
             slug = '-'.join(parts[:-1])
        else:
             slug = base_name

        # Check if 404
        if "404" in title or "Page not found" in title or "Services" == title: # "Services" was the title for the broken ones we saw
            is_404 = True
            # Derive title from filename
            if len(parts[-1]) > 8:
                 raw_slug = '-'.join(parts[:-1])
            else:
                 raw_slug = base_name
            
            slug = raw_slug
            title = raw_slug.replace('-', ' ').title()
            excerpt = "Case study content currently unavailable."
            content = ["This case study is currently unavailable."]

    
        case_studies.append({
            'title': title,
            'slug': slug,
            'excerpt': excerpt,
            'content': content,
            'image': f"/images/{filename.replace('.html', '.png')}",
        })

print(json.dumps(case_studies, indent=2))
