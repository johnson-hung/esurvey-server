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
    }
}

module.exports = Mailer;