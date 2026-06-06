import nodemailer from "nodemailer";

const escapeHtml = (text) =>
  String(text || "").replace(/[&<>\"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char] || char));

const looksLikePlaceholder = (v) => {
  if (!v) return true;
  const s = String(v).toLowerCase();
  return (
    s.includes("example") ||
    s.includes("your-email") ||
    s.includes("your-password") ||
    s.includes("xxxx") ||
    s === "smtp.example.com" ||
    s === "your-email@gmail.com"
  );
};

const getTransporter = () => {
  const gmail = process.env.GMAIL_EMAIL;
  const gmailPassword = process.env.GMAIL_PASSWORD;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpEmail = process.env.SMTP_EMAIL;
  const smtpPassword = process.env.SMTP_PASSWORD;

  const hasGmailCreds =
    !!gmail &&
    !!gmailPassword &&
    !looksLikePlaceholder(gmail) &&
    !looksLikePlaceholder(gmailPassword);
  const hasSmtpCreds =
    !!smtpHost &&
    !!smtpEmail &&
    !!smtpPassword &&
    !looksLikePlaceholder(smtpHost) &&
    !looksLikePlaceholder(smtpEmail) &&
    !looksLikePlaceholder(smtpPassword);

  if (!hasGmailCreds && !hasSmtpCreds) {
    throw new Error(
      "Email credentials are not configured. Set GMAIL_EMAIL/GMAIL_PASSWORD or SMTP_HOST/SMTP_EMAIL/SMTP_PASSWORD."
    );
  }

  return hasGmailCreds
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmail,
          pass: gmailPassword,
        },
      })
    : nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpEmail,
          pass: smtpPassword,
        },
      });
};

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON body" }),
    };
  }

  const { name, email, subject, message } = body;
  if (!name || typeof name !== "string" || !name.trim()) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Name is required" }),
    };
  }
  if (!email || typeof email !== "string" || !email.trim()) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Email is required" }),
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid email format" }),
    };
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Message is required" }),
    };
  }

  const fromEmail = process.env.SMTP_EMAIL || process.env.GMAIL_EMAIL;
  if (!fromEmail) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Email sender is not configured." }),
    };
  }

  const mailOptions = {
    from: fromEmail,
    to: "hannahakanni7@gmail.com",
    replyTo: email,
    subject: `New Contact Form Submission: ${
      subject && String(subject).trim() ? escapeHtml(subject) : "No subject"
    }`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Project Type:</strong> ${escapeHtml(
            subject && String(subject).trim() ? subject : "Not specified"
          )}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px;">${
            escapeHtml(message)
          }</p>
        </div>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">Submitted from your portfolio website contact form.</p>
      </div>
    `,
  };

  try {
    const transporter = getTransporter();
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Message sent successfully" }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to send message. Please try again later." }),
    };
  }
}
