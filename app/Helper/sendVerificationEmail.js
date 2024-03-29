import nodemailer from "nodemailer";

const sendVerificationEmail = async (
  userEmail,
  firstName,
  activation_token
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajancoding597@gmail.com",
        pass: "funzmtuwnobqjvya", // Use a secure method to store and access passwords
      },
    });

    let info = await transporter.sendMail({
      from: '"Connect" <rajancoding597@gmail.com>',
      to: userEmail,
      subject: "Verify Your Email Address",
      text: `Hello ${firstName},\nPlease verify your email address by clicking on the following link: [Verification Link Here]`,
      html: `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f7f7f7;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #555;
            }
            .button {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              transition: background-color 0.3s;
            }
            .button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Hello ${firstName},</h1>
            <p>Please verify your email address by clicking on the following button:</p>
            <a class="button" href="https://cuddly-umbrella-vwx7q65vx942wg77-3000.app.github.dev/auth/verifyEmail?token='${activation_token}'">Verify Email</a>
          </div>
        </body>
        </html>
        `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error(err); // Log error for debugging
  }
};

export default sendVerificationEmail;
