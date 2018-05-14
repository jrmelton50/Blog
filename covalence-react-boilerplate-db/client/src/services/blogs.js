import * as baseService from './base';

function all() {
    return baseService.get('/api/blogs');
}

function allBlogsIncludingUserNames() {
    return baseService.get(`/api/blogs/blogsusers`);
}

function one(id) {
    return baseService.get(`/api/blogs/${id}`);
}

function oneBlogIncludingUserName(id) {
    return baseService.get(`/api/blogs/bloguser/${id}`);
}

function allBlogsFromUser(id) {
    return baseService.get(`/api/blogs/userblogs/${id}`);
}

function insert(data) {
    return baseService.post('/api/blogs', data);
}

function update(id, data) {
    return baseService.put(`/api/blogs/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/blogs/${id}`);
}

export { all, allBlogsIncludingUserNames, one, oneBlogIncludingUserName, allBlogsFromUser, insert, update, destroy };