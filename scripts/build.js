import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const GITHUB_REPO = process.env.GITHUB_REPOSITORY || 'divyanshu2074/agentstack-radar';
const BASE_PATH = process.env.BASE_PATH !== undefined 
  ? process.env.BASE_PATH 
  : (process.env.GITHUB_ACTIONS ? `/${GITHUB_REPO.split('/')[1]}` : '');
const ROOT_HREF = BASE_PATH ? `${BASE_PATH}/` : '/';

const SITE_URL = process.env.SITE_URL || `https://${GITHUB_REPO.split('/')[0]}.github.io/${GITHUB_REPO.split('/')[1]}`;
const GUMROAD_BUY_URL = 'https://gumroad.com/l/agentstack-atlas'; // Placeholder for user's Gumroad product link
const SUBSTACK_URL = 'https://agentstack.substack.com';

function renderHeader(activePage = 'directory') {
  return `
    <header class="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="${ROOT_HREF}" class="flex items-center gap-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
            ⚡
          </div>
          <div>
            <div class="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
              AgentStack <span class="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Radar</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">AUTONOMOUS</span>
            </div>
            <div class="text-[11px] text-slate-400">Model Context Protocol & AI Agent Toolchains</div>
          </div>
        </a>

        <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="${ROOT_HREF}" class="${activePage === 'directory' ? 'text-cyan-400' : 'text-slate-300 hover:text-white'} transition">Directory</a>
          <a href="#categories" class="text-slate-300 hover:text-white transition">Categories</a>
          <a href="#pricing" class="text-slate-300 hover:text-white transition">Enterprise Dataset</a>
          <a href="${SUBSTACK_URL}" target="_blank" class="text-slate-300 hover:text-white transition flex items-center gap-1">Newsletter ↗</a>
        </nav>

        <div class="flex items-center gap-3">
          <a href="${GUMROAD_BUY_URL}" target="_blank" class="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 font-mono text-xs border border-slate-700 hover:border-cyan-500/50 transition">
            <span>Enterprise Atlas ($9)</span>
          </a>
          <a href="#sponsor" class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs tracking-wide shadow-md shadow-cyan-500/20 hover:scale-105 transition">
            + Submit Tool
          </a>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 font-bold text-white text-base mb-2">
            ⚡ AgentStack Radar
          </div>
          <p class="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
            The autonomous zero-cost intelligence registry tracking production Model Context Protocol (MCP) servers, agent toolchains, and AI frameworks. Powered continuously by Google Antigravity.
          </p>
          <div class="text-[11px] text-slate-400">
            Strictly $0 infrastructure cost &bull; 100% Autonomous daily updates &bull; MIT Licensed
          </div>
        </div>
        <div>
          <div class="text-white font-semibold text-xs tracking-wider uppercase mb-3 font-mono">Resources</div>
          <ul class="space-y-2 text-xs">
            <li><a href="${SITE_URL}/rss.xml" class="hover:text-cyan-400 transition">Live RSS Feed</a></li>
            <li><a href="${SITE_URL}/sitemap.xml" class="hover:text-cyan-400 transition">XML Sitemap</a></li>
            <li><a href="${GUMROAD_BUY_URL}" target="_blank" class="hover:text-cyan-400 transition">Download Enterprise Atlas ($9)</a></li>
            <li><a href="${SUBSTACK_URL}" target="_blank" class="hover:text-cyan-400 transition">Weekly Intelligence Brief</a></li>
          </ul>
        </div>
        <div>
          <div class="text-white font-semibold text-xs tracking-wider uppercase mb-3 font-mono">Monetization & Ads</div>
          <ul class="space-y-2 text-xs">
            <li><a href="#sponsor" class="hover:text-cyan-400 transition">Featured Placement ($29/mo)</a></li>
            <li><a href="${GUMROAD_BUY_URL}" target="_blank" class="hover:text-cyan-400 transition">Enterprise CSV License</a></li>
            <li><a href="https://github.com" target="_blank" class="hover:text-cyan-400 transition">GitHub Open Source</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `;
}

function renderItemCard(item) {
  return `
    <div class="item-card bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 transition group flex flex-col justify-between" data-category="${item.category}" data-search="${(item.name + ' ' + item.tagline + ' ' + item.tags.join(' ')).toLowerCase()}">
      <div>
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-2">
            <h3 class="font-bold text-white text-base group-hover:text-cyan-400 transition tracking-tight">
              <a href="${ROOT_HREF}items/${item.slug}.html">${item.name}</a>
            </h3>
            ${item.verified ? '<span title="Verified Architecture" class="text-cyan-400 text-xs">✓</span>' : ''}
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            item.securityScore.startsWith('A') ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' : 'bg-amber-950 text-amber-400 border border-amber-800/60'
          }">${item.securityScore} Security</span>
        </div>

        <p class="text-slate-400 text-xs leading-relaxed mb-4">
          ${item.tagline}
        </p>
      </div>

      <div>
        <div class="bg-slate-950/70 border border-slate-800/80 rounded-lg p-2 font-mono text-[11px] text-slate-300 flex items-center justify-between mb-4 group/cmd">
          <span class="truncate mr-2 text-slate-400">$ ${item.install}</span>
          <button onclick="navigator.clipboard.writeText('${item.install.replace(/'/g, "\\'")}'); this.innerText='Copied!'; setTimeout(()=>this.innerText='Copy', 1500);" class="text-[10px] text-cyan-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition">
            Copy
          </button>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/60">
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1 text-slate-300 font-mono">
              ★ ${(item.stars).toLocaleString()}
            </span>
            <span class="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">${item.license}</span>
          </div>
          <a href="${ROOT_HREF}items/${item.slug}.html" class="text-cyan-400 group-hover:translate-x-0.5 transition font-medium flex items-center gap-1">
            Details →
          </a>
        </div>
      </div>
    </div>
  `;
}

async function build() {
  console.log('🚀 [Build] Compiling AgentStack Radar static deployment...');
  await fs.mkdir(DIST_DIR, { recursive: true });
  await fs.mkdir(path.join(DIST_DIR, 'items'), { recursive: true });

  const categories = JSON.parse(await fs.readFile(path.join(ROOT_DIR, 'data', 'categories.json'), 'utf-8'));
  const items = JSON.parse(await fs.readFile(path.join(ROOT_DIR, 'data', 'items.json'), 'utf-8'));
  const newsletters = JSON.parse(await fs.readFile(path.join(ROOT_DIR, 'data', 'newsletter.json'), 'utf-8'));

  // 1. Generate Index Page
  const featuredItems = items.filter(i => i.featured);
  const indexHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth bg-slate-950 text-slate-100">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AgentStack Radar - The Autonomous MCP & AI Agent Toolchain Directory</title>
  <meta name="description" content="Discover, benchmark and deploy Model Context Protocol (MCP) servers and autonomous AI agent toolchains. Live, autonomous 24/7 intelligence index.">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="min-h-screen flex flex-col bg-slate-950 selection:bg-cyan-500 selection:text-slate-950">
  ${renderHeader('directory')}

  <!-- Hero Section -->
  <section class="relative pt-16 pb-12 overflow-hidden border-b border-slate-800/60 bg-gradient-to-b from-slate-900/50 to-transparent">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-300 text-xs font-mono mb-6">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>INDEX UPDATED DAILY • ${items.length} VERIFIED TOOLCHAINS</span>
      </div>
      
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto">
        The Autonomous Intelligence Registry for <span class="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">MCP & AI Agents</span>
      </h1>
      
      <p class="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
        Discover verified Model Context Protocol (MCP) servers, sandboxed filesystem integrations, database connectors, and autonomous agent toolchains.
      </p>

      <!-- Search & Filters Input -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="relative">
          <input 
            type="text" 
            id="searchInput"
            placeholder="Search by tool name, category, command (e.g. postgres, docker, search)..." 
            class="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-5 py-3.5 pl-12 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 shadow-xl transition"
          />
          <div class="absolute left-4 top-3.5 text-slate-400">
            🔍
          </div>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex items-center justify-center flex-wrap gap-2 max-w-4xl mx-auto" id="categoryFilters">
        <button class="cat-pill active px-3.5 py-1.5 rounded-lg text-xs font-medium bg-cyan-500 text-slate-950 shadow-sm transition" data-filter="all">All Tools (${items.length})</button>
        ${categories.map(c => `
          <button class="cat-pill px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition" data-filter="${c.id}">
            ${c.name}
          </button>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- Sponsor Banner & Monetization CTA -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 w-full" id="sponsor">
    <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-cyan-950/40">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
          🚀
        </div>
        <div>
          <div class="font-bold text-white text-sm flex items-center gap-2">
            Feature Your Tool or MCP Server Here
            <span class="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">1 SLOT AVAILABLE</span>
          </div>
          <div class="text-xs text-slate-400">Get highlighted before 50,000+ AI engineers, enterprise architects, and builders.</div>
        </div>
      </div>
      <a href="${GUMROAD_BUY_URL}" target="_blank" class="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 tracking-wide transition whitespace-nowrap">
        Book Placement ($29/mo) →
      </a>
    </div>
  </section>

  <!-- Directory Cards Grid -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full" id="directory">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Verified Toolchains & MCP Registry
        </h2>
        <p class="text-xs text-slate-400 mt-1">Autonomous security ratings and quick installation commands.</p>
      </div>
      <div class="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-900/50 px-3 py-1 rounded-md" id="resultCount">
        Showing ${items.length} items
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="itemsGrid">
      ${items.map(renderItemCard).join('')}
    </div>

    <!-- Empty State -->
    <div id="emptyState" class="hidden text-center py-16">
      <div class="text-4xl mb-3">🔍</div>
      <div class="text-white font-bold text-base mb-1">No matching toolchains found</div>
      <div class="text-slate-400 text-xs">Try searching for "postgres", "browser", or reset filters.</div>
    </div>
  </main>

  <!-- Enterprise Monetization Callout -->
  <section class="border-y border-slate-800 bg-slate-900/40 py-16" id="pricing">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div class="md:col-span-2">
            <span class="text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">ENTERPRISE LICENSE & AUDIT</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-4">AgentStack Enterprise MCP Atlas & Architecture Guide</h2>
            <p class="text-slate-400 text-sm leading-relaxed mb-6">
              Complete raw JSON database export, spreadsheet CSV license for internal procurement, zero-trust security checklist, and parameterization blueprints for deploying MCP in hardened environments.
            </p>
            <div class="flex flex-wrap gap-4 text-xs text-slate-300">
              <span class="flex items-center gap-1.5">✓ Full Raw JSON / CSV</span>
              <span class="flex items-center gap-1.5">✓ Security Audit Scores</span>
              <span class="flex items-center gap-1.5">✓ Sandboxing Runbooks</span>
            </div>
          </div>
          <div class="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-center">
            <div class="text-xs text-slate-400 uppercase font-mono">One-time purchase</div>
            <div class="text-4xl font-extrabold text-white my-2">$9 <span class="text-xs font-normal text-slate-400">USD</span></div>
            <div class="text-[11px] text-emerald-400 mb-4 font-mono">Instant Digital Download</div>
            <a href="${GUMROAD_BUY_URL}" target="_blank" class="block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-300 text-slate-950 font-bold text-xs tracking-wide shadow-lg shadow-cyan-500/20 transition">
              Get Enterprise Atlas →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Newsletter Signup Form -->
  <section class="max-w-3xl mx-auto px-4 py-16 text-center">
    <div class="text-2xl font-bold text-white mb-2">Subscribe to the Weekly Agent Intelligence Brief</div>
    <p class="text-slate-400 text-xs max-w-lg mx-auto mb-6">
      Every Monday morning, our autonomous research agent summarizes newly launched MCP tools, velocity spikes, and production incident post-mortems.
    </p>
    <form action="${SUBSTACK_URL}" target="_blank" class="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
      <input type="email" placeholder="Enter your work email..." required class="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400">
      <button type="submit" class="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition">
        Join Free
      </button>
    </form>
    <div class="text-[11px] text-slate-400 mt-3">Zero spam. Unsubscribe at any time with one click.</div>
  </section>

  ${renderFooter()}

  <!-- Client-side filter & search script -->
  <script>
    const searchInput = document.getElementById('searchInput');
    const filterPills = document.querySelectorAll('.cat-pill');
    const cards = document.querySelectorAll('.item-card');
    const resultCount = document.getElementById('resultCount');
    const emptyState = document.getElementById('emptyState');

    let currentCategory = 'all';
    let currentSearch = '';

    function updateView() {
      let visible = 0;
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const text = card.getAttribute('data-search');

        const matchesCat = (currentCategory === 'all' || cat === currentCategory);
        const matchesSearch = (!currentSearch || text.includes(currentSearch));

        if (matchesCat && matchesSearch) {
          card.classList.remove('hidden');
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });

      resultCount.innerText = \`Showing \${visible} item\${visible === 1 ? '' : 's'}\`;
      if (visible === 0) {
        emptyState.classList.remove('hidden');
      } else {
        emptyState.classList.add('hidden');
      }
    }

    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      updateView();
    });

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => {
          p.classList.remove('bg-cyan-500', 'text-slate-950');
          p.classList.add('bg-slate-900', 'text-slate-300');
        });
        pill.classList.remove('bg-slate-900', 'text-slate-300');
        pill.classList.add('bg-cyan-500', 'text-slate-950');

        currentCategory = pill.getAttribute('data-filter');
        updateView();
      });
    });
  </script>
</body>
</html>`;

  await fs.writeFile(path.join(DIST_DIR, 'index.html'), indexHtml, 'utf-8');
  console.log('✅ Generated index.html');

  // 2. Generate Individual Tool Pages
  for (const item of items) {
    const itemHtml = `<!DOCTYPE html>
<html lang="en" class="bg-slate-950 text-slate-100">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${item.name} - MCP Server & Toolchain Docs | AgentStack Radar</title>
  <meta name="description" content="${item.tagline}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="min-h-screen flex flex-col bg-slate-950">
  ${renderHeader('item')}

  <main class="max-w-4xl mx-auto px-4 py-12 flex-1 w-full">
    <a href="${ROOT_HREF}" class="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white mb-6 transition">
      ← Back to Directory
    </a>

    <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 class="text-3xl font-extrabold text-white tracking-tight">${item.name}</h1>
          <div class="text-slate-400 text-sm mt-1">${item.tagline}</div>
        </div>
        <span class="self-start sm:self-auto px-3 py-1 rounded-lg text-xs font-mono font-bold ${
          item.securityScore.startsWith('A') ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
        }">${item.securityScore} Security Rating</span>
      </div>

      <div class="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 py-4 border-y border-slate-800/80 mb-6">
        <span>★ ${(item.stars).toLocaleString()} Stars</span>
        <span>•</span>
        <span>License: ${item.license}</span>
        <span>•</span>
        <span>Category: ${item.category}</span>
        <span>•</span>
        <a href="https://github.com/${item.repo}" target="_blank" class="text-cyan-400 hover:underline">GitHub Repository ↗</a>
      </div>

      <h2 class="text-base font-bold text-white mb-2">Installation & Launch Command</h2>
      <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-cyan-300 flex items-center justify-between mb-6">
        <code>$ ${item.install}</code>
        <button onclick="navigator.clipboard.writeText('${item.install.replace(/'/g, "\\'")}'); this.innerText='Copied!'; setTimeout(()=>this.innerText='Copy', 1500);" class="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] transition">
          Copy
        </button>
      </div>

      <h2 class="text-base font-bold text-white mb-2">Overview & Architecture Details</h2>
      <p class="text-slate-300 text-sm leading-relaxed mb-6">
        ${item.description}
      </p>

      <div class="flex flex-wrap gap-2">
        ${item.tags.map(t => `<span class="px-2.5 py-1 rounded bg-slate-800/80 text-[11px] font-mono text-slate-300">#${t}</span>`).join('')}
      </div>
    </div>

    <!-- Monetization callout on individual page -->
    <div class="bg-gradient-to-r from-slate-900 to-slate-950 border border-cyan-500/20 rounded-2xl p-6 text-center">
      <div class="font-bold text-white text-base mb-1">Deploying ${item.name} in Enterprise Production?</div>
      <p class="text-slate-400 text-xs max-w-md mx-auto mb-4">
        Download our complete Enterprise MCP Atlas with sandboxing configurations, token redactors, and parameterization guides.
      </p>
      <a href="${GUMROAD_BUY_URL}" target="_blank" class="inline-block px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition">
        Download Enterprise Atlas ($9) →
      </a>
    </div>
  </main>

  ${renderFooter()}
</body>
</html>`;

    await fs.writeFile(path.join(DIST_DIR, 'items', `${item.slug}.html`), itemHtml, 'utf-8');
  }
  console.log(`✅ Generated ${items.length} individual item pages`);

  // 3. Generate XML Sitemap
  const sitemapUrls = [
    `${SITE_URL}/`,
    ...items.map(i => `${SITE_URL}/items/${i.slug}.html`)
  ];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url><loc>${url}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></url>`).join('\n')}
</urlset>`;
  await fs.writeFile(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log('✅ Generated sitemap.xml');

  // 4. Generate RSS Feed
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>AgentStack Radar - MCP & AI Agent Releases</title>
  <link>${SITE_URL}</link>
  <description>Daily autonomous feed of newly verified Model Context Protocol tools and agent toolchains.</description>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${items.map(item => `
    <item>
      <title>${item.name} (${item.securityScore} Security)</title>
      <link>${SITE_URL}/items/${item.slug}.html</link>
      <description><![CDATA[${item.tagline} - Installation: ${item.install}]]></description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  `).join('')}
</channel>
</rss>`;
  await fs.writeFile(path.join(DIST_DIR, 'rss.xml'), rssXml, 'utf-8');
  console.log('✅ Generated rss.xml');

  // 5. Generate Robots.txt, _redirects, and .nojekyll
  await fs.writeFile(path.join(DIST_DIR, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`, 'utf-8');
  await fs.writeFile(path.join(DIST_DIR, '_redirects'), `/feed /rss.xml 301\n/atlas /assets/AgentStack-Enterprise-MCP-Atlas.json 200\n`, 'utf-8');
  await fs.writeFile(path.join(DIST_DIR, '.nojekyll'), '', 'utf-8');

  console.log('🎉 [Build] Static build completed successfully in dist/');
}

build().catch(err => {
  console.error('[Build] Failed:', err);
  process.exit(1);
});
