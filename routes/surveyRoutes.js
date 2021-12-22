const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thankyou', (req, res) => {
        res.send('Thank you for your input!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        // Extract necessary data like email, surveyId, and choice
        const events = _.map(req.body, ({ email, url }) => {
            const pathname = new URL(url).pathname;
            const p = new Path('/api/surveys/:surveyId/:choice');
            const match = p.test(pathname);
            if (match){
                return { email, surveyId: match.surveyId, choice: match.choice };
            }
        });

        // Remove elements that are undefined
        const compactEvents = _.compact(events);
        const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');
        console.log(uniqueEvents);
        res.send({});
    });
    
    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const {title, subject, body, recipients} = req.body;

        // Create instance of survey
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id
        });

        // Send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try{
            await mailer.send();

            // Save the survey and the updated user credits
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
    
            // Send user back so as to update components
            res.send(user);
        }
        catch(err){
            res.status(422).send(err);
        }
    });
};