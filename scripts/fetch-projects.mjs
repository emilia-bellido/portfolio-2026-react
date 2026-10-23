// Fetches the projects from Airtable ONCE, downloads their images, and saves
// everything into the site itself:
//   - src/data/projects.json   (the project data the site imports)
//   - public/projects/*        (the images, served from your own domain)
//
// Runs automatically before every build (see "build" in package.json), so each
// deploy costs exactly one Airtable API call (one more per 100 records).
//
// Usage:
//   node scripts/fetch-projects.mjs              always fetch fresh data
//   node scripts/fetch-projects.mjs --if-missing skip if projects.json exists (used by `npm run dev`)

import { access, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA_FILE = path.join(root, 'src/data/projects.json');
const IMAGE_DIR = path.join(root, 'public/projects');

// Local development: read AIRTABLE_* from .env.local / .env if present.
// On Vercel the real environment variables are used (they are never overwritten).
if (typeof process.loadEnvFile === 'function') {
  for (const file of ['.env.local', '.env']) {
    try {
      process.loadEnvFile(path.join(root, file));
    } catch {
      // file doesn't exist, that's fine
    }
  }
}

const IMAGE_EXTENSIONS = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/avif': 'avif',
};

async function fetchWithRetry(url, options, attempts = 3) {
  let lastError;
  for (let i = 1; i <= attempts; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      lastError = new Error(`HTTP ${response.status} for ${String(url).split('?')[0]}`);
    } catch (error) {
      lastError = error;
    }
    if (i < attempts) await new Promise((resolve) => setTimeout(resolve, 500 * i));
  }
  throw lastError;
}

async function fetchRecords(baseId, pat) {
  const records = [];
  let offset;
  do {
    const url = new URL(`https://api.airtable.com/v0/${baseId}/Projects`);
    if (offset) url.searchParams.set('offset', offset);

    const response = await fetch(url, { headers: { Authorization: `Bearer ${pat}` } });
    if (!response.ok) {
      throw new Error(`Airtable rejected the request (HTTP ${response.status}): ${await response.text()}`);
    }
    const data = await response.json();
    records.push(...data.records);
    offset = data.offset; // Airtable sends this only when there are more than 100 records
  } while (offset);
  return records;
}

// Animated GIFs and SVGs would lose their behaviour as thumbnails, so keep the original.
function pickUrl(attachment, size) {
  if (attachment.type === 'image/gif' || attachment.type === 'image/svg+xml') return attachment.url;
  return attachment.thumbnails?.[size]?.url ?? attachment.url;
}

let imageCount = 0;

async function saveImage(attachment, size) {
  const response = await fetchWithRetry(pickUrl(attachment, size));
  const contentType = (response.headers.get('content-type') || '').split(';')[0].trim();
  const extension =
    IMAGE_EXTENSIONS[contentType] ||
    path.extname(attachment.filename || '').slice(1).toLowerCase() ||
    'jpg';
  const fileName = `${attachment.id}-${size}.${extension}`;

  await writeFile(path.join(IMAGE_DIR, fileName), Buffer.from(await response.arrayBuffer()));
  imageCount += 1;
  return `/projects/${fileName}`;
}

// Runs fn over items with at most `limit` running at once, keeping the original order.
async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  if (process.argv.includes('--if-missing')) {
    try {
      await access(DATA_FILE);
      console.log('[projects] src/data/projects.json already exists, skipping the Airtable fetch.');
      return;
    } catch {
      // not there yet, so fetch it below
    }
  }

  const baseId = process.env.AIRTABLE_BASE_ID;
  const pat = process.env.AIRTABLE_PAT;
  if (!baseId || !pat) {
    throw new Error(
      'Missing AIRTABLE_BASE_ID or AIRTABLE_PAT. Set them in Vercel (Settings > Environment Variables) ' +
        'or in a local .env file.'
    );
  }

  const records = await fetchRecords(baseId, pat);

  // Start from a clean folder so images of removed projects don't pile up.
  await rm(IMAGE_DIR, { recursive: true, force: true });
  await mkdir(IMAGE_DIR, { recursive: true });
  await mkdir(path.dirname(DATA_FILE), { recursive: true });

  const featured = records.filter((record) => record.fields['Featured'] === true);

  const projects = await mapLimit(featured, 4, async ({ fields }) => {
    const mainImage = fields['Main Image']?.[0];
    const gallery = await mapLimit(fields['Gallery'] ?? [], 4, async (attachment) => ({
      id: attachment.id,
      url: await saveImage(attachment, 'full'),
    }));

    return {
      id: fields['Project ID'],
      title: fields['Title'],
      image: mainImage ? await saveImage(mainImage, 'large') : undefined,
      category: fields['Category'],
      featured: fields['Featured'],
      description: fields['Description'],
      goal: fields['Goal'],
      features: fields['Key Features'],
      link: fields['Link'],
      git: fields['Repository'],
      design: fields['Design & Creative Tools'],
      programming: fields['Programming & Scripting'],
      web: fields['Frontend & Web Frameworks'],
      databases: fields['Data & Content Systems'],
      systems: fields['Systems, Hardware & Version Control'],
      gallery,
    };
  });

  await writeFile(DATA_FILE, JSON.stringify(projects, null, 2));
  console.log(
    `[projects] Saved ${projects.length} featured projects (of ${records.length} records) and ${imageCount} images.`
  );
}

main().catch((error) => {
  console.error(`[projects] ${error.message}`);
  process.exit(1);
});
