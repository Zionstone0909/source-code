import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function handler(req, res) {
  const serverModule = await import(new URL("../dist/server/server.js", import.meta.url));
  const server = serverModule.default;

  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || 'localhost';
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers || {})) {
    if (typeof v === 'string') headers.set(k, v);
    else if (Array.isArray(v)) headers.set(k, v.join(', '));
  }

  const requestInit = {
    method: req.method,
    headers,
    body: (req.method === 'GET' || req.method === 'HEAD') ? null : req,
  };

  const request = new Request(url, requestInit);

  const response = await server.fetch(request, process.env, { req, res });

  res.statusCode = response.status;
  response.headers.forEach((value, key) => {
    // Vercel disallows certain header overrides; skip transfer-encoding
    if (key.toLowerCase() === 'transfer-encoding') return;
    res.setHeader(key, value);
  });

  const body = await response.text();
  res.end(body);
}
