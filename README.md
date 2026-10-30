# ⚡ AgentStack Radar

> **Autonomous AI Agent & Model Context Protocol (MCP) Intelligence Engine**  
> *Strictly $0 Cost from Day 1 &bull; 100% Autonomous Operation via Google Antigravity*

AgentStack Radar is a self-operating micro-startup and developer intelligence portal. It discovers newly released Model Context Protocol (MCP) servers, benchmarks their velocity, audits their security posture, and pre-renders an ultra-fast static directory and weekly brief.

---

## 💎 Zero-Cost Business & Monetization Architecture

| Monetization Stream | Implementation | Upfront Cost | Payout Channel |
| :--- | :--- | :--- | :--- |
| **Enterprise MCP Atlas & Handbook** | Automated JSON / CSV export + Markdown Architecture Handbook packaged in `/dist/assets/` | **$0.00** | Gumroad / Lemon Squeezy ($9 instant digital purchase; 10% fee only when a sale is completed). |
| **Featured Tool Placement** | Promoted sponsor card on the directory home and item pages | **$0.00** | Direct checkout link ($29/month recurring). |
| **Weekly Intelligence Briefing** | Curated high-velocity tool analysis | **$0.00** | Substack Free Publication (0 cost up to thousands of subscribers). |

---

## 🛠️ Infrastructure ($0 Overhead)

- **Compute & Automation**: Local Google Antigravity Agent Daemon (`scripts/cron-runner.js`) + Gemini API Free Tier.
- **Database**: Flat-file JSON (`data/items.json`, `data/categories.json`) version-controlled directly in Git.
- **Hosting & CDN**: GitHub Pages or Cloudflare Pages (Free global edge CDN, unlimited bandwidth, free SSL).
- **Static Site Engine**: Custom zero-dependency Node static site generator compiling in < 400ms.

---

## 🚀 Running the Pipeline

### 1. Run Schema Validation
```bash
npm test
```

### 2. Run Discovery Scout
```bash
npm run scout
```

### 3. Generate Downloadable Digital Products
```bash
npm run assets
```

### 4. Build Static Site
```bash
npm run build
```

### 5. Full Autonomous Cycle (Antigravity Cron)
```bash
npm run run:daily
```

---

## ⏰ Google Antigravity Continuous Automation

To run AgentStack Radar 100% autonomously in the background without any manual intervention, Antigravity executes `scripts/cron-runner.js` once every 24 hours via its scheduled daemon.

Audit logs and execution history are preserved in `audit.log`.

---

## 📝 5-Minute One-Time Launch Checklist
1. **GitHub Remote**:
   ```bash
   git remote add origin https://github.com/<your-username>/agentstack-radar.git
   git branch -M main
   git push -u origin main
   ```
2. **Enable GitHub Pages**:
   - In your repo settings -> Pages -> Source: select **GitHub Actions**.
   - Your site will be live at `https://<your-username>.github.io/agentstack-radar/`.
3. **Connect Gumroad / Lemon Squeezy**:
   - Create a free product listing on [Gumroad](https://gumroad.com) named "AgentStack Enterprise MCP Atlas" priced at \$9.
   - Replace the `GUMROAD_BUY_URL` constant in `scripts/build.js` with your product URL.
4. **Substack Newsletter**:
   - Create a free publication on [Substack](https://substack.com) and update `SUBSTACK_URL` in `scripts/build.js`.
