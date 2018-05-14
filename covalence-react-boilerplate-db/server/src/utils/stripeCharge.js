import stripeLoader from 'stripe';
import { config } from '../config';
const stripe = stripeLoader(config.STRIPE_SK);

function charge(token, amt) {
    return stripe.charges.create({
        amount: amt * 100,
        currency: 'usd',
        source: token,
        description: 'statement description'
    });
}

export { charge }; 