import * as baseService from  './base';

function postCharge(token) {
    console.log("token = ", token);
    baseService.makeFetch('api/donate', {
        method: 'POST',
        body: JSON.stringify({token}),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then( (res) => {
        // return res.json();
        if (res.ok) {
            return res.json();
        }
        else {
            return res.json();
        }
    })
    .catch( (err) => {
        throw err;
    });
}

export { postCharge };