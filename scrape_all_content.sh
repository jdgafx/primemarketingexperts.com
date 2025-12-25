#!/bin/bash

# Comprehensive Website Content Scraper for primemarketingexperts.com
# This script scrapes all pages and saves content to JSON files

BASE_URL="https://www.primemarketingexperts.com"
OUTPUT_DIR="./scraped_content"

mkdir -p "$OUTPUT_DIR"

echo "Starting comprehensive scrape of primemarketingexperts.com..."

# Service pages to scrape
SERVICES=(
  "Technology/web-development"
  "marketing/marketing-automation"
  "marketing/google-shopping-campaigns"
  "marketing/video-seo"
  "marketing/social-media-marketing"
  "marketing/text-message-marketing"
  "marketing/content-marketing"
  "marketing/branding"
  "marketing/email-marketing"
)

# Scrape each service page
for service in "${SERVICES[@]}"; do
  filename=$(echo "$service" | tr '/' '_')
  echo "Scraping: $BASE_URL/$service"
  curl -s "$BASE_URL/$service" > "$OUTPUT_DIR/${filename}.html"
  sleep 1
done

# Scrape main pages
PAGES=(
  ""
  "about"
  "contact"
  "blog"
)

for page in "${PAGES[@]}"; do
  if [ -z "$page" ]; then
    filename="homepage"
  else
    filename="$page"
  fi
  echo "Scraping: $BASE_URL/$page"
  curl -s "$BASE_URL/$page" > "$OUTPUT_DIR/${filename}.html"
  sleep 1
done

echo "Scraping complete! Content saved to $OUTPUT_DIR/"
ls -lh "$OUTPUT_DIR/"
