// Mali statički server za Firebase App Hosting (Cloud Run): poslužuje gotov build iz dist/.
// App Hosting nakon `npm run build` pokreće `npm start`, a kontejner mora slušati na $PORT.
// Bez ovisnosti; pravila keširanja ista kao u firebase.json.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./dist', import.meta.url));
const port = Number(process.env.PORT) || 8080;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

async function findFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, '');
  const base = join(root, clean);
  if (base !== root && !base.startsWith(root + sep)) return null;
  // cleanUrls: /zgrade → zgrade.html, / → index.html
  const candidates = extname(base) ? [base] : [base + '.html', join(base, 'index.html')];
  for (const file of candidates) {
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let pathname;
  try {
    pathname = new URL(req.url, 'http://x').pathname;
  } catch {
    res.writeHead(400).end();
    return;
  }
  // trailingSlash: false → /zgrade/ preusmjeri na /zgrade
  if (pathname.length > 1 && pathname.endsWith('/')) {
    res.writeHead(301, { Location: pathname.replace(/\/+$/, '') || '/' }).end();
    return;
  }

  let file = null;
  try {
    file = await findFile(pathname);
  } catch {}
  const status = file ? 200 : 404;
  if (!file) file = await findFile('/404');
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Stranica nije pronađena');
    return;
  }

  const ext = extname(file);
  res.writeHead(status, {
    'Content-Type': types[ext] || 'application/octet-stream',
    'Cache-Control': pathname.startsWith('/_astro/')
      ? 'public, max-age=31536000, immutable'
      : ext === '.html' ? 'public, max-age=300' : 'public, max-age=86400',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });
  if (req.method === 'HEAD') return res.end();
  createReadStream(file).pipe(res);
}).listen(port, '0.0.0.0', () => console.log(`EKP site na portu ${port}`));
