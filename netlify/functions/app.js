import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const buildUrl = (event) => {
  if (event.rawUrl) {
    return event.rawUrl;
  }

  const protocol = event.headers["x-forwarded-proto"] || "https";
  const host = event.headers.host || "localhost";
  const query = event.rawQuery || new URLSearchParams(event.queryStringParameters || {}).toString();

  return `${protocol}://${host}${event.path}${query ? `?${query}` : ""}`;
};

const getBody = (event) => {
  if (!event.body) return null;
  return event.isBase64Encoded ? Buffer.from(event.body, "base64") : event.body;
};

export const handler = async (event, context) => {
  const server = await import(new URL("../../dist/server/server.js", import.meta.url));

  const request = new Request(buildUrl(event), {
    method: event.httpMethod,
    headers: new Headers(event.headers),
    body: getBody(event),
  });

  const response = await server.default.fetch(request, process.env, { event, context });
  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    statusCode: response.status,
    headers,
    body: await response.text(),
    isBase64Encoded: false,
  };
};
