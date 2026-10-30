import { execSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const LOG_PATH = path.join(ROOT_DIR, 'audit.log');

async function logAudit(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  console.log(line.trim());
  await fs.appendFile(LOG_PATH, line, 'utf-8');
}

async function runAutonomousCycle() {
  await logAudit('🚀 === Starting Antigravity Autonomous Execution Cycle ===');

  try {
    // 1. Scout Phase
    await logAudit('Phase 1: Discovering new toolchains and updating stars...');
    execSync('node scripts/scout.js', { cwd: ROOT_DIR, stdio: 'inherit' });

    // 2. Validate Schema Phase
    await logAudit('Phase 2: Validating schema and database constraints...');
    execSync('node scripts/validate-schema.js', { cwd: ROOT_DIR, stdio: 'inherit' });

    // 3. Generate Digital Assets Phase
    await logAudit('Phase 3: Compiling downloadable digital assets & Handbook...');
    execSync('node scripts/generate-assets.js', { cwd: ROOT_DIR, stdio: 'inherit' });

    // 4. Build Static Site Phase
    await logAudit('Phase 4: Compiling static distribution for Cloudflare Pages...');
    execSync('node scripts/build.js', { cwd: ROOT_DIR, stdio: 'inherit' });

    // 5. Git Status & Autonomous Commit Phase
    await logAudit('Phase 5: Checking repository changes for automated push...');
    const status = execSync('git status --porcelain', { cwd: ROOT_DIR, encoding: 'utf-8' });

    if (status.trim().length > 0) {
      await logAudit(`Changes detected:\n${status}`);
      execSync('git add .', { cwd: ROOT_DIR });
      const commitMsg = `chore(auto): daily intelligence index sync [${new Date().toISOString().split('T')[0]}]`;
      execSync(`git commit -m "${commitMsg}"`, { cwd: ROOT_DIR });
      await logAudit(`✅ Committed: ${commitMsg}`);

      // Push to remote if origin exists
      try {
        const remotes = execSync('git remote', { cwd: ROOT_DIR, encoding: 'utf-8' });
        if (remotes.includes('origin')) {
          await logAudit('Pushing changes to remote origin on GitHub...');
          execSync('git push origin main', { cwd: ROOT_DIR });
          await logAudit('✅ Pushed cleanly to GitHub. Cloudflare Pages build triggered.');
        } else {
          await logAudit('ℹ️ No git remote "origin" configured yet. Local commit ready.');
        }
      } catch (pushErr) {
        await logAudit(`⚠️ Remote push skipped: ${pushErr.message}`);
      }
    } else {
      await logAudit('ℹ️ No catalog changes detected in this cycle. Catalog is up to date.');
    }

    await logAudit('🏁 === Autonomous Execution Cycle Completed Successfully ===\n');
  } catch (err) {
    await logAudit(`❌ ERROR in autonomous cycle: ${err.message}\n${err.stack}`);
    process.exit(1);
  }
}

runAutonomousCycle();
