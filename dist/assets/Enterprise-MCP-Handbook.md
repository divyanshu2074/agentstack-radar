# AgentStack Enterprise MCP Architecture Guide & Security Checklist
*Edition: November 2026 | Production-Grade Standard*

## 1. Executive Summary
The Model Context Protocol (MCP) standardizes how autonomous LLM agents interface with enterprise databases, APIs, code repositories, and local development environments over JSON-RPC 2.0. This guide provides hardening checklists, sandboxing protocols, and zero-trust guidelines for deploying MCP servers in production.

## 2. Zero-Trust Security Protocol for MCP
1. **Directory Boundary Isolation**:
   - Ensure the Filesystem server is launched strictly with relative canonical paths (never root `/`).
   - Run servers within unprivileged container namespaces or lightweight microVMs.
2. **Credential Sanitization & Secret Masking**:
   - Never allow MCP tools to emit raw environment variables (`process.env`).
   - Use the `mcp-server-guardrails` proxy to sanitize regex-matched API keys, JWTs, and AWS tokens.
3. **Database Parameterization**:
   - Read-only replicas must be enforced at the connection-string level (`default_transaction_read_only = on`).
   - Disallow multi-statement execution and raw DDL execution in LLM-directed sessions.

## 3. High-Velocity Server Registry Overview
Total verified components cataloged: 34

### Local Filesystem MCP Server (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 12,850 | **License**: MIT
- **Installation**: `npx -y @modelcontextprotocol/server-filesystem <allowed-directory>`
- **Security Posture**: Enables LLM agents to securely inspect, read, and write project files within user-permitted directories. Fully implements sandboxed boundaries to prevent directory traversal attacks.

### GitHub Integration MCP Server (A Security Rating)
- **Category**: dev-tools
- **Stars**: 12,850 | **License**: MIT
- **Installation**: `npx -y @modelcontextprotocol/server-github`
- **Security Posture**: Provides full read/write capabilities for GitHub repositories, including search, branching, PR review submission, commit generation, and automated issue triage.

### PostgreSQL Schema & Query Engine (A+ Security Rating)
- **Category**: databases
- **Stars**: 12,850 | **License**: MIT
- **Installation**: `npx -y @modelcontextprotocol/server-postgres <postgresql://user:pass@host:port/db>`
- **Security Posture**: Allows AI agents to introspect database tables, extract foreign key relationships, generate execution plans, and execute parameterized queries with safe read-only guardrails.

### Brave Web & Local Search (A Security Rating)
- **Category**: web-search
- **Stars**: 12,850 | **License**: MIT
- **Installation**: `npx -y @modelcontextprotocol/server-brave-search`
- **Security Posture**: Powers real-time agent web search with zero ad tracking, returning structured snippets, full page previews, and fresh indexed results from Brave's independent search index.

### Headless Browser Automation (Puppeteer) (B+ Security Rating)
- **Category**: web-search
- **Stars**: 12,850 | **License**: Apache-2.0
- **Installation**: `npx -y @modelcontextprotocol/server-puppeteer`
- **Security Posture**: Provides autonomous web navigation, form filling, PDF generation, and DOM inspection for SPA applications behind dynamic client-side rendering.

### Docker & Container Runtime Controller (A Security Rating)
- **Category**: cloud-infra
- **Stars**: 4,920 | **License**: Apache-2.0
- **Installation**: `docker run -i --rm -v /var/run/docker.sock:/var/run/docker.sock mcp/docker`
- **Security Posture**: Allows AI agents to spin up ephemeral microservices, monitor container stdout/stderr in real-time, execute commands within isolated environments, and prune stale images.

### Slack Autonomous Operations (A- Security Rating)
- **Category**: enterprise-saas
- **Stars**: 12,850 | **License**: MIT
- **Installation**: `npx -y @modelcontextprotocol/server-slack`
- **Security Posture**: Enables multi-agent systems to broadcast critical incident updates, listen to user inquiries, schedule team summaries, and manage reactions in workplace Slack channels.

### Agent Guardrails & Secret Redactor (A+ Security Rating)
- **Category**: security-audit
- **Stars**: 3,410 | **License**: Apache-2.0
- **Installation**: `pip install mcp-guardrails && mcp-guardrails run`
- **Security Posture**: A high-performance security proxy that intercepts agent tool calls to sanitize outbound credentials, filter sensitive customer PII, and block malicious injection sequences.

### Rea (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 412,087 | **License**: MIT
- **Installation**: `npx -y rea`
- **Security Posture**: Reverse engineer anything with agents, from app behavior down to native binaries.

### Nanobot (A+ Security Rating)
- **Category**: web-search
- **Stars**: 49,702 | **License**: MIT
- **Installation**: `npx -y nanobot`
- **Security Posture**: Ultra-lightweight, open-source, self-hosted personal AI agent framework in Python with WebUI, tools, memory, MCP, multi-agent workflows, automation, and chat apps

### Codebase Memory Mcp (A+ Security Rating)
- **Category**: databases
- **Stars**: 47,906 | **License**: MIT
- **Installation**: `npx -y codebase-memory-mcp`
- **Security Posture**: Local code intelligence for developers and AI agents. Connect code, docs and infrastructure in a persistent graph, with CBM Lens, MCP tools, agent integrations and change-aware test selection.

### Mcp For Blender (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 32,914 | **License**: MIT
- **Installation**: `npx -y mcp-for-blender`
- **Security Posture**: Community plugin to control Blender 3D with any LLM of your choice. Not affiliated with the official Blender Foundation.

### Fastmcp (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 28,251 | **License**: Apache-2.0
- **Installation**: `npx -y fastmcp`
- **Security Posture**: 🚀 The fast, Pythonic way to build MCP servers and clients.

### Editor (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 25,249 | **License**: MIT
- **Installation**: `npx -y editor`
- **Security Posture**: Open-source 3D architectural editor with a local CLI, MCP tools, and practical workflows for humans and AI agents.

### Douyin TikTok Download API (A+ Security Rating)
- **Category**: databases
- **Stars**: 21,030 | **License**: Apache-2.0
- **Installation**: `npx -y Douyin_TikTok_Download_API`
- **Security Posture**: 🚀 自托管的抖音、TikTok、B 站数据采集与无水印视频下载 API，支持 AI agent 通过 MCP 调用与离线语音转文字，Docker 一键部署。| Self-hosted TikTok, Douyin & Bilibili scraper and no-watermark video downloader — async REST API, MCP server for AI agents, CLI and web console, plus offline speech-to-text for downloaded videos. Self-healing identity pool, PostgreSQL archive, one docker compose up.

### Xerj (A+ Security Rating)
- **Category**: databases
- **Stars**: 17,932 | **License**: Apache-2.0
- **Installation**: `npx -y xerj`
- **Security Posture**: AI search engine and MCP server for bots and agents. One Rust binary indexes code, docs, logs, JSONL/CSV and PDFs for BM25 full-text, vector and hybrid search, code search without grep, agent memory and RAG. Elasticsearch-compatible API; Corpus Hub serves hundreds of reference memory corpora.

### Mcp For Beginners (A+ Security Rating)
- **Category**: security-audit
- **Stars**: 17,573 | **License**: MIT
- **Installation**: `npx -y mcp-for-beginners`
- **Security Posture**: This open-source curriculum introduces the fundamentals of Model Context Protocol (MCP) through real-world, cross-language examples in .NET, Java, TypeScript, JavaScript, Rust and Python. Designed for developers, it focuses on practical techniques for building modular, scalable, and secure AI workflows from session setup to service orchestration.

### Unity Mcp (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 15,593 | **License**: MIT
- **Installation**: `npx -y unity-mcp`
- **Security Posture**: Unity MCP acts as a bridge between AI assistants and your Unity Editor. Give your LLM tools to manage assets, control scenes, edit scripts, and automate tasks within Unity.

### N8n (A+ Security Rating)
- **Category**: cloud-infra
- **Stars**: 209,208 | **License**: NOASSERTION
- **Installation**: `npx -y n8n`
- **Security Posture**: Fair-code workflow automation platform with native AI capabilities. Combine visual building with custom code, self-host or cloud, 400+ integrations.

### Gemini Cli (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 108,654 | **License**: Apache-2.0
- **Installation**: `npx -y gemini-cli`
- **Security Posture**: An open-source AI agent that brings the power of Gemini directly into your terminal.

### Scrapling (A+ Security Rating)
- **Category**: web-search
- **Stars**: 90,848 | **License**: BSD-3-Clause
- **Installation**: `npx -y Scrapling`
- **Security Posture**: 🕷️ The BEST Web Scraping framework that handles everything from a single request to a full-scale crawl! Don't be shy, join here: https://discord.gg/EMgGbDceNQ and follow here for daily tips and tricks: https://x.com/Scrapling_dev

### Worldmonitor (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 89,860 | **License**: AGPL-3.0
- **Installation**: `npx -y worldmonitor`
- **Security Posture**: Real-time global intelligence dashboard. AI-powered news aggregation, geopolitical monitoring, and infrastructure tracking in a unified situational awareness interface

### Ruflo (A+ Security Rating)
- **Category**: databases
- **Stars**: 80,415 | **License**: MIT
- **Installation**: `npx -y ruflo`
- **Security Posture**: 🌊 The original agent harness. Deploy intelligent multi-player swarms, coordinate autonomous workflows, and build conversational AI systems. Features adaptive memory, self-learning intelligence, federation, vector RAG integration, and native Claude Code / Codex / Hermes and many more Integrated

### Context7 (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 64,024 | **License**: MIT
- **Installation**: `npx -y context7`
- **Security Posture**: Context7 Platform -- Up-to-date docs for AI agents

### TrendRadar (A+ Security Rating)
- **Category**: cloud-infra
- **Stars**: 63,331 | **License**: GPL-3.0
- **Installation**: `npx -y TrendRadar`
- **Security Posture**: ⭐AI-driven public opinion & trend monitor with multi-platform aggregation, RSS, and smart alerts.🎯 告别信息过载，你的 AI 舆情监控助手与热点筛选工具！聚合多平台热点 +  RSS 订阅，支持关键词精准筛选。AI 智能筛选新闻 + AI 翻译 +  AI 分析简报直推手机，也支持接入 MCP 架构，赋能 AI 自然语言对话分析、情感洞察与趋势预测等。支持 Docker ，数据本地/云端自持。集成微信/飞书/钉钉/Telegram/邮件/ntfy/bark/slack 等渠道智能推送。

### Chrome Devtools Mcp (A+ Security Rating)
- **Category**: web-search
- **Stars**: 54,561 | **License**: Apache-2.0
- **Installation**: `npx -y chrome-devtools-mcp`
- **Security Posture**: Chrome DevTools for coding agents

### Reactive Resume (A+ Security Rating)
- **Category**: security-audit
- **Stars**: 45,127 | **License**: MIT
- **Installation**: `npx -y reactive-resume`
- **Security Posture**: A one-of-a-kind resume builder that keeps your privacy in mind. Completely secure, customizable, portable, open-source and free forever. Try it out today!

### Mcp (A+ Security Rating)
- **Category**: cloud-infra
- **Stars**: 9,853 | **License**: Apache-2.0
- **Installation**: `npx -y mcp`
- **Security Posture**: Open source MCP Servers for AWS

### Awesome Mcp Servers (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 97,132 | **License**: MIT
- **Installation**: `npx -y awesome-mcp-servers`
- **Security Posture**: A collection of MCP servers.

### Github Mcp Server (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 34,126 | **License**: MIT
- **Installation**: `npx -y github-mcp-server`
- **Security Posture**: GitHub's official MCP Server

### Playwright Mcp (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 38,910 | **License**: Apache-2.0
- **Installation**: `npx -y playwright-mcp`
- **Security Posture**: Playwright MCP server

### Whatsapp Mcp (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 6,781 | **License**: MIT
- **Installation**: `npx -y whatsapp-mcp`
- **Security Posture**: WhatsApp MCP server

### GhidraMCP (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 11,676 | **License**: Apache-2.0
- **Installation**: `npx -y GhidraMCP`
- **Security Posture**: MCP Server for Ghidra

### Concat (A+ Security Rating)
- **Category**: dev-tools
- **Stars**: 13,188 | **License**: AGPL-3.0
- **Installation**: `npx -y Concat`
- **Security Posture**: The truly free, open-source, local-first, cross-platform CapCut replacement. Scriptable through a JSON-RPC API & MCP.


---
*Distributed exclusively by AgentStack Radar. Auto-updated via Google Antigravity autonomous daemon.*
