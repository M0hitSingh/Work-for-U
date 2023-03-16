const  nodemailer = require("nodemailer");
const  { MailOptions } = require("nodemailer/lib/json-transport")

const sendEmail = async (options) => {
    const trasporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "Vavo <no-reply@vavodigital.in>",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await trasporter.sendMail(mailOptions);
};

module.exports = sendEmail;
