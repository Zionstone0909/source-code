import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import dotenv from "dotenv";

dotenv.config();

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

async function createContactResponse(status: number, message: string) {
  return new Response(JSON.stringify({ message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function handleApiContactRequest(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return createContactResponse(405, "Method Not Allowed");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createContactResponse(400, "Invalid JSON body");
  }

  if (!body || typeof body !== "object") {
    return createContactResponse(400, "Invalid request payload");
  }

  const { name, email, subject, message } = body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim()) {
    return createContactResponse(400, "Name is required");
  }
  if (typeof email !== "string" || !email.trim()) {
    return createContactResponse(400, "Email is required");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return createContactResponse(400, "Invalid email format");
  }
  if (typeof message !== "string" || !message.trim()) {
    return createContactResponse(400, "Message is required");
  }

  const gmail = process.env.GMAIL_EMAIL;
  const gmailPassword = process.env.GMAIL_PASSWORD;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpEmail = process.env.SMTP_EMAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;

  // Detect common placeholder values so we don't attempt to connect to them.
  const looksLikePlaceholder = (v?: string) => {
    if (!v) return true;
    const s = v.toLowerCase();
    return (
      s.includes("example") ||
      s.includes("your-email") ||
      s.includes("your-password") ||
      s.includes("xxxx") ||
      s === "smtp.example.com" ||
      s === "your-email@gmail.com"
    );
  };

  const hasGmailCreds = !!gmail && !!gmailPassword && !looksLikePlaceholder(gmail) && !looksLikePlaceholder(gmailPassword);
  const hasSmtpCreds = !!smtpHost && !!smtpEmail && !!smtpPassword && !looksLikePlaceholder(smtpHost) && !looksLikePlaceholder(smtpEmail) && !looksLikePlaceholder(smtpPassword);

  if (!hasGmailCreds && !hasSmtpCreds) {
    console.error("Contact API: Email credentials are not configured or are placeholders. Set real GMAIL_EMAIL/GMAIL_PASSWORD or SMTP_HOST/SMTP_EMAIL/SMTP_PASSWORD.");
    return createContactResponse(500, "Email service is not configured. Please add real credentials to .env.local.");
  }

  const nodemailer = await import("nodemailer");

  const transporter = hasGmailCreds
    ? nodemailer.default.createTransport({
        service: "gmail",
        auth: {
          user: gmail,
          pass: gmailPassword,
        },
      })
    : nodemailer.default.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpEmail,
          pass: smtpPassword,
        },
      });

  // Choose a sensible `from` address depending on configured transport.
  const fromEmail = smtpEmail || gmail;

  const escapeHtml = (text: string) =>
    text.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    }[char] ?? char));

  const mailToHannah = {
    from: fromEmail,
    to: "hannahakanni7@gmail.com",
    replyTo: typeof email === "string" ? email : undefined,
    subject: `New Contact Form Submission: ${typeof subject === "string" && subject.trim() ? escapeHtml(subject) : "No subject"}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${escapeHtml(name as string)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email as string)}">${escapeHtml(email as string)}</a></p>
          <p><strong>Project Type:</strong> ${escapeHtml(typeof subject === "string" && subject.trim() ? subject : "Not specified")}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px;">${escapeHtml(message as string)}</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">Submitted from your portfolio website contact form.</p>
      </div>
    `,
  };

  const mailToSender = {
    from: fromEmail,
    to: email as string,
    subject: "Thanks for reaching out! — Akanni Hannah",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thanks ${escapeHtml(name as string)}!</h2>
        <p>I received your message and will get back to you within 24 hours.</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Your message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message as string)}</p>
        </div>
        <p style="color: #666;">In the meantime, feel free to connect on <a href="https://github.com/Zionstone0909">GitHub</a> or call +234 903 0585 841.</p>
        <p>Best regards,<br />Akanni Hannah</p>
      </div>
    `,
  };

  try {
    await Promise.all([transporter.sendMail(mailToHannah), transporter.sendMail(mailToSender)]);
    return new Response(JSON.stringify({ success: true, message: "Message sent successfully!" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("Contact API: failed to send email", err);
    const message = err instanceof Error ? err.message : "Failed to send message. Please try again later.";
    return createContactResponse(500, message);
  }
}

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/contact" || url.pathname === "/api/contact/") {
        return await handleApiContactRequest(request);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
