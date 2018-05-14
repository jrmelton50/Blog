import 'isomorphic-fetch';

const AUTH_TOKEN_KEY = 'authtoken';
let authToken = '';
let authorid = undefined;
let authorName = '';

function setAuthToken(token, id, name) {
    authToken = `Bearer ${token}`;
    authorid = id;
    authorName = name
    if (localStorage) {
        localStorage.setItem(AUTH_TOKEN_KEY, authToken);
        localStorage.setItem("Number", authorid);
        localStorage.setItem("Author", authorName);
    }
}

function clearAuthToken() {
    authToken = '';
    if (localStorage) {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem("Number");
    }
}

function populateAuthToken() {
    if (localStorage) {
        let token = localStorage.getItem(AUTH_TOKEN_KEY);
        let id = authorid = localStorage.getItem("Number");
        if (token && token !== null && id && id !== null) {
            authToken = token;
            authorid = id;
        }
    }
}

// function authTokenExists () {
//     populateAuthToken();
//     console.log("auth token = ", authToken);
//     return authToken !== '';
// }

function makeFetch(url, info) {
    return fetch(url, info);
}

function json(url, method = 'GET', payload = {}) {
    let data = {
        method,
        body: JSON.stringify(payload),
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': authToken
        })
    };
    if (method === 'GET') {
        delete data.body;
    }

    return makeFetch(url, data)
        .then((response) => {
            if (response.ok) {
                let contentType = response.headers.get('Content-Type');
                if (contentType.indexOf('application/json') > -1) {
                    return response.json();
                }
                return response.statusText;
            }
            throw response;
        })
        .catch( (err) => {
            throw err;
        });
}

function get(url) {
    return json(url);
}

function post(url, payload) {
    return json(url, 'POST', payload);
}

function put(url, payload) {
    return json(url, 'PUT', payload);
}

function destroy(url, payload) {
    return json(url, 'DELETE', payload);
}

export {
    setAuthToken,
    populateAuthToken,
    clearAuthToken,
    get,
    post,
    put,
    destroy,
    makeFetch
};