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


app.post('/send-email', async (req, res) => {
    let token = req.body.token;
    // Vul hier je secret key in van Google reCAPTCHA, check dat je dit op een veilige (security) manier doet.
    let secret = process.env.KEY_SECRET_RECAPTCHA;
    // Verstuur de gegevens naar de Google Api

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    try {
        const { voornaam, achternaam, email, phoneNumber, subject, messageBody } = req.body;
        debugger;
        if(subject && subject.length > 200) {
            res.send("Onderwerp is langer dan 200 karakters");
            console.log("Onderwerpt moet minder dan 200 karakters bevatten");
            return;
        } else if (messageBody && messageBody.length > 600) {
            res.send("Bericht is langer dan 600 karakters");
            console.log("Uw bericht mag niet langer 600 karakters zijn");
            return;
        } else if (email && !(emailRegex.test(email))){
            res.send("Email is niet geldig");
            console.log("Zorg dat dit een vailde email is");
            return;
        }
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
            subject: `${subject}`,
            text: `${messageBody} send response to: ${email}`,
            html: `<p>${messageBody}</p> <br> <p>send response to: ${email} or call: ${phoneNumber}</p>`
        }

        try {
            await transporter.sendMail(mailOptions);
            console.log("email sent sucsessfully for: ", email);
            res.send('Email sent successfully');
        } catch (error) {
            console.error(error);
            res.send("Mail wasn't sent successfully due to error!")
        }

    }
    catch (e) {
        console.log(e);
    }

});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})