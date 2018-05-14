import * as baseService from './base';
import { one, oneByEmail } from './authors';

let loggedIn = false; 
let loggedInUserID = localStorage.getItem("Number");
// baseService.populateAuthToken();

function isLoggedIn() {
    return loggedIn;
}

function getLoggedInUserID() {
    // let id = localStorage.getItem("Number");
    // loggedInUserID = id;
    return loggedInUserID;
}

function getNameOfLoggedInUser(id) {
    one(id)
    .then( (user) => {
        console.log(user);
        return user.name;
    })
    .catch( (err) => {
        console.log(err);
    });
}

// function setLoggedInUserID(email) {
//     oneByEmail(email)
//     .then( (obj) => {
//         console.log("obj[0].id = ", obj[0].id);
//         loggedInUserID = obj[0].id;
//     })
//     .catch( (err) => {
//         console.log(err);
//     });
// }

function checkLogin() {
    if (loggedIn) {
        return Promise.resolve(true);
    } else {
        baseService.populateAuthToken();
        return me()
        .then( (res) => {
            loggedIn = true;
            loggedInUserID = res.id;
            return Promise.resolve(true);
        })
        .catch(() => {
            return Promise.resolve(false);
        });
    }
}

function login(email, password) {
    return baseService.makeFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then((response) => {
        if (response.ok) {
            return response.json()
            .then((jsonResponse) => {
                baseService.setAuthToken(jsonResponse.token, jsonResponse.number, jsonResponse.name);
                // oneByEmail(email)
                // .then( (obj) => {
                //     console.log("obj[0].id = ", obj[0].id);
                //     loggedInUserID = obj[0].id;
                //     loggedIn = true;
                // })
                // .catch( (err) => {
                //     console.log(err);
                // });
                loggedIn = true;
                loggedInUserID = jsonResponse.number;
            });
        } else if (response.status === 401) {
            return response.json()
            .then((jsonResponse) => {
                throw jsonResponse;
            });
        }
    });
}

function logout() {
    baseService.clearAuthToken(); // this clears the authorid too
    loggedIn = false;
    loggedInUserID = undefined;
}

function me() {
    return baseService.get('/api/users/me');
}

export { isLoggedIn, getLoggedInUserID, getNameOfLoggedInUser, checkLogin, login, logout };