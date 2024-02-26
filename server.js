const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = 3001;


app.use(bodyParser.urlencoded({extended: true}));
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
    let result;
app.post('/send-email', async (req, res) => {
    token = grecaptcha.getResponse();
    // Vul hier je secret key in van Google reCAPTCHA, check dat je dit op een veilige (security) manier doet.
    let secret ="6LcbzIApAAAAAKAVxqPadqA-db8-edCm2zJ5jilY";
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
        result = await response.json();
       // Stuur het resultaat weer terug naar je client
    }
    catch (e) {
        console.log(e);
    }
    if(result.pass){
        const {voornaam, achternaam, email, phoneNumber, messageBody} = req.body;

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
        console.log("email sent sucsessfully");
        res.send('Email sent successfully');
    } catch(error){
        console.error(error);
    }
}
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})