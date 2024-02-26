const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
const {voornaam, achternaam, email, phoneNumber, messageBody} = req.body;

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const mailOptions = {
    from: `"${voornaam} ${achternaam}" <${email}>`,
    to: "kiran.veenendaal.phone@gmail.com",
    subject: "Your Subject Here", 
    text: `${messageBody}`,
    html: `<p>${messageBody}</p>`
}

try {
    await transporter.sendMail(mailOptions);
    console.log("email sent sucsessfully");
    res.send('Email sent successfully');
} catch(error){
    console.error(error);
}

});

app.listen(port, () => {
    console.log('Server running on port ${port}')
})