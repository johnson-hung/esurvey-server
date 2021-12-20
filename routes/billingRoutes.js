const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
    app.post('/api/stripe', async (req, res) => {
        // Make request to Stripe api and finalize the charge
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5.00 for 5 email credits',
            source: req.body.id
        });
        console.log(charge);
    });
};