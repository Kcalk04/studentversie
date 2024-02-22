class GDPR {

    constructor() {
        this.showStatus();
        this.showContent();
        this.bindEvents();

        if(this.cookieStatus() !== 'accept') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.MetaData(this.captureDateInformation())
            this.showStatus();
            this.showContent();
            this.hideGDPR();
            console.log("clicked accept");
        });

        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.MetaData(this.captureDateInformation())
            this.showStatus();
            this.showContent();
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

    showContent() {
        this.resetContent();
        const status = this.cookieStatus() == null ? 'not-chosen' : this.cookieStatus();
        const element = document.querySelector(`.content-gdpr-${status}`);
        element.classList.add('show');

    }

    resetContent(){
        const classes = [
            '.content-gdpr-accept',

//student uitwerking
            '.content-gdpr-reject',

            '.content-gdpr-not-chosen'];

        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }

    showStatus() {
        document.querySelector('.content-gpdr-consent-status').innerHTML =
            this.cookieStatus() == null ? 'Niet gekozen' : this.cookieStatus();
    }

    cookieStatus(status) {

        if (status) localStorage.setItem('ConsentStatus', status);

//student uitwerking
        
        
        return localStorage.getItem('ConsentStatus');
    }

//student uitwerking
    MetaData(metadata)
    {
        if (metadata) localStorage.setItem('gdpr-consent-metadata', metadata);

        return localStorage.getItem('gdpr-consent-metadata');
    }

    hideGDPR(){
        document.querySelector(`.cookieConsentPopup`).classList.add('hide');
        document.querySelector(`.cookieConsentPopup`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.cookieConsentPopup`).classList.add('show');
    }

}

const gdpr = new GDPR();

