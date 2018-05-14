import * as baseService from './base';

function all() {
    return baseService.get('/api/authors');
}

function one(id) {
    return baseService.get(`/api/authors/${id}`);
}

function oneByEmail(email) {
    return baseService.get(`api/authors/email/${email}`);
}

function insert(data) {
    return baseService.post('/api/authors', data);
}

function update(id, data) {
    return baseService.put(`/api/authors/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/authors/${id}`);
}

export { all, one, oneByEmail, insert, update, destroy };