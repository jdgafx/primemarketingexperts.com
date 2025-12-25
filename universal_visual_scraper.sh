#!/bin/bash

# ==============================================================================
# UNIVERSAL VISUAL SCRAPER TOOL
# ==============================================================================
# A professional-grade visual scraping utility powered by Puppeteer & Gum.
# Creates high-fidelity, pixel-perfect captures of websites.
#
# Features:
# - Interactive CLI UI
# - Sitemap Scanning & Multi-selection
# - Customizable Resolution & Quality
# - Full Page Capture
# - Cross-platform Linux Support
# ==============================================================================

set -e

# --- Colors & Styles ---
PRIMARY_COLOR="212" # Pink
SECONDARY_COLOR="99" # Purple
ERROR_COLOR="196"   # Red

USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# --- Helper Functions ---

log_info() {
    gum style --foreground "$PRIMARY_COLOR" "$1"
}

log_error() {
    gum style --foreground "$ERROR_COLOR" "$1"
}

check_dependencies() {
    clear
    gum style --border double --margin "1" --padding "1 2" --border-foreground "$PRIMARY_COLOR" \
        "Universal Visual Scraper Setup" \
        "Checking system requirements..."

    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed."
        echo "Please install Node.js (v14+) to continue."
        exit 1
    fi

    # Check/Install Gum
    if ! command -v gum &> /dev/null; then
        echo "Gum CLI tool not found. Installing..."
        
        if command -v apt-get &> /dev/null; then
            sudo mkdir -p /etc/apt/keyrings
            curl -fsSL https://repo.charm.sh/apt/gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/charm.gpg
            echo "deb [signed-by=/etc/apt/keyrings/charm.gpg] https://repo.charm.sh/apt/ * *" | sudo tee /etc/apt/sources.list.d/charm.list
            sudo apt-get update && sudo apt-get install -y gum
        elif command -v dnf &> /dev/null; then
            echo '[charm]
name=Charm
baseurl=https://repo.charm.sh/yum/
enabled=1
gpgcheck=1
gpgkey=https://repo.charm.sh/yum/gpg.key' | sudo tee /etc/yum.repos.d/charm.repo
            sudo dnf install -y gum
        elif command -v pacman &> /dev/null; then
            sudo pacman -S gum --noconfirm
        else
            # Fallback to Go install or manual
            if command -v go &> /dev/null; then
                 go install github.com/charmbracelet/gum@latest
            else
                 log_error "Could not automatically install Gum. Please install it manually: https://github.com/charmbracelet/gum"
                 exit 1
            fi
        fi
    fi

    # Initialize Project if needed
    if [ ! -f "package.json" ]; then
        log_info "Initializing workspace..."
        npm init -y > /dev/null 2>&1
    fi

    # Check Puppeteer & Stealth Dependencies
    if [ ! -d "node_modules/puppeteer" ] || [ ! -d "node_modules/puppeteer-extra" ]; then
        log_info "Installing Puppeteer & Stealth Modules (High-Fidelity Browser Engine)..."
        echo "This may take a minute to download Chromium and stealth plugins."
        npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
    fi
}

normalize_url() {
    local input="$1"
    
    # If already has protocol, return as is
    if [[ "$input" =~ ^https?:// ]]; then
        echo "$input"
        return
    fi
    
    # Try HTTPS then HTTP
    # We use a subshell in gum spin to ensure UI feedback while checking
    gum spin --spinner dot --title "Resolving protocol for $input..." -- bash -c "
        if curl -A \"$USER_AGENT\" -s --head --request GET \"https://$input\" --connect-timeout 5 >/dev/null; then
            echo \"https://$input\"
        elif curl -A \"$USER_AGENT\" -s --head --request GET \"http://$input\" --connect-timeout 5 >/dev/null; then
             echo \"http://$input\"
        else
             # Default fallback
             echo \"https://$input\"
        fi
    "
}

auto_check_sitemap() {
    local target="$1"
    # Basic guess at sitemap location
    local sitemap_url="${target%/}/sitemap.xml"
    
    # Check header silently (follow redirects)
    if curl -A "$USER_AGENT" -s --head -L --fail "$sitemap_url" --connect-timeout 3 >/dev/null; then
        echo "$sitemap_url"
    fi
}

extract_domain() {
    local url=$1
    echo "$url" | awk -F/ '{print $3}'
}

fetch_sitemap() {
    local target=$1
    local sitemap_url="$target/sitemap.xml"
    
    sitemap_url=$(gum input --value "$sitemap_url" --header "Confirm Sitemap URL" --placeholder "https://example.com/sitemap.xml")

    # Use curl for robust fetching (handles redirects) and grep for parsing
    # We strip whitespace and <loc> tags
    URLS=$(gum spin --spinner dot --title "Scanning Sitemap (Fast)..." -- bash -c "curl -A \"$USER_AGENT\" -sL \"$sitemap_url\" | grep -oP '<loc>\K[^<]*'" 2>/dev/null)
    
    if [ -z "$URLS" ]; then
        # Fallback to Stealth Node Fetcher
        generate_sitemap_fetcher
        gum spin --spinner globe --title "Basic scan failed. Engaging Stealth Mode..." -- bash -c "node _sitemap_fetcher.js \"$sitemap_url\" | grep -oP '<loc>\K[^<]*'" 2>/dev/null
        rm -f _sitemap_fetcher.js
    else
        echo "$URLS"
    fi
}

generate_scraper_script() {
    cat > _scrape_worker.js <<'EOF'
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const fs = require('fs');
const path = require('path');

// Read config from environment variables
const CONFIG = {
    width: parseInt(process.env.VIEWPORT_WIDTH) || 1920,
    height: parseInt(process.env.VIEWPORT_HEIGHT) || 1080,
    fullPage: process.env.FULL_PAGE === 'true',
    scaleFactor: parseFloat(process.env.SCALE_FACTOR) || 1,
    outputDir: process.env.OUTPUT_DIR || 'scraped_images',
    baseDelay: parseInt(process.env.DELAY_MS) || 2000,
    headless: process.env.HEADLESS !== 'false',
    urlFile: process.env.URL_FILE || 'target_urls.txt',
    urlFile: process.env.URL_FILE || 'target_urls.txt',
    // Pool of modern User Agents
    startDelay: 4000
};

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
];


const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
    // Load URLs from file
    if (!fs.existsSync(CONFIG.urlFile)) {
        console.error('❌ URL list file not found!');
        process.exit(1);
    }
    const rawUrls = fs.readFileSync(CONFIG.urlFile, 'utf-8');
    const urls = rawUrls.split('\n').map(u => u.trim()).filter(Boolean);
    
    // Ensure output dir
    if (!fs.existsSync(CONFIG.outputDir)) {
        fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    console.log(`\n🚀 Queueing ${urls.length} pages (Stealth Mode: Fresh Instance per URL)...`);

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < urls.length; i++) {
        const targetUrl = urls[i];
        const progress = `[${i + 1}/${urls.length}]`;
        
        // Sanitize filename
        let filename;
        try {
            const urlObj = new URL(targetUrl);
            filename = urlObj.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '_');
            if (filename === '' || filename === '_') filename = 'homepage';
            filename += '.png';
        } catch (e) {
            filename = `scraped_${Date.now()}.png`;
        }
        
        const outputPath = path.join(CONFIG.outputDir, filename);

        process.stdout.write(`${progress} Scraping: ${targetUrl.substring(0, 50).padEnd(50)} `);
        
        let browser = null;
        try {
            // --- NUCLEAR ISOLATION START ---
            browser = await puppeteer.launch({
                headless: CONFIG.headless ? 'new' : false,
                args: [
                    '--no-sandbox', 
                    '--disable-setuid-sandbox',
                    '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--window-size=' + (CONFIG.width + 50) + ',' + (CONFIG.height + 150)
                ]
            });
            
            const page = await browser.newPage();
            
            await page.setViewport({
                width: CONFIG.width,
                height: CONFIG.height,
                deviceScaleFactor: CONFIG.scaleFactor
            });
            
            const randomUA = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
            await page.setUserAgent(randomUA);
            
            await page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9',
                'Upgrade-Insecure-Requests': '1',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            });
            
            await page.emulateMediaType('screen');
            // --- NUCLEAR ISOLATION END ---

            // Randomize delay
            const jitter = Math.floor(Math.random() * (CONFIG.baseDelay * 0.3)) - (CONFIG.baseDelay * 0.15);
            const pauseTime = Math.max(1000, CONFIG.baseDelay + jitter);
            
            await page.goto(targetUrl, { 
                waitUntil: 'domcontentloaded', 
                timeout: 60000 
            });

            // Simulate human behavior
            try {
                await page.mouse.move(100, 100);
                await page.mouse.move(200, 200, { steps: 10 });
            } catch (e) {}

            await sleep(pauseTime);

            await page.evaluate(() => {
                document.body.style.overflow = 'hidden';
            });
            
            await page.screenshot({
                path: outputPath,
                fullPage: CONFIG.fullPage,
                omitBackground: false
            });

            console.log('✅');
            successCount++;
            
            // Long cool-down to evade rate limiters (4s to 8s)
            if (i < urls.length - 1) {
                 const cooldown = CONFIG.startDelay + Math.floor(Math.random() * 4000);
                 await sleep(cooldown);
            }

        } catch (err) {
            console.log('❌');
            console.error(`       Error: ${err.message.split('\n')[0]}`);
            failCount++;
        } finally {
            if (browser) await browser.close();
        }
    }

    // Done loop - summary is next in file
    // Removing the outer browser close since we close inside loop

    
    // Summary JSON
    const summary = {
        total: urls.length,
        success: successCount,
        failed: failCount,
        outputDir: CONFIG.outputDir
    };
    fs.writeFileSync('scrape_summary.json', JSON.stringify(summary, null, 2));
})();
EOF
}

generate_sitemap_fetcher() {
    cat > _sitemap_fetcher.js <<'EOF'
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
    const targetUrl = process.argv[2];
    if (!targetUrl) process.exit(1);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
    
    try {
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        // wait a bit for any js rendering
        await new Promise(r => setTimeout(r, 2000));
        
        const content = await page.content();
        console.log(content);
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
EOF
}


# --- Main App Flow ---

check_dependencies

# Welcome
clear
gum style \
	--foreground 212 --border-foreground 212 --border double \
	--align center --width 50 --margin "1 2" --padding "2 4" \
	"UNIVERSAL VISUAL SCRAPER" "High-Fidelity Screenshot Utility"

# 1. Target URL (Optional for Manual Paste)
TARGET_URL=""

# 2. Page Selection Strategy
SEARCH_MODE=$(gum choose "Scan Sitemap.xml" "Paste URL List (Unlimited)" "Single URL" --header "Scraping Mode")

# Temp file for URLs
URL_FILE="target_urls.txt"
rm -f "$URL_FILE"

case "$SEARCH_MODE" in
    "Single URL")
        RAW_INPUT=$(gum input --placeholder "example.com" --header "Target Website URL" --width 50)
        
        if [ -z "$RAW_INPUT" ]; then
            log_error "No URL provided."
            exit 1
        fi

        TARGET_URL=$(normalize_url "$RAW_INPUT")
        log_info "Resolved to: $TARGET_URL"
        echo "$TARGET_URL" > "$URL_FILE"
        
        # Check for sitemap
        DETECTED_SITEMAP=$(auto_check_sitemap "$TARGET_URL")
        if [ -n "$DETECTED_SITEMAP" ]; then
            gum style --foreground 212 "Found sitemap: $DETECTED_SITEMAP"
            if gum confirm "Found sitemap. View and select additional pages to scrape?"; then
                # Use the robust fetch_sitemap logic here but we need to duplicate the fallback call slightly 
                # or just reuse the function if it prints to stdout.
                # Since fetch_sitemap uses gum input, we can't reuse it directly.
                # Let's just call the logic inline or create a helper.
                
                SITEMAP_URLS=$(gum spin --spinner dot --title "Scanning (Fast)..." -- bash -c "curl -A \"$USER_AGENT\" -sL \"$DETECTED_SITEMAP\" | grep -oP '<loc>\K[^<]*'")
                
                if [ -z "$SITEMAP_URLS" ]; then
                     generate_sitemap_fetcher
                     SITEMAP_URLS=$(gum spin --spinner globe --title "Basic scan failed. Engaging Stealth Mode..." -- bash -c "node _sitemap_fetcher.js \"$DETECTED_SITEMAP\" | grep -oP '<loc>\K[^<]*'")
                     rm -f _sitemap_fetcher.js
                fi
                
                if [ -n "$SITEMAP_URLS" ]; then
                    # Let user choose from the found URLs
                    SELECTED_URLS=$(echo "$SITEMAP_URLS" | gum choose --no-limit --height 20 --header "Select additional pages (Space to select)")
                    
                    if [ -n "$SELECTED_URLS" ]; then
                         echo "$SELECTED_URLS" >> "$URL_FILE"
                         sort -u "$URL_FILE" -o "$URL_FILE"
                         log_info "Added selected pages."
                    fi
                else
                    log_error "Sitemap check returned no URLs (site might be blocking requests)."
                    sleep 2
                fi
            fi
        fi
        ;;
    "Scan Sitemap.xml")
        TARGET_URL=$(gum input --placeholder "https://example.com" --header "Target Website URL" --width 50)
        RAW_URLS=$(fetch_sitemap "$TARGET_URL")
        
        if [ -z "$RAW_URLS" ]; then
            log_error "No URLs found in sitemap or failed to fetch."
            echo "Attempted: $TARGET_URL/sitemap.xml"
            if gum confirm "Try single URL instead?"; then
                echo "$TARGET_URL" > "$URL_FILE"
            else
                exit 1
            fi
        else
            # Use gum choose to select from the list
            echo "$RAW_URLS" | gum choose --no-limit --height 20 --header "Select pages to scrape (Space to toggle, Enter to confirm)" > "$URL_FILE"
        fi
        ;;
    "Paste URL List (Unlimited)")
        gum style --foreground 99 "Paste your URLs below (ctrl+d to save):"
        gum write --placeholder "https://site.com/page1..." --height 20 --width 80 > "$URL_FILE"
        # If user didn't paste anything or file is empty
        if [ ! -s "$URL_FILE" ]; then
             log_error "No URLs provided."
             exit 1
        fi
        # Infer target url from first line for naming purposes
        TARGET_URL=$(head -n 1 "$URL_FILE")
        ;;
esac

# Validate we have URLs
if [ ! -s "$URL_FILE" ]; then
    log_error "No URLs selected/provided."
    exit 1
fi

COUNT=$(wc -l < "$URL_FILE")
log_info "Queued $COUNT unique pages for processing."

# 3. Settings Configuration
gum style --foreground 99 "Visual Settings Configuration"

RES_PRESET=$(gum choose "Desktop (1920x1080)" "Laptop (1366x768)" "Mobile (375x812)" "4K (3840x2160)" "Custom" --header "Viewport Resolution")

case "$RES_PRESET" in
    "Desktop (1920x1080)") WIDTH=1920; HEIGHT=1080 ;;
    "Laptop (1366x768)") WIDTH=1366; HEIGHT=768 ;;
    "Mobile (375x812)") WIDTH=375; HEIGHT=812 ;;
    "4K (3840x2160)") WIDTH=3840; HEIGHT=2160 ;;
    *)
        WIDTH=$(gum input --placeholder "1920" --header "Width")
        HEIGHT=$(gum input --placeholder "1080" --header "Height")
        ;;
esac

CAPTURE_MODE=$(gum choose "Full Page (Scrolling)" "Viewport Only" --header "Capture Mode")
if [ "$CAPTURE_MODE" == "Full Page (Scrolling)" ]; then
    FULL_PAGE="true"
else
    FULL_PAGE="false"
fi

QUALITY=$(gum choose "Standard (1x)" "High DPI (2x)" "Ultra (3x)" --header "Pixel Density (Scale Factor)")
case "$QUALITY" in
    "Standard (1x)") SCALE_FACTOR=1 ;;
    "High DPI (2x)") SCALE_FACTOR=2 ;;
    "Ultra (3x)") SCALE_FACTOR=3 ;;
esac

DEFAULT_NAME="scraped_dump_$(date +%s)"
if [ -n "$TARGET_URL" ]; then
    DEFAULT_NAME="scraped_$(extract_domain $TARGET_URL)_$(date +%s)"
fi
OUTPUT_NAME=$(gum input --value "$DEFAULT_NAME" --header "Output Directory Name")

# 4. Confirmation
clear
gum style --border normal --padding "1 2" --foreground 212 \
    "Ready to Scrape" \
    "URL Count: $COUNT" \
    "Resolution: ${WIDTH}x${HEIGHT} @ ${SCALE_FACTOR}x" \
    "Full Page: $FULL_PAGE" \
    "Robots.txt: Ignored (Aggressive)" \
    "Output: ./$OUTPUT_NAME"

gum confirm "Start Scraping?" || exit 0

# 5. Execution
generate_scraper_script

export VIEWPORT_WIDTH="$WIDTH"
export VIEWPORT_HEIGHT="$HEIGHT"
export FULL_PAGE="$FULL_PAGE"
export SCALE_FACTOR="$SCALE_FACTOR"
export OUTPUT_DIR="$OUTPUT_NAME"
export DELAY_MS=2000 
export URL_FILE="target_urls.txt"

log_info "Initializing chromium engine..."
rm -f scrape_summary.json

node _scrape_worker.js

# 6. Report
if [ -f "scrape_summary.json" ]; then
    gum style --border thick --border-foreground 212 --padding "1 2" \
        "Done!" \
        "Captures saved to: $OUTPUT_NAME"
else
    log_error "Scraping finished but no summary generated."
fi

# Cleanup
rm -f _scrape_worker.js target_urls.txt
