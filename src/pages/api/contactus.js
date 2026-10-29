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

const adminEmail = (data) => {
  const { email, fullname, subject, message, admin = 'Dhruv' } = data;
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-image: url('https://example.com/admin-bg.jpg');
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
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>New Contact Form Submission</h1>
          <p>Namaste 🙏, ${escapeHtml(admin)}!</p>
          <p>You have received a new contact form submission. Here are the details:</p>
          <p><strong>Name:</strong> ${escapeHtml(fullname)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message)}</p>
          <p></p>
          <p>Please respond to the user at your earliest convenience.</p>
          <p>Best regards,<br>The testFcm.in Team</p>
      </div>
  </body>
  </html>`;
};

const thankyouEmail = (data) => {
  const { fullname } = data;
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Your Feedback!</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-image: url('https://example.com/thank-you-bg.jpg');
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
          <h1>Thank You for Your Feedback!</h1>
          <p>Hi ${escapeHtml(fullname)},</p>
          <p>Thank you for taking the time to provide us with your feedback and for showing interest in <strong>testFcm.in</strong>. We greatly appreciate your input as it helps us improve and serve you better.</p>
          <p>If you have any further comments or suggestions, please don't hesitate to reach out to us at <a href="mailto:hello@testfcm.in">hello@testfcm.in</a>. We're always here to help and listen.</p>
          <p>Warm regards,<br>TestFCM Team</p>
      </div>
  </body>
  </html>
  `;
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  if (!isWithinRateLimit(req, 'contactus', 10, 60 * 60 * 1000)) {
    return res.status(429).json({ message: 'Too many submissions. Please try again later.' });
  }
  const { email, fullname, subject, message } = req.body || {};
  if (!isValidEmail(email) || !isNonEmptyString(fullname, 100) || !isNonEmptyString(subject, 200) || !isNonEmptyString(message, 5000)) {
    return res.status(400).json({ message: 'Please provide a valid name, email, subject and message.' });
  }
  const data = { email: email.trim(), fullname: fullname.trim(), subject: subject.trim(), message: message.trim() };
  try {
    await mailTransport.sendMail({
      from: 'TestFCM <hello@testfcm.in>',
      replyTo: data.email,
      to: 'TestFCM <hello@testfcm.in>',
      subject: `Form Submission from ${data.fullname}`,
      text: data.message,
      html: adminEmail(data),
    });
    await mailTransport.sendMail({
      from: 'TestFCM <hello@testfcm.in>',
      replyTo: 'hello@testfcm.in',
      to: data.email,
      subject: 'Thank You for Your Feedback!',
      text: data.message,
      html: thankyouEmail(data),
    });
    return res.status(200).json({ message: 'Successful' });
  } catch (e) {
    console.error('Contact form send failed:', e?.code || 'mail error');
    return res.status(500).json({ message: 'Could not send your message. Please try again later.' });
  }
};
