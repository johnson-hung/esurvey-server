const help = require('nodemon/lib/help');
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail{
    constructor({subject, recipients}, content){
        super(); // Make sure that the constructor gets executed

        this.from_email = new helper.Email('jhcc.gamedev@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients){
        return recipients.map(({email}) => {
            return new helper.Email(email);
        });
    }

    addClickTracking(){
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }
}

module.exports = Mailer;