import { createTransport } from 'nodemailer';

import { escapeHtml, isNonEmptyString, isValidEmail, isWithinRateLimit } from '../../lib/server-utils';
const mailTransport = createTransport({
  service: 'gmail',
  port: 587,
  secure: true,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASS,
  },
});

const welcomeEmail = (data) => {
  console.log('Data', data);
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to testFcm.in</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-image: url('https://images.unsplash.com/photo-1511497584788-876760111969');
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
              padding: 20px;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: rgba(255, 255, 255, 0.9);
              border: 1px solid #ddd;
              border-radius: 10px;
          }
          h1 {
              color: #0056b3;
              text-align: center;
          }
          a {
              color: #0056b3;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Welcome to testFcm.in! 🎉</h1>
          <p>Hi ${escapeHtml(data.fullname)},</p>
          <p>We're thrilled to have you join our community. At <strong>testFcm.in</strong>, we're committed to providing top-notch testing tools and resources.</p>
          <p>Get started by exploring our features and accessing our tutorials and guides. If you need any assistance, our support team is here to help! If you face any issues while using the tool, you can reach us at <a href="mailto:hello@testfcm.in">hello@testfcm.in</a>.</p>
          <p>Warm wishes,<br>The testfcm.in Team</p>
          <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 0.9em; color: #777;">This email was sent to ${escapeHtml(data.fullname)} because you signed up for testFcm.in. If you didn't create an account, please ignore this email or contact us at <a href="mailto:hello@testfcm.in">hello@testfcm.in</a>.</p>
      </div>
  </body>
  </html>`;
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  // NOTE: this endpoint is still not authenticated — it only validates the
  // address. Fully closing it needs Firebase ID-token verification (PR body).
  if (!isWithinRateLimit(req, 'welcome', 10, 60 * 60 * 1000)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }
  const { email, fullname } = req.body || {};
  if (!isValidEmail(email) || !isNonEmptyString(fullname, 100)) {
    return res.status(400).json({ message: 'Please provide a valid name and email.' });
  }
  const data = { email: email.trim(), fullname: fullname.trim() };
  try {
    await mailTransport.sendMail({
      from: 'TestFCM <hello@testfcm.in>',
      to: data.email,
      subject: 'Welcome to testFcm.in! 🎉',
      html: welcomeEmail(data),
    });
    return res.status(200).json({ isEmailSend: true });
  } catch (e) {
    console.error('Welcome email send failed:', e?.code || 'mail error');
    return res.status(500).json({ message: 'Could not send the welcome email. Please try again later.' });
  }
};
