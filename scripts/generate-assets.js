import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

async function generateAssets() {
  console.log('📦 [Asset Engine] Generating downloadable monetization assets...');
  
  const itemsRaw = await fs.readFile(path.join(ROOT_DIR, 'data', 'items.json'), 'utf-8');
  const items = JSON.parse(itemsRaw);
  const categoriesRaw = await fs.readFile(path.join(ROOT_DIR, 'data', 'categories.json'), 'utf-8');
  const categories = JSON.parse(categoriesRaw);

  const assetsDir = path.join(ROOT_DIR, 'dist', 'assets');
  await fs.mkdir(assetsDir, { recursive: true });

  // 1. Generate Enterprise JSON Atlas
  const atlas = {
    title: "AgentStack Enterprise MCP & Toolchain Atlas",
    version: "2026.Q4",
    generatedAt: new Date().toISOString(),
    totalItems: items.length,
    license: "Commercial License for Purchaser",
    categories,
    items
  };
  await fs.writeFile(
    path.join(assetsDir, 'AgentStack-Enterprise-MCP-Atlas.json'),
    JSON.stringify(atlas, null, 2),
    'utf-8'
  );
  console.log('✅ Generated AgentStack-Enterprise-MCP-Atlas.json');

  // 2. Generate CSV Export
  const csvHeaders = ['Slug', 'Name', 'Category', 'Stars', 'SecurityScore', 'License', 'Repo', 'InstallCommand'];
  const csvRows = items.map(item => [
    `"${item.slug}"`,
    `"${item.name.replace(/"/g, '""')}"`,
    `"${item.category}"`,
    item.stars,
    `"${item.securityScore}"`,
    `"${item.license}"`,
    `"https://github.com/${item.repo}"`,
    `"${item.install.replace(/"/g, '""')}"`
  ]);
  const csvContent = [csvHeaders.join(','), ...csvRows.map(r => r.join(','))].join('\n');
  await fs.writeFile(path.join(assetsDir, 'AgentStack-Catalog.csv'), csvContent, 'utf-8');
  console.log('✅ Generated AgentStack-Catalog.csv');

  // 3. Generate Enterprise Architecture Guide (Handbook)
  const handbook = `# AgentStack Enterprise MCP Architecture Guide & Security Checklist
*Edition: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} | Production-Grade Standard*

## 1. Executive Summary
The Model Context Protocol (MCP) standardizes how autonomous LLM agents interface with enterprise databases, APIs, code repositories, and local development environments over JSON-RPC 2.0. This guide provides hardening checklists, sandboxing protocols, and zero-trust guidelines for deploying MCP servers in production.

## 2. Zero-Trust Security Protocol for MCP
1. **Directory Boundary Isolation**:
   - Ensure the Filesystem server is launched strictly with relative canonical paths (never root \`/\`).
   - Run servers within unprivileged container namespaces or lightweight microVMs.
2. **Credential Sanitization & Secret Masking**:
   - Never allow MCP tools to emit raw environment variables (\`process.env\`).
   - Use the \`mcp-server-guardrails\` proxy to sanitize regex-matched API keys, JWTs, and AWS tokens.
3. **Database Parameterization**:
   - Read-only replicas must be enforced at the connection-string level (\`default_transaction_read_only = on\`).
   - Disallow multi-statement execution and raw DDL execution in LLM-directed sessions.

## 3. High-Velocity Server Registry Overview
Total verified components cataloged: ${items.length}

${items.map(item => `### ${item.name} (${item.securityScore} Security Rating)
- **Category**: ${item.category}
- **Stars**: ${item.stars.toLocaleString()} | **License**: ${item.license}
- **Installation**: \`${item.install}\`
- **Security Posture**: ${item.description}
`).join('\n')}

---
*Distributed exclusively by AgentStack Radar. Auto-updated via Google Antigravity autonomous daemon.*
`;

  await fs.writeFile(path.join(assetsDir, 'Enterprise-MCP-Handbook.md'), handbook, 'utf-8');
  console.log('✅ Generated Enterprise-MCP-Handbook.md');
}

generateAssets().catch(err => {
  console.error('[Asset Engine] Error:', err);
  process.exit(1);
});
