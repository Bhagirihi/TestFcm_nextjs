import { createTransport } from 'nodemailer';
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
          <p>Namaste 🙏, ${admin}!</p>
          <p>You have received a new contact form submission. Here are the details:</p>
          <p><strong>Name:</strong> ${fullname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
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
          <p>Hi ${fullname},</p>
          <p>Thank you for taking the time to provide us with your feedback and for showing interest in <strong>testFcm.in</strong>. We greatly appreciate your input as it helps us improve and serve you better.</p>
          <p>If you have any further comments or suggestions, please don't hesitate to reach out to us at <a href="mailto:hello@testfcm.in">hello@testfcm.in</a>. We're always here to help and listen.</p>
          <p>Warm regards,<br>TestFCM Team</p>
      </div>
  </body>
  </html>
  `;
};

const sendAdmin = (data) => {
  const { email, fullname, subject, message, admin = 'Dhruv' } = data;
  return `<!doctype html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
     xmlns:o="urn:schemas-microsoft-com:office:office">
     <head>
        <title>
        </title>
        <!--[if !mso]><!-- -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
           #outlook a {
           padding: 0;
           }
           .ReadMsgBody {
           width: 100%;
           }
           .ExternalClass {
           width: 100%;
           }
           .ExternalClass * {
           line-height: 100%;
           }
           body {
           margin: 0;
           padding: 0;
           -webkit-text-size-adjust: 100%;
           -ms-text-size-adjust: 100%;
           }
           table,
           td {
           border-collapse: collapse;
           mso-table-lspace: 0pt;
           mso-table-rspace: 0pt;
           }
           img {
           border: 0;
           height: auto;
           line-height: 100%;
           outline: none;
           text-decoration: none;
           -ms-interpolation-mode: bicubic;
           }
           p {
           display: block;
           margin: 13px 0;
           }
        </style>
        <!--[if !mso]><!-->
        <style type="text/css">
           @media only screen and (max-width:480px) {
           @-ms-viewport {
           width: 320px;
           }
           @viewport {
           width: 320px;
           }
           }
        </style>
        <!--<![endif]-->
        <!--[if mso]>
        <xml>
           <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if lte mso 11]>
        <style type="text/css">
           .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
        <style type="text/css">
           @media only screen and (min-width:480px) {
           .mj-column-per-100 {
           width: 100% !important;
           }
           }
        </style>
        <style type="text/css">
        </style>
     </head>
     <body style="background-color:#f9f9f9;">
        <div style="background-color:#f9f9f9;">
           <!--[if mso | IE]>
           <table
              align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
              <tr>
                 <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <![endif]-->
                    <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
                       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                          <tbody>
                             <tr>
                                <td
                                   style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                </td>
                             </tr>
                          </tbody>
                       </table>
                    </div>
                    <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
                       <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                          style="background:#fff;background-color:#fff;width:100%;">
                          <tbody>
                             <tr>
                                <td
                                   style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                   <div class="mj-column-per-100 outlook-group-fix"
                                      style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                         style="vertical-align:bottom;" width="100%">
                                         <tr>
                                            <td align="center"
                                               style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                               <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                  role="presentation"
                                                  style="border-collapse:collapse;border-spacing:0px;">
                                                  <tbody>
                                                     <tr>
                                                        <td style="width:64px;">
                                                        height="auto" src="https://i.imgur.com/RpXhR2i.png"
                                                              style="border:0;display:block;outline:none;text-decoration:none;width:100%;"
                                                              width="64" />
                                                        </td>
                                                     </tr>
                                                  </tbody>
                                               </table>
                                            </td>
                                         </tr>
                                         <tr>
                                            <td align="center"
                                               style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
                                               <div
                                                  style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                  We have new message
                                               </div>
                                            </td>
                                         </tr>
                                         <tr>
                                            <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                               <div
                                                  style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                  Namaste 🙏, ${admin}!
                                                  <p>We have a new message from <b>${fullname}</b>.</p>
                                                  <p>subject is <b>${subject}.</b></p>
                                                  <p>in Detail message is <b>${message}.</b></p>
                                                  <p>You can connect with user for more on ${email}.</p>
                                            </td>
                                         </tr>
                                         <tr>
                                         <td align="left"
                                            style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
                                            <div
                                               style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:20px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                               Thank You,
                                            </div>
                                         </td>
                                      </tr>
                                         <tr>
                                         <td align="center"
                                            style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">
                                         <table align="center" border="0" cellpadding="0" cellspacing="0"
                                            role="presentation" style="border-collapse:separate;line-height:100%;">
                                         <tr>

                                         </tr>
                                         </table>
                                         </td>
                                         </tr>
                                      </table>
                                      </div>
                                      <!--[if mso | IE]>
                                </td>
                             </tr>
                       </table>
                       <![endif]-->
                 </td>
              </tr>
              </tbody>
           </table>
           </div>
           </td>
           </tr>
           </tbody>
           </table>
           </div>
        </div>
     </body>
  </html>`;
};
const thankyou = (data) => {
  const { fullname } = data;
  return `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
   xmlns:o="urn:schemas-microsoft-com:office:office">
   <head>
      <title>
      </title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
         #outlook a {
         padding: 0;
         }
         .ReadMsgBody {
         width: 100%;
         }
         .ExternalClass {
         width: 100%;
         }
         .ExternalClass * {
         line-height: 100%;
         }
         body {
         margin: 0;
         padding: 0;
         -webkit-text-size-adjust: 100%;
         -ms-text-size-adjust: 100%;
         }
         table,
         td {
         border-collapse: collapse;
         mso-table-lspace: 0pt;
         mso-table-rspace: 0pt;
         }
         img {
         border: 0;
         height: auto;
         line-height: 100%;
         outline: none;
         text-decoration: none;
         -ms-interpolation-mode: bicubic;
         }
         p {
         display: block;
         margin: 13px 0;
         }
      </style>
      <!--[if !mso]><!-->
      <style type="text/css">
         @media only screen and (max-width:480px) {
         @-ms-viewport {
         width: 320px;
         }
         @viewport {
         width: 320px;
         }
         }
      </style>
      <!--<![endif]-->
      <!--[if mso]>
      <xml>
         <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
         </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if lte mso 11]>
      <style type="text/css">
         .outlook-group-fix { width:100% !important; }
      </style>
      <![endif]-->
      <style type="text/css">
         @media only screen and (min-width:480px) {
         .mj-column-per-100 {
         width: 100% !important;
         }
         }
      </style>
      <style type="text/css">
      </style>
   </head>
   <body style="background-color:#f9f9f9;">
      <div style="background-color:#f9f9f9;">
         <!--[if mso | IE]>
         <table
            align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
            >
            <tr>
               <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                  <![endif]-->
                  <div style="background:#f9f9f9;background-color:#f9f9f9;Margin:0px auto;max-width:600px;">
                     <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="background:#f9f9f9;background-color:#f9f9f9;width:100%;">
                        <tbody>
                           <tr>
                              <td
                                 style="border-bottom:#333957 solid 5px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
                  <div style="background:#fff;background-color:#fff;Margin:0px auto;max-width:600px;">
                     <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="background:#fff;background-color:#fff;width:100%;">
                        <tbody>
                           <tr>
                              <td
                                 style="border:#dddddd solid 1px;border-top:0px;direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                                 <div class="mj-column-per-100 outlook-group-fix"
                                    style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:bottom;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                       style="vertical-align:bottom;" width="100%">
                                       <tr>
                                          <td align="center"
                                             style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                             <table align="center" border="0" cellpadding="0" cellspacing="0"
                                                role="presentation"
                                                style="border-collapse:collapse;border-spacing:0px;">
                                                <tbody>
                                                   <tr>
                                                      <td style="width:64px;">
                                                      height="auto" src="https://i.imgur.com/RpXhR2i.png"
                                                            style="border:0;display:block;outline:none;text-decoration:none;width:100%;"
                                                            width="64" />
                                                      </td>
                                                   </tr>
                                                </tbody>
                                             </table>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td align="center"
                                             style="font-size:0px;padding:10px 25px;padding-bottom:40px;word-break:break-word;">
                                             <div
                                                style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:28px;font-weight:bold;line-height:1;text-align:center;color:#555;">
                                                Thank you ${fullname}
                                             </div>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                             <div
                                                style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:22px;text-align:left;color:#555;">
                                                Namaste 🙏, ${fullname}!
                                                <p>Thank you for contacting with
                                                <a style="color:#000; text-decoration: none;"
                                                   href="https://www.testfcm.in/">testfcm.in</a>.We're really happy to have you!</p>
                                                <p>You can Checkout New Coding blogs. Click the link below to read blogs.</p>
                                          </td>
                                       </tr>
                                       <tr>
                                       <td align="center"
                                          style="font-size:0px;padding:10px 25px;padding-top:30px;padding-bottom:50px;word-break:break-word;">
                                       <table align="center" border="0" cellpadding="0" cellspacing="0"
                                          role="presentation" style="border-collapse:separate;line-height:100%;">
                                       <tr>

                                       </tr>
                                       </table>
                                       </td>
                                       </tr>
                                    </table>
                                    </div>
                                    <!--[if mso | IE]>
                              </td>
                           </tr>
                     </table>
                     <![endif]-->
               </td>
            </tr>
            </tbody>
         </table>
         </div>
         </td>
         </tr>
         </tbody>
         </table>
         </div>
      </div>
   </body>
</html>`;
};

export default async (req, res) => {
  const data = req.body;
  if (req.method == 'POST') {
    const adminOptions = {
      from: req.body.email,
      // replyTo: req.body.email,
      to: 'TestFCM <hello@testfcm.in>',
      subject: `Form Submission from ${data.fullname}`,
      text: req.body.message,
      // html: `<p>${req.body.message}</p>`,
      html: adminEmail(req.body),
    };
    const userOptions = {
      from: 'TestFCM <hello@testfcm.in>',
      // replyTo: req.body.email,
      to: req.body.email,
      subject: `Thank You for Your Feedback!`,
      text: req.body.message,
      // html: `<p>${req.body.message}</p>`,
      html: thankyouEmail(req.body),
    };

    await mailTransport
      .sendMail(adminOptions)
      .then(async () => {
        // res.status(200).send({
        //   isEmailSend: true,
        // });
        await mailTransport
          .sendMail(userOptions)
          .then((res) => {
            console.log('New email sent to:', userOptions.to, res);
            res.status(200).send({
              isEmailSend: true,
            });
          })
          .catch((e) => console.log('Error 2 ---', e));
      })
      .catch((e) => console.log('Error 1 ---', e));

    res.status(200).json({ message: 'Successful' });
  } else {
    res.status(304).json({ message: 'Invalid Request' });
  }
};
