# Project: AI-Enhanced Marketing Services - TWO Separate Websites

---

## 🎯 CRITICAL: TWO DISTINCT WEBSITES (DO NOT CHANGE)

### Website 1: Enhanced Main Site (Clone + AI Additions)
**Identity:** Prime Marketing Experts (Michael Krieger) - SAME EXISTING BRAND
**Purpose:** Add AI services to existing portfolio
**Requirements:**
- 100% exact clone of primemarketingexperts.com
- Same brand identity, colors, fonts, voice, tone
- All existing content preserved
- **ONLY addition:** New AI service pages added to navigation
- Maintains all current marketing/SEO services
- Professional image consistent with current brand

### Website 2: New AI Brand Site (Test/Dev)
**Identity:** COMPLETELY NEW BRAND (marketing-focused AI brand name TBD)
**Purpose:** Dedicated AI services test/demo site
**Requirements:**
- Different brand identity from Prime Marketing Experts
- Modern, innovative, tech-focused aesthetic
- Focused exclusively on AI services
- Can evolve into separate business if market validates
- Cross-linked to main site but visually distinct

---

## 🚨 IMPORTANT: Minimax NOT Available

**Status:** Must resubscribe - NOT in current MCP tool inventory

**DO NOT use any minimax_* tools in this project.**

---

## 🚨 Step 1: shadcn MCP Server Installation

### Check and Install shadcn MCP Server:

```bash
# First, check if shadcn MCP server is available
# If not, install it:

# Check current MCP servers
claude mcp list

# Install shadcn MCP server
claude mcp add shadcn npx shadcn@latest mcp start

# Verify installation
claude mcp list

# Test shadcn MCP connection
claude mcp test shadcn
```

### shadcn MCP Server Documentation Link:
**Documentation:** https://ui.shadcn.com/docs/mcp
**Purpose:** Provides MCP server access to shadcn/ui components, including dark mode support

---

## 🚨 Step 2: Dark Mode Components for AI Brand Site

### shadcn Dark Mode Requirements:

**Documentation:** https://ui.shadcn.com/docs/dark-mode

**Dark Mode Setup for Different Frameworks:**
- **Next.js**: Configure CSS variables for dark mode
- **Vite**: Use `@radix-ui/react` dark mode utilities
- **Astro**: Integrate dark mode toggle
- **Remix**: Add dark mode theme provider

**Required Dark Mode Components from shadcn/ui:**
- `Card` - Dark mode support with subtle shadows
- `Button` - Multiple variants for dark backgrounds
- `Dialog` - Dark backdrop with light content
- `Navigation Menu` - Dark themed navigation
- `Sheet`/`Drawer` - Dark mode sidebars
- `Input`/`Textarea` - Dark themed form elements
- `Tabs` - Dark themed tabs
- `Table` - Dark mode data tables
- `Toast` - Dark mode notifications
- `Tooltip` - Dark themed tooltips

**Dark Mode Color Scheme for AI Brand:**
```css
/* Dark theme for AI Brand Site */
:root {
  --background: #09090b;       /* Very dark blue-gray */
  --foreground: #f8fafc;       /* Light gray-white */
  --card: #1e1b4b;           /* Slightly lighter */
  --card-foreground: #e2e8f0;   /* Off-white */
  --popover: #1e1b4b;
  --popover-foreground: #e2e8f0;
  --primary: #3b82f6;          /* Modern purple-blue */
  --primary-foreground: #ffffff;
  --secondary: #475569;
  --secondary-foreground: #f8fafc;
  --muted: #64748b;
  --muted-foreground: #94a3b8;
  --accent: #8b5cf6;          /* Cyan accent */
  --accent-foreground: #0f172a;
  --destructive: #ef4444;
  --destructive-foreground: #f8fafc;
  --border: #334155;
  --input: #020617;
  --ring: #1e293b;
  --radius: 0.5rem;
}
```

---

## 📊 Step 3: Marketing-Focused AI Brand Names Research

### AI Brand Name Requirements:
**Focus:** Marketing/Business-oriented (NOT generic tech names)

### Recommended Marketing-Focused Brand Names:

**Option 1: GrowthAI**
- **Why:** "Growth" resonates with marketing outcomes
- **Focus:** Business growth through AI
- **Tagline:** "AI-Powered Marketing Solutions for SMB Growth"

**Option 2: Amplify Marketing**
- **Why:** "Amplify" = make marketing stronger
- **Focus:** Amplifying marketing efforts with AI
- **Tagline:** "Amplify Your Marketing Intelligence"

**Option 3: ScaleFlow Marketing**
- **Why:** "Scale" + "Flow" for marketing operations
- **Focus:** Scaling marketing operations smoothly
- **Tagline:** "Intelligent Marketing at Scale"

**Option 4: OptimizeNow AI**
- **Why:** "OptimizeNow" = actionable marketing outcome
- **Focus:** Immediate marketing optimization
- **Tagline:** "Optimize Your Marketing Today"

**Option 5: TransformAI Marketing**
- **Why:** "Transform" indicates marketing transformation
- **Focus:** Transforming marketing with AI
- **Tagline:** "Transform Your Marketing Strategy"

**Option 6: MarketingAI Solutions**
- **Why:** Direct and descriptive
- **Focus:** AI solutions for marketing
- **Tagline:** "Your AI Marketing Partner"

**Option 7: SmartScale Marketing**
- **Why:** "Smart" = intelligent, "Scale" = growth
- **Focus:** Intelligent scaling of marketing
- **Tagline:** "Smart Marketing, Scaled Right"

**Option 8: BoostAI Agency**
- **Why:** "Boost" = improve marketing results
- **Focus:** Boosting agency capabilities with AI
- **Tagline:** "Boost Your Agency with AI"

**Option 9: Elevate Marketing**
- **Why:** "Elevate" = take marketing to next level
- **Focus:** Elevating marketing strategies
- **Tagline:** "Elevate Your Marketing Game"

**Option 10: Catalyst Marketing**
- **Why:** "Catalyst" = spark change in marketing
- **Focus:** Catalyzing marketing transformation
- **Tagline:** "Marketing Transformation Catalyst"

### Brand Name Selection Process:
1. Present 3-5 top options to Michael Krieger
2. Consider domain availability
3. Evaluate how well it represents AI + marketing focus
4. Choose name that sounds professional yet innovative
5. Select final brand name for AI brand site

---

## 🚨 Step 4: OpenSpec Integration (MANDATORY FIRST)

### OpenSpec Commands to Execute:

```bash
# Initialize OpenSpec for dual-website project
openspec create

# Create change proposal for main site enhancement
openspec change "main-site-ai-additions" --strict

# Create change proposal for new AI brand site
openspec change "new-ai-brand-site" --strict

# Validate both changes
openspec validate "main-site-ai-additions" --strict
openspec validate "new-ai-brand-site" --strict

# Update specs
openspec update

# Review all specs and changes
openspec list --specs
openspec list --changes
```

---

## 🎯 Available MCP Tool Inventory

### 1. shadcn MCP Server (NEW - Install First)
   - `shadcn_` tools for component access
   - Dark mode component documentation
   - Component templates and blocks

### 2. Browser (browser_*) - Visual Inspection & Cloning
   - `browser_snapshot` - Capture existing site structure for clone
   - `browser_take_screenshot` - Visual reference for cloning
   - `browser_navigate` - Navigate existing site to analyze
   - `browser_evaluate` - Extract design tokens, colors from existing site
   - `browser_click` - Test interactions
   - `browser_type` - Form filling for testing

### 3. Flow Nexus (flow_nexus_*) - Neural AI & Sandboxes
   - `neural_patterns` - Generate marketing copy for both sites
   - `seraphina_chat` - AI assistant for service optimization
   - `sandbox_create` - Test both sites in isolation
   - `sandbox_execute` - Parallel development environments
   - `sandbox_upload` - Upload files for testing
   - `template_list` - Review project templates
   - `template_deploy` - Deploy from templates

### 4. Claude Flow (claude_flow_*) - Orchestration
   - `swarm_init`, `agent_spawn` - Coordinate development
   - `task_orchestrate` - Orchestrate complex workflows
   - `sparc_mode` - SPARC methodology
   - `memory_usage`, `memory_search` - Share context between agents
   - `performance_report` - Track development metrics
   - `neural_train`, `neural_patterns` - AI capabilities
   - `agent_list`, `agent_metrics` - Monitor agents

### 5. Filesystem (filesystem_*) - File Management
   - `read_text_file`, `write_file` - Manage both sites
   - `edit_file` - Make precise changes
   - `read_multiple_files` - Batch file operations
   - `directory_tree` - Analyze existing site structure
   - `create_directory` - Set up both site directories
   - `list_directory` - Navigate file structure
   - `search_files` - Find specific files

### 6. Memory (memory_*) - Knowledge Management
   - `create_entities` - Store project knowledge
   - `search_nodes` - Find related information
   - `open_nodes` - Retrieve detailed info
   - `add_observations` - Track decisions and insights
   - `read_graph` - Get complete knowledge base

### 7. Notion (notion_API_*) - Documentation
   - `create_page` - Create project docs
   - `create_database` - Track progress
   - `update_page` - Keep specs updated
   - `query_database` - Get task status
   - `retrieve_database` - Get project data

### 8. Zapier Integration (zapier_mcp_*) - External Services
   - `gmail_send_email` - Send project updates
   - `google_sheets_create_spreadsheet` - Track tasks
   - `google_drive_upload_file` - Backup project files
   - `notion_create_page` - Documentation
   - `google_calendar_create_event` - Schedule reviews

### 9. RUV Swarm (ruv_swarm_*) - Advanced Orchestration
   - `swarm_init` - Initialize swarm
   - `agent_spawn` - Create agents
   - `task_orchestrate` - Coordinate tasks
   - `neural_status` - Monitor AI components
   - `benchmark_run` - Performance testing

### 10. Sequential Thinking - Complex Problem Solving
   - Break down complex requirements
   - Plan multi-step development
   - Verify solutions systematically

---

## 📋 OpenSpec Change Proposals

### Change 1: Main Site AI Additions

**File:** `openspec/changes/main-site-ai-additions/proposal.md`

```markdown
# Change Proposal: Main Site AI Services Slipstream

## Objective
Add AI service pages to existing primemarketingexperts.com WITHOUT changing brand or design.

## Scope
### In Scope:
1. Clone primemarketingexperts.com identically
2. Add AI Services dropdown/menu to navigation
3. Create 10 AI service pages using existing design patterns
4. Update homepage to highlight AI services (maintaining current hero)
5. Add AI services to services overview page
6. SEO optimization for AI keywords

### Out of Scope:
1. ANY design changes to existing site
2. Brand identity changes
3. Removal of existing services
4. New navigation structure (only add to existing)
5. Homepage redesign (only AI section addition)

## Constraints
1. ZERO changes to colors, fonts, layout of existing pages
2. All new AI pages follow exact design system of current site
3. Existing functionality must remain 100% intact
4. Must be indistinguishable from original design

## Success Criteria
1. ✅ 10 AI service pages added seamlessly
2. ✅ Navigation updated without breaking design
3. ✅ Homepage enhanced with AI section
4. ✅ All existing pages unchanged
5. ✅ Performance not degraded
6. ✅ SEO optimized for AI keywords
```

**File:** `openspec/changes/main-site-ai-additions/tasks.md`

```markdown
# Tasks: Main Site AI Additions

## Phase 1: Analysis & Cloning (Priority: P0)
1. [ ] Analyze existing primemarketingexperts.com structure
2. [ ] Capture design system (colors, fonts, components) using browser tools
3. [ ] Clone website locally maintaining 100% fidelity
4. [ ] Document component library (hero, features, testimonials)
5. [ ] Identify navigation structure

## Phase 2: AI Services Integration (Priority: P0)
6. [ ] Add "AI Services" dropdown to existing navigation
7. [ ] Create AI service page template matching existing design
8. [ ] Optimize AI Chatbot service page (using provided content)
9. [ ] Optimize AI Voice service page (using provided content)
10. [ ] Create 8 additional AI service pages (from market research)
11. [ ] Add AI services to services overview page

## Phase 3: Homepage Enhancement (Priority: P1)
12. [ ] Add AI services section to homepage (below existing hero)
13. [ ] Update homepage CTA to include AI services
14. [ ] Add AI success story/testimonial to homepage

## Phase 4: SEO & Optimization (Priority: P1)
15. [ ] SEO keyword research for AI services
16. [ ] Optimize all AI service pages for search
17. [ ] Add structured data for AI services
18. [ ] Update sitemap.xml with AI pages
19. [ ] Performance optimization (maintain or improve current)

## Phase 5: Testing (Priority: P2)
20. [ ] Verify all existing pages unchanged
21. [ ] Test new AI pages match existing design
22. [ ] Mobile responsiveness test
23. [ ] Cross-browser test
24. [ ] Accessibility audit (maintain current score)
25. [ ] Contact forms functional
```

### Change 2: New AI Brand Site

**File:** `openspec/changes/new-ai-brand-site/proposal.md`

```markdown
# Change Proposal: New AI Brand Website

## Objective
Create completely new AI-branded website for testing dedicated AI services market.

## Scope
### In Scope:
1. Select marketing-focused AI brand name from research
2. Define new brand identity (name, colors, logo concept)
3. Design modern, tech-focused aesthetic with DARK MODE
4. Use shadcn components for dark mode implementation
5. Create homepage with AI services overview
6. Build services hub page with all 10 AI services
7. Build individual AI service pages (10 total)
8. Build about/profile page (Michael Krieger)
9. Build contact/consultation page with service selection
10. Implement contact forms and lead capture
11. SEO optimization for AI keywords
12. Cross-linking to main site

### Out of Scope:
1. Any similarity to main site branding
2. Copying main site design patterns
3. Integration with main site backend (only cross-links)

## Constraints
1. Must use shadcn MCP server for components
2. Must implement dark mode as default theme
3. Must have distinct brand identity from main site
4. Different visual language from main site
5. Modern, innovative aesthetic
6. Focus exclusively on AI services
7. Can evolve into separate business

## Success Criteria
1. ✅ Unique brand identity established (marketing-focused name)
2. ✅ Modern, professional dark mode design using shadcn
3. ✅ 10 AI service pages with full content
4. ✅ Lead capture functional
5. ✅ Cross-links to main site
6. ✅ SEO optimized
7. ✅ Fast loading (<2s LCP)
8. ✅ Mobile-responsive
```

**File:** `openspec/changes/new-ai-brand-site/tasks.md`

```markdown
# Tasks: New AI Brand Website

## Phase 1: Brand Identity & Research (Priority: P0)
1. [ ] Select marketing-focused AI brand name from 10 options
2. [ ] Design color palette (distinct from main site)
3. [ ] Design typography system
4. [ ] Create AI service visual concepts (placeholder images - no Minimax)
5. [ ] Market research on top 10 AI services

## Phase 2: Architecture & Design (Priority: P0)
6. [ ] Install and configure shadcn MCP server
7. [ ] Design component library for AI brand site using shadcn
8. [ ] Implement dark mode theme with shadcn CSS variables
9. [ ] Design navigation structure
10. [ ] Design service page templates
11. [ ] Design hero section for homepage
12. [ ] Design contact/consultation forms

## Phase 3: Content Creation (Priority: P1)
13. [ ] Generate marketing copy for all services (Flow Nexus Neural)
14. [ ] Create AI Chatbot service page (optimized content)
15. [ ] Create AI Voice service page (optimized content)
16. [ ] Create 8 additional AI service pages
17. [ ] Create homepage content
18. [ ] Create about/profile page content
19. [ ] Plan voice samples for voice service demo (placeholder for Minimax resubscription)

## Phase 4: Development (Priority: P1)
20. [ ] Set up project structure
21. [ ] Build homepage with hero section (dark mode)
22. [ ] Build services hub page (dark mode)
23. [ ] Build individual service pages (10 total) (dark mode)
24. [ ] Build about/profile page (dark mode)
25. [ ] Build contact/consultation page (dark mode)
26. [ ] Implement contact forms (shadcn components)
27. [ ] Add cross-links to main site

## Phase 5: SEO & Optimization (Priority: P1)
28. [ ] SEO keyword research (different keywords from main site)
29. [ ] Optimize all pages for search
30. [ ] Add structured data
31. [ ] Create sitemap.xml
32. [ ] Performance optimization

## Phase 6: Testing (Priority: P2)
33. [ ] Responsive testing (mobile, tablet, desktop)
34. [ ] Cross-browser testing
35. [ ] Performance audit (<2s LCP)
36. [ ] Accessibility audit (WCAG 2.1 AA)
37. [ ] Contact form testing
38. [ ] Dark mode theme testing
39. [ ] shadcn component verification

## Phase 7: Review & Deploy (Priority: P2)
40. [ ] Code review
41. [ ] Security audit
42. [ ] Final QA
43. [ ] Deployment preparation
```

---

## 🚀 Development Workflow After OpenSpec

### Instruction for Coding Tools:

```
After OpenSpec has completed spec generation and validation for BOTH changes 
(main-site-ai-additions and new-ai-brand-site), proceed with development 
following SPARC methodology and utilizing full MCP tool inventory.

CRITICAL STEPS:
1. Install shadcn MCP server first
2. Main Site: ZERO design changes - ONLY add AI service pages using EXISTING design patterns
3. AI Brand Site: COMPLETELY NEW identity - modern, dark mode, innovative, tech-focused, marketing-focused brand name
4. Use shadcn components with dark mode for AI brand site
5. Use Available MCP Tools: Browser for cloning, Flow Nexus for AI content/sandboxes, Claude Flow for orchestration, shadcn for components
6. Both Sites: Production-ready, tested, accessible, SEO optimized
7. NO Minimax tools - not currently available
```

---

## 📁 File Organization

```
/primemarketingexperts.com/          # Main site (Clone + AI additions)
├── src/
│   ├── components/               # Existing design components
│   │   ├── Hero.tsx
│   │   ├── Feature.tsx
│   │   ├── Testimonial.tsx
│   │   └── ServiceCard.tsx       # AI services use this template
│   ├── pages/
│   │   ├── index.tsx             # UNCHANGED - just add AI section
│   │   ├── services/
│   │   │   ├── index.tsx          # Add AI services here
│   │   │   ├── ai-chatbot.tsx    # NEW - using existing design
│   │   │   ├── ai-voice.tsx       # NEW - using existing design
│   │   │   └── [8 more].tsx      # NEW - using existing design
│   │   ├── about/
│   │   └── contact/
│   └── lib/
├── public/
└── content/

/[selected-ai-brand-name]/          # New AI brand site (COMPLETELY DIFFERENT)
├── src/
│   ├── components/               # shadcn components with dark mode
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── ... (all shadcn components)
│   │   ├── DarkHero.tsx           # Modern, animated hero (dark mode)
│   │   ├── ServiceGrid.tsx        # AI service overview (dark mode)
│   │   ├── ServiceDetail.tsx      # AI service pages (dark mode)
│   │   └── ContactForm.tsx       # AI service selection (dark mode)
│   ├── pages/
│   │   ├── index.tsx             # AI brand homepage (dark mode)
│   │   ├── services.tsx          # Services hub (dark mode)
│   │   ├── services/
│   │   │   └── [slug].tsx      # Individual AI services (dark mode)
│   │   ├── about.tsx            # Michael profile (dark mode)
│   │   └── contact.tsx           # Consultation booking (dark mode)
│   ├── styles/
│   │   └── globals.css            # Dark mode theme with shadcn CSS variables
│   └── lib/
├── public/
│   └── images/                   # Visual assets (placeholder images)
└── assets/
```

---

## 🎯 MCP Tool Usage Strategy

### 1. shadcn MCP Server (NEW - Install First):

```bash
# Install shadcn MCP Server
claude mcp add shadcn npx shadcn@latest mcp start

# Verify shadcn is available
claude mcp list | grep shadcn

# Use shadcn for dark mode components
# Components will be accessible via shadcn MCP tools
# Dark mode configuration from shadcn documentation
```

### 2. Vision Tools for Main Site (Cloning):

```bash
# Browser Visual Inspection
browser_snapshot                              # Capture structure
browser_take_screenshot                        # Visual reference
browser_navigate "https://primemarketingexperts.com"
browser_evaluate "document.querySelector(':root')"  # Extract design tokens

# File System Analysis
filesystem_directory_tree "/path/to/existing/site"  # Structure analysis
filesystem_read_text_file "globals.css"                # Get colors, fonts
filesystem_search_files "*.tsx"                       # Find components
```

### 3. AI Tools for AI Brand Site (New + Dark Mode):

```bash
# Flow Nexus Neural AI for Content Generation
flow_nexus_neural_patterns action="analyze" operation="generate_ai_service_copy"
flow_nexus_seraphina_chat message="Generate marketing copy for AI chatbot service targeting SMBs for [BRAND_NAME]"

# Flow Nexus Sandboxes for Testing
flow_nexus_sandbox_create template="react"
flow_nexus_sandbox_execute code="npm run build && npm run test"

# shadcn for Dark Mode Components
# Once MCP server installed, shadcn components available
# Dark mode CSS variables from research above
```

### 4. Both Sites - Development:

```bash
# Claude Flow Orchestration
claude_flow_swarm_init topology="mesh" maxAgents=8
claude_flow_agent_spawn type="coder"
claude_flow_agent_spawn type="researcher"
claude_flow_task_orchestrate task="Build dual AI websites" strategy="parallel"

# Memory Sharing
claude_flow_memory_usage action="store" key="main-site-design" value="{colors, fonts, layout}"
claude_flow_memory_usage action="store" key="ai-brand-identity" value="{brand_name, dark_colors, new_fonts}"
claude_flow_memory_usage action="store" key="shadcn-dark-config" value="{css_variables, component_list}"
claude_flow_memory_search pattern="AI service"

# Performance Monitoring
claude_flow_performance_report timeframe="24h"
claude_flow_token_usage operation="all"

# Notion Documentation
notion_API_create_page parent="[parent-page-id]" properties=[...]
notion_API_update_page page_id="[page-id]" properties=[...]
```

---

## 🤖 Agent Orchestration with Claude Flow

```bash
# Single message - parallel agent spawning for both websites

Task("Main Site Analyst", "Analyze existing primemarketingexperts.com using browser tools. Capture design system, component library, navigation structure. Document exact colors, fonts, spacing, layout patterns.", "researcher")

Task("Brand Name Strategist", "Review 10 marketing-focused AI brand name options (GrowthAI, Amplify Marketing, ScaleFlow Marketing, OptimizeNow AI, TransformAI Marketing, MarketingAI Solutions, SmartScale Marketing, BoostAI Agency, Elevate Marketing, Catalyst Marketing). Present top 3-5 recommendations to Michael with domain availability check.", "researcher")

Task("Main Site Cloner", "Clone primemarketingexperts.com maintaining 100% design fidelity. Add AI services navigation dropdown. Create 10 AI service pages using EXACT existing component templates. ZERO design changes.", "coder")

Task("AI Brand Architect", "Design component library for AI brand site using shadcn MCP server. Implement dark mode with CSS variables from shadcn documentation. Modern, tech-focused aesthetic with dark theme.", "system-architect")

Task("AI Brand Builder", "Build new AI brand website from scratch using shadcn components. Homepage, services hub, 10 individual service pages, about page, contact page. All in dark mode. Distinct from main site in every way.", "coder")

Task("Content Generator", "Generate marketing copy for all 10 AI services using Flow Nexus Neural AI. Create compelling benefits, features, testimonials sections optimized for [BRAND_NAME].", "researcher")

Task("SEO Specialist Main", "Optimize main site AI pages for search while maintaining existing SEO strategy. Add AI keywords to sitemap. Zero impact on existing page rankings.", "researcher")

Task("SEO Specialist AI Brand", "Develop fresh SEO strategy for AI brand site targeting different keywords than main site. Implement structured data, meta tags, sitemap optimized for [BRAND_NAME].", "researcher")

Task("Dark Mode Specialist", "Configure shadcn components with dark mode theme. Ensure all components properly styled with dark colors. Test dark/light mode toggle if needed.", "coder")

Task("Tester Main", "Test main site: verify ALL existing pages unchanged, new AI pages match existing design perfectly, mobile responsive, no performance regression.", "tester")

Task("Tester AI Brand", "Test AI brand site: dark mode working correctly, all shadcn components rendering, modern design working, fast loading (<2s), cross-browser, mobile responsive, contact forms functional, cross-links work.", "tester")

Task("Reviewer", "Code review both projects. Main site: ensure design integrity maintained. AI brand site: ensure shadcn integration, dark mode implemented, distinct identity from main site, modern quality. Security audit both.", "reviewer")

# Batch all todos in ONE call
TodoWrite { todos: [
  {id: "1", content: "Install shadcn MCP server", status: "in_progress", priority: "critical"},
  {id: "2", content: "Run OpenSpec workflow for both sites", status: "pending", priority: "critical"},
  {id: "3", content: "Market research - top 10 AI services", status: "pending", priority: "critical"},
  {id: "4", content: "Select marketing-focused AI brand name", status: "pending", priority: "critical"},
  {id: "5", content: "Analyze existing main site design", status: "pending", priority: "critical"},
  {id: "6", content: "Clone main site with AI additions", status: "pending", priority: "critical"},
  {id: "7", content: "Build AI brand website with shadcn dark mode", status: "pending", priority: "critical"},
  {id: "8", content: "Generate AI service content", status: "pending", priority: "high"},
  {id: "9", content: "SEO optimization - both sites", status: "pending", priority: "high"},
  {id: "10", content: "Testing - both websites", status: "pending", priority: "high"},
  {id: "11", content: "Code review and deployment prep", status: "pending", priority: "high"},
  {id: "12", content: "Verify main site design unchanged", status: "pending", priority: "critical"},
  {id: "13", content: "Verify AI brand dark mode and identity", status: "pending", priority: "critical"}
] }

# Parallel file operations
Bash "mkdir -p primemarketingexperts.com [brand-name] openspec/changes/{main-site-ai-additions,new-ai-brand-site}"
Write "openspec/project.md"
Write "openspec/changes/main-site-ai-additions/proposal.md"
Write "openspec/changes/main-site-ai-additions/tasks.md"
Write "openspec/changes/new-ai-brand-site/proposal.md"
Write "openspec/changes/new-ai-brand-site/tasks.md"
```

---

## 📊 Success Metrics by Site

### Main Site (Clone):
- ✅ Design Fidelity: 100% match to existing
- ✅ Existing Pages: 0 changes
- ✅ AI Pages Added: 10 with perfect design match
- ✅ Performance: No regression (same or better)
- ✅ SEO: AI keywords added, existing maintained
- ✅ Accessibility: Same score as current

### AI Brand Site (New):
- ✅ Brand Identity: Marketing-focused name, completely distinct from main site
- ✅ Design: Dark mode implemented via shadcn, modern, tech-forward, innovative
- ✅ Performance: <2s LCP
- ✅ Pages: 15+ (home, services hub, 10 services, about, contact)
- ✅ shadcn Components: All components working in dark mode
- ✅ Features: Service demos, lead capture
- ✅ Cross-links: Working links to main site

---

## 🚀 Quick Execution Sequence

```bash
# Step 0: Install shadcn MCP Server
claude mcp add shadcn npx shadcn@latest mcp start
claude mcp list | grep shadcn  # Verify installation

# Step 1: OpenSpec (MANDATORY FIRST)
openspec create
openspec change "main-site-ai-additions" --strict
openspec change "new-ai-brand-site" --strict
openspec validate "main-site-ai-additions" --strict
openspec validate "new-ai-brand-site" --strict
openspec update
openspec list --specs
openspec list --changes

# Step 2: Brand Name Selection
# Present 10 marketing-focused names to Michael
# Select final brand name
# Use selected name throughout development

# Step 3: SPARC Development (AFTER OpenSpec validation)
cf sparc run architect "Design both site architectures with shadcn"
cf sparc batch "researcher,coder,system-architect" "Parallel development with dark mode"
cf task_orchestrate "Build dual AI websites" --strategy parallel

# Step 4: MCP Tool Usage Throughout
# Use shadcn MCP for dark mode components
# Use Browser for cloning
# Use Flow Nexus for AI content and sandboxes
# Use Claude Flow for orchestration
# NO Minimax tools (not subscribed)
```

---

## 📝 Notes for Development Team

**PRINCIPAL RULE:**
1. **Main Site = CLONE ONLY.** No design creativity, no brand changes, no new visual identity. Add AI pages to EXISTING design system.

2. **AI Brand Site = NEW IDENTITY + DARK MODE.** Completely different from main site. Modern, tech-focused, innovative design using shadcn components with dark mode. Marketing-focused brand name.

3. **shadcn MCP = CRITICAL for AI Brand Site.** Must install and use for dark mode components.

4. **Both Sites = PRODUCTION READY.** Tested, accessible, SEO optimized, analytics ready.

5. **NO MINIMAX.** Not currently subscribed - use alternative tools for visuals.

**Key Difference:**
- Main site: "Here's our new AI services" (same brand, same look)
- AI brand site: "Welcome to [GrowthAI/Amplify/etc.] - AI-Powered Marketing Solutions" (new brand, dark mode, new look)

**Marketing-Focused Brand Names:**
All 10 options focus on marketing outcomes (Growth, Amplify, Scale, Optimize, Transform, SmartScale, Boost, Elevate, Catalyst) rather than generic tech terms.

**shadcn Dark Mode:**
Use shadcn MCP server documentation at https://ui.shadcn.com/docs/dark-mode for framework-specific implementation.
