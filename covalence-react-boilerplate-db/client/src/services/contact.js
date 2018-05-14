import * as baseService from './base';

function sendContactEmail(name, email, message) {
    return baseService.post('/api/contact', {
        name: name, 
        email: email,
        message: message
    });
}

export { sendContactEmail };