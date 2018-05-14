import * as baseService from './base';

function all() {
    return baseService.get('/api/blogtags');
}

function one(id) {
    return baseService.get(`/api/blogtags/${id}`);
}

function insert(data) {
    return baseService.post('/api/blogtags', data);
}

function update(id, data) {
    return baseService.put(`/api/blogtags/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/blogtags/${id}`);
}

export { all, one, insert, update, destroy };