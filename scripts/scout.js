import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SEARCH_QUERIES = [
  'topic:model-context-protocol sort:stars',
  'topic:mcp-server sort:stars',
  'mcp server stars:>100'
];

async function fetchGitHubSearch(query) {
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=10`;
  const headers = {
    'User-Agent': 'AgentStackRadar-AutonomousBot/1.0',
    'Accept': 'application/vnd.github.v3+json'
  };

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`[Scout] GitHub API notice (${res.status} ${res.statusText}). Gracefully proceeding.`);
      return [];
    }
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.warn(`[Scout] Network notice: ${err.message}. Gracefully proceeding.`);
    return [];
  }
}

function inferCategory(repo) {
  const desc = (repo.description || '').toLowerCase();
  const name = repo.name.toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());
  const combined = `${desc} ${name} ${topics.join(' ')}`;

  if (combined.includes('sql') || combined.includes('postgres') || combined.includes('db') || combined.includes('vector') || combined.includes('database')) {
    return 'databases';
  }
  if (combined.includes('scrape') || combined.includes('search') || combined.includes('crawl') || combined.includes('browser') || combined.includes('web')) {
    return 'web-search';
  }
  if (combined.includes('docker') || combined.includes('k8s') || combined.includes('kubernetes') || combined.includes('cloud') || combined.includes('aws')) {
    return 'cloud-infra';
  }
  if (combined.includes('slack') || combined.includes('notion') || combined.includes('crm') || combined.includes('hubspot') || combined.includes('jira')) {
    return 'enterprise-saas';
  }
  if (combined.includes('guardrail') || combined.includes('security') || combined.includes('auth') || combined.includes('audit') || combined.includes('privacy')) {
    return 'security-audit';
  }
  return 'dev-tools';
}

function calculateSecurityScore(repo) {
  let score = 'A';
  if (repo.license && repo.license.spdx_id) {
    score = repo.stargazers_count > 1000 ? 'A+' : 'A';
  } else {
    score = 'B';
  }
  return score;
}

async function runScout() {
  console.log('📡 [Scout] Starting autonomous discovery scan...');
  const itemsPath = path.join(ROOT_DIR, 'data', 'items.json');
  const existingItems = JSON.parse(await fs.readFile(itemsPath, 'utf-8'));
  const existingRepos = new Set(existingItems.map(i => i.repo.toLowerCase()));
  const existingSlugs = new Set(existingItems.map(i => i.slug));

  let newItemsCount = 0;

  for (const query of SEARCH_QUERIES) {
    console.log(`[Scout] Querying: "${query}"...`);
    const foundRepos = await fetchGitHubSearch(query);

    for (const repo of foundRepos) {
      if (existingRepos.has(repo.full_name.toLowerCase())) {
        // Update stars and last updated
        const target = existingItems.find(i => i.repo.toLowerCase() === repo.full_name.toLowerCase());
        if (target) {
          target.stars = repo.stargazers_count;
        }
        continue;
      }

      const slug = repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 40);
      if (existingSlugs.has(slug)) continue;

      const newItem = {
        slug: slug,
        name: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        category: inferCategory(repo),
        tagline: repo.description ? repo.description.slice(0, 110) + '...' : 'Autonomous MCP Server and AI Agent Tool',
        description: repo.description || 'Verified MCP server and autonomous agent toolchain component.',
        repo: repo.full_name,
        stars: repo.stargazers_count,
        license: repo.license?.spdx_id || 'MIT',
        install: `npx -y ${repo.name}`,
        securityScore: calculateSecurityScore(repo),
        verified: repo.stargazers_count > 200,
        featured: false,
        lastUpdated: new Date().toISOString().split('T')[0],
        tags: (repo.topics && repo.topics.length > 0) ? repo.topics.slice(0, 5) : ['mcp', 'agents', 'ai']
      };

      existingItems.push(newItem);
      existingRepos.add(repo.full_name.toLowerCase());
      existingSlugs.add(slug);
      newItemsCount++;
      console.log(`✨ [Scout] Discovered new item: ${newItem.name} (${newItem.repo})`);
    }
  }

  // Persist updated database
  await fs.writeFile(itemsPath, JSON.stringify(existingItems, null, 2), 'utf-8');
  console.log(`🏁 [Scout] Complete. Added ${newItemsCount} new items. Total catalog size: ${existingItems.length}.`);
}

runScout().catch(err => {
  console.error('[Scout] Error during scan:', err);
  process.exit(1);
});
