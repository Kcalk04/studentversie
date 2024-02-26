const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

// CORS options
const corsOptions = {
    origin: 'http://127.0.0.1:5501', // Allow only http://localhost:3000
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  // Use CORS with options
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.post('/send-email', async (req, res) => {
// const {voornaam, achternaam, email, phoneNumber, messageBody} = req.body;

// const transporter = nodemailer.createTransport({
//     service: 'gmail', 
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// const mailOptions = {
//     from: `"${voornaam} ${achternaam}" ${email}`,
//     to: "kiran.veenendaal.phone@gmail.com",
//     subject: "Your Subject Here", 
//     text: `${messageBody} send response to: ${email}`,
//     html: `<p>${messageBody}</p> <br> <p>send response to: ${email}</p>`
// }

// try {
//     await transporter.sendMail(mailOptions);
//     console.log("email sent sucsessfully");
//     res.send('Email sent successfully');
// } catch(error){
//     console.error(error);
// }

// });

app.post('/send-email', async (req, res) => {
    let token = req.body.token;
    // Vul hier je secret key in van Google reCAPTCHA, check dat je dit op een veilige (security) manier doet.
    let secret = process.env.KEY_SECRET_RECAPTCHA;
    // Verstuur de gegevens naar de Google Api
    try {
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {
            method: "POST",
            body: JSON.stringify({
                secret: secret,
                response: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // De response vanuit Google (meer info: https://developers.google.com/recaptcha/docs/v3#site_verify_response):
        const result = await response.json();
        console.log(result);
        // Stuur het resultaat weer terug naar je client

        if (!result.success) {
            console.error("captcha failed: ", result['error-codes']);
            res.send('Captcha failed');
            return 0;
        }
        const { voornaam, achternaam, email, phoneNumber, messageBody } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"${voornaam} ${achternaam}" ${email}`,
            to: "kiran.veenendaal.phone@gmail.com",
            subject: "Your Subject Here",
            text: `${messageBody} send response to: ${email}`,
            html: `<p>${messageBody}</p> <br> <p>send response to: ${email}</p>`
        }

        try {
            await transporter.sendMail(mailOptions);
            console.log("email sent sucsessfully for: ", email);
            res.send('Email sent successfully');
        } catch (error) {
            console.error(error);
        }

    }
    catch (e) {
        console.log(e);
    }

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})