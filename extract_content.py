#!/usr/bin/env python3
"""
Extract structured content from scraped HTML files
"""
import json
import os
import re
from pathlib import Path

def extract_text_from_html(html_content):
    """Simple HTML text extraction"""
    # Remove script and style elements
    html_content = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.DOTALL | re.IGNORECASE)
    html_content = re.sub(r'<style[^>]*>.*?</style>', '', html_content, flags=re.DOTALL | re.IGNORECASE)
    
    # Extract text from common content tags
    content = {}
    
    # Extract title
    title_match = re.search(r'<title[^>]*>(.*?)</title>', html_content, re.IGNORECASE | re.DOTALL)
    if title_match:
        content['title'] = title_match.group(1).strip()
    
    # Extract meta description
    meta_match = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"\']*)["\']', html_content, re.IGNORECASE)
    if meta_match:
        content['description'] = meta_match.group(1).strip()
    
    # Extract h1 headings
    h1_matches = re.findall(r'<h1[^>]*>(.*?)</h1>', html_content, re.IGNORECASE | re.DOTALL)
    if h1_matches:
        content['h1'] = [re.sub(r'<[^>]+>', '', h.strip()) for h in h1_matches]
    
    # Extract h2 headings
    h2_matches = re.findall(r'<h2[^>]*>(.*?)</h2>', html_content, re.IGNORECASE | re.DOTALL)
    if h2_matches:
        content['h2'] = [re.sub(r'<[^>]+>', '', h.strip()) for h in h2_matches]
    
    # Extract paragraphs
    p_matches = re.findall(r'<p[^>]*>(.*?)</p>', html_content, re.IGNORECASE | re.DOTALL)
    if p_matches:
        paragraphs = [re.sub(r'<[^>]+>', '', p.strip()) for p in p_matches]
        # Filter out empty paragraphs
        content['paragraphs'] = [p for p in paragraphs if p and len(p) > 10][:10]  # First 10 meaningful paragraphs
    
    return content

def main():
    scraped_dir = Path('./scraped_full_sitemap')
    output_file = Path('./scraped_content/extracted_content_full.json')
    
    all_content = {}
    
    for html_file in scraped_dir.glob('*.html'):
        print(f"Processing: {html_file.name}")
        with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
            html_content = f.read()
        
        page_name = html_file.stem
        all_content[page_name] = extract_text_from_html(html_content)
    
    # Save to JSON
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_content, f, indent=2, ensure_ascii=False)
    
    print(f"\nExtracted content saved to: {output_file}")
    print(f"Total pages processed: {len(all_content)}")

if __name__ == '__main__':
    main()
