const form = document.querySelector('#submit');

// Koppel er een event listener aan
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    // Voorkom dat het formulier verstuurd wordt
    e.preventDefault();

    grecaptcha.ready(function () {
        // Vul hier de site sleutel in (de public key)
        grecaptcha.execute("6LfHg4ApAAAAAGPJBCsxEPiZaIpSx3Ziewqv-13j", { action: 'submit' }).then(async function (token) {
            try {
                // Verstuur het eerst naar jouw eigen server.
                const response = await fetch('http://localhost:3001/send-email', {
                    method: "POST",
                    body: JSON.stringify({
                        token: token,
                        voornaam: document.getElementById('voornaam').value,
                        achternaam: document.getElementById('achternaam').value,
                        email: document.getElementById('email').value,
                        phoneNumber: document.getElementById('phoneNumber').value,
                        messageBody: document.getElementById('messageBody').value,
                        subject: document.getElementById('subject').value
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
            }
            catch (e) {
                console.log('Het verzenden van de captcha is mislukt: ' + e.message)
            }
        });
    });
}