import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const REQUIRED_ITEM_FIELDS = ['slug', 'name', 'category', 'tagline', 'description', 'repo', 'stars', 'license', 'install'];

async function validate() {
  console.log('🔍 Running schema and data integrity validation...');
  
  // 1. Validate categories
  const categoriesRaw = await fs.readFile(path.join(ROOT_DIR, 'data', 'categories.json'), 'utf-8');
  const categories = JSON.parse(categoriesRaw);
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error('categories.json must contain a non-empty array');
  }
  const categoryIds = new Set(categories.map(c => c.id));

  // 2. Validate items
  const itemsRaw = await fs.readFile(path.join(ROOT_DIR, 'data', 'items.json'), 'utf-8');
  const items = JSON.parse(itemsRaw);
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('items.json must contain a non-empty array');
  }

  const slugs = new Set();
  for (const item of items) {
    for (const field of REQUIRED_ITEM_FIELDS) {
      if (item[field] === undefined || item[field] === null || item[field] === '') {
        throw new Error(`Item ${JSON.stringify(item.slug || item.name)} missing required field: ${field}`);
      }
    }
    if (slugs.has(item.slug)) {
      throw new Error(`Duplicate slug detected: ${item.slug}`);
    }
    slugs.add(item.slug);

    if (!categoryIds.has(item.category)) {
      throw new Error(`Item ${item.slug} references unknown category: ${item.category}`);
    }
  }

  console.log(`✅ Validation passed successfully! Verified ${categories.length} categories and ${items.length} items.`);
}

validate().catch(err => {
  console.error('❌ Validation failed:', err.message);
  process.exit(1);
});
