import mailgunLoader from 'mailgun-js';
import { config } from '../config';
const mailgun = mailgunLoader({apiKey: config.MAILGUN_API_KEY, domain: "sandbox20a3a1081fba4873bc355021f48977dc.mailgun.org"});
 
function sendEmail(from, to, subject, content) {
    let data = {
        from: from,
        to: to,
        subject: subject,
        html: content
    };

    return mailgun.messages().send(data);
}

export { sendEmail };