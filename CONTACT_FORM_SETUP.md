# Contact Form Setup Guide

## Overview
The contact form has been configured to:
1. ✅ Validate form inputs (name, email, message required)
2. ✅ Send emails to hannahakanni7@gmail.com
3. ✅ Display error messages for invalid inputs
4. ✅ Show loading state while sending
5. ✅ Send confirmation email to the sender
6. ✅ Hero image and CV preview are fully functional

## Email Configuration

### Prerequisites
You need a Gmail account or another email service. This guide uses Gmail.

### Step 1: Generate Gmail App Password
1. Go to your Google Account: https://myaccount.google.com
2. Click "Security" in the left menu
3. Enable "2-Step Verification" if not already enabled
4. Scroll to "App passwords" (appears only if 2FA is on)
5. Select "Mail" and "Windows Computer"
6. Google will generate a 16-character password
7. Copy this password (save it safely)

### Step 2: Create `.env.local` file
In the root directory of the project, create a `.env.local` file:

```env
GMAIL_EMAIL=your-email@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

Replace:
- `your-email@gmail.com` with your Gmail address
- `xxxx xxxx xxxx xxxx` with the 16-character app password from step 1

### Step 3: Test the Setup
1. Run the development server: `npm run dev`
2. Navigate to the contact page: http://localhost:5173/contact
3. Fill out the form and submit
4. You should receive two emails:
   - One to hannahakanni7@gmail.com with the message
   - One to the sender's email address (confirmation)

## API Endpoint

**Route:** `/api/contact`
**Method:** POST
**Content-Type:** application/json

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Mobile App Development",
  "message": "I need help building a mobile app..."
}
```

### Response
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

## Form Validation

The contact form validates:
- **Name**: Required, non-empty
- **Email**: Required, valid email format (user@domain.com)
- **Message**: Required, non-empty
- **Subject**: Optional

## Features

### Client-Side
- Real-time validation with error messages
- Loading state on submit button
- Toast notifications for success/error
- Form reset after successful submission
- Disabled button during submission

### Server-Side
- Request validation
- Email validation using regex
- HTML email formatting
- Security: XSS protection via HTML escaping
- Dual email sending (to Hannah and to the sender)

## Hero Image & CV Preview

Both are already configured and working:
- **Hero Image**: Located at `src/assets/akanni-portrait.jpg`
- **CV PDF**: Located at `src/assets/cv.pdf`
- **CV Button**: Available in the navigation and footer
- Both use asset URLs served from the CDN

## Troubleshooting

### Emails not sending?
1. Check `.env.local` has correct email and app password
2. Ensure 2FA is enabled on Gmail account
3. Verify you're using an app-specific password (not your regular password)
4. Check the terminal for error messages

### Environment variables not loading?
1. Restart the development server after creating `.env.local`
2. Ensure the file is in the project root directory
3. Use `console.log(process.env.GMAIL_EMAIL)` in the API route to debug

### Form validation issues?
1. Check browser console for errors
2. Ensure all required fields are filled
3. Email must be in format: user@domain.com

## Alternative Email Services

If you prefer not to use Gmail, you can modify `src/routes/api/contact.ts`:

### Using SendGrid
```typescript
import SendGrid from "@sendgrid/mail";

SendGrid.setApiKey(process.env.SENDGRID_API_KEY!);

await SendGrid.send({
  to: "hannahakanni7@gmail.com",
  from: process.env.SENDGRID_FROM_EMAIL!,
  subject: `New Contact Form: ${body.subject}`,
  html: emailHtml,
});
```

### Using Resend (Recommended for modern stacks)
```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "onboarding@resend.dev",
  to: "hannahakanni7@gmail.com",
  subject: `New Contact Form: ${body.subject}`,
  html: emailHtml,
});
```

## Security Notes

- All HTML is escaped to prevent XSS attacks
- Email addresses are validated before sending
- Required fields are validated both client and server-side
- Consider adding rate limiting to prevent spam
- Never commit `.env.local` to version control (already in .gitignore)
