import { createTransport } from "nodemailer-browser";

const transporter = createTransport({
  host: "smtp.example.com",
  port: 465,
  secure: true,
  auth: {
    user: "your_email@example.com",
    pass: "your_password",
  },
});

const sendEmail = async (recipient, subject, message) => {
  try {
    const info = await transporter.sendMail({
      from: "your_email@example.com",
      to: recipient,
      subject: subject,
      html: `<p>${message}</p>`,
    });
    console.log("Email sent: ", info);
    // Handle success, if needed
  } catch (error) {
    console.error("Error sending email: ", error);
    // Handle error
  }
};

export default sendEmail;
