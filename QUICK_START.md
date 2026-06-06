# Quick Start: Email Configuration

## What's Been Set Up

✅ Contact form with full validation (name, email, message required)
✅ API endpoint at `/api/contact` to handle submissions
✅ Emails sent to hannahakanni7@gmail.com with full details
✅ Confirmation emails sent back to the sender
✅ Hero image working perfectly
✅ CV preview and download working perfectly
✅ Loading states and error handling
✅ Toast notifications for user feedback

## To Enable Email Sending

### Step 1: Create `.env.local` File
Create a new file named `.env.local` in the project root:

```env
GMAIL_EMAIL=your-email@gmail.com
GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

### Step 2: Get Your App Password
1. Go to Google Account: https://myaccount.google.com
2. Click **Security** (left menu)
3. Enable **2-Step Verification** (if not already on)
4. Go to **App passwords** (appears after 2FA is enabled)
5. Select **Mail** and **Windows Computer**
6. Copy the 16-character password
7. Paste it into `.env.local` as shown above

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Test
1. Go to http://localhost:5173/contact
2. Fill out and submit the form
3. Check that emails arrive at hannahakanni7@gmail.com and the sender's email

## Files Created/Modified

**New Files:**
- `src/routes/api/contact.ts` - API endpoint for form submission
- `.env.example` - Template for environment variables
- `CONTACT_FORM_SETUP.md` - Full setup documentation

**Modified Files:**
- `src/routes/contact.tsx` - Added form validation, loading state, API integration

## What Happens When Form is Submitted

1. Form validates locally (required fields, valid email)
2. If validation passes, POST request sent to `/api/contact`
3. Server validates data again (security)
4. Two emails are sent:
   - **To Hannah:** Full message with sender's email and project details
   - **To Sender:** Confirmation message with thanks
5. Success toast appears to user
6. Form resets for next submission

## Troubleshooting

**Emails not sending?**
- Restart dev server after creating `.env.local`
- Ensure you're using an **app-specific password**, not your Gmail password
- Check 2-Step Verification is enabled on Gmail

**Form won't submit?**
- Check browser console for errors (F12)
- Ensure all required fields are filled (name, email, message)
- Email must be in valid format

**Need help?**
- See `CONTACT_FORM_SETUP.md` for detailed instructions
- Check `.env.example` for environment variable names

---

**Note:** Do NOT commit `.env.local` to Git. It's already in `.gitignore`.
