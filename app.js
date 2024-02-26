const nodeMailer = require('nodemailer');
require('dotenv').config()
console.log(process.env)

const transporter = nodeMailer.createTransport(
    {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    }
);

const mailOptions = {
    from: {
        name: 'Kiran Kok',
        address: "showcase.response@gmail.com"
    }, 
    to: "kiran.veenendaal.phone@gmail.com",
    subject: "onderwerp",
    text: "Hello world?!",
    html: "<p>Hello world?</p>"
}

const sendMail = async (transporter, mailOptions) => {
    try{
        await transporter.sendMail(mailOptions);
        console.log('email has been sent')
    } catch(error) {
        console.error(error);
    }
}

sendMail(transporter, mailOptions);