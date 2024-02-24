class GDPR {

    constructor() {
        this.bindEvents();
        if(this.cookieStatus() !== 'accept') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.MetaData(this.captureDateInformation())
            this.hideGDPR();
            console.log("clicked accept");
        });

        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.MetaData(this.captureDateInformation())
            this.hideGDPR();
            console.log("clicked reject");
        });

    }
    captureDateInformation() {
        const now = new Date();
        const dag = now.getDate();
        const maand = now.getMonth() + 1;
        const jaar = now.getFullYear();
        const uren = now.getHours();
        const minuten = now.getMinutes();
        return "Datum: " + dag + "-" + maand + "-" + jaar + " " + "tijd: " + uren + ":" + minuten; 
    }

    cookieStatus(status) {
        if (status) localStorage.setItem('ConsentStatus', status);
        return localStorage.getItem('ConsentStatus');
    }

//student uitwerking
    MetaData(metadata)
    {
        if (metadata) localStorage.setItem('metadata', metadata);
        return localStorage.getItem('metadata');
    }

    hideGDPR(){
        document.querySelector(`.cookieConsentPopup`).classList.add('hide');
        document.querySelector(`.cookieConsentPopup`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.cookieConsentPopup`).classList.add('show');
        document.querySelector('.dialog-backdrop').style.display = 'block';
    }

}

const gdpr = new GDPR();

