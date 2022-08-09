const nodemailer = require("nodemailer");

/**
 * It creates a transporter object using the nodemailer.createTransport() method, and then sends the
 * email using the transporter object's sendMail() method
 * @param email - The email address of the recipient.
 * @param subject - The subject of the email.
 * @param text - The text of the email.
 */
async function sentEmail(email, subject, text) {
  try {
    /* Creating a transporter object using the nodemailer.createTransport() method. */
    const handler = nodemailer.createTransport({
      host: process.env.HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    /* Sending the email. */
    await handler.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email Sent Successfully!");
  } catch (error) {
    console.error("Email Not Sent!");
    console.error(error);
  }
}

/**
 * Sending an email to the user with a link to verify their email address.
 * @param email - The email address of the user.
 * @param password - The one time password of the user.
 * @returns The return value of the send email function.
 */
async function sendVerification(email, password) {
  try {
    const body = `Verify your email address by login using this credentials. \n\nE-mail : ${email} \nPassword : ${password} \n\nLink : http://localhost:3000/`;
    /* Sending an email to the user with a link to verify their email address. */
    return await sentEmail(email, "Email Verification", body);

  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  sentEmail,
  sendVerification,
};
