import * as axios from "axios";

const instance = axios.create({
    withCredentials: false,
    baseURL: "http://localhost:8080/",
});

export const authAPI = {
    login(email, vcode) {
        return instance.post(`/login`, {email: email, vcode: vcode})
    },

    register(nike, email, mobile, vcode) {
        return instance.post('/register', {email: email, vcode: vcode, nike: nike, mobile: mobile})
    },

    logout(uid) {
        return instance.get(`/logout`)
    },

    sendmail_vcode(email) {
        return instance.post('/mailvc', {email: email})
    },

    has_mailregister(email) {
        return instance.get('/hasmail', {params: {email: email}})
    },
};

export const titleAPI = {
    createTitile(token, heading, content) {
        return instance.post('/title/create', {'heading': heading, 'content': content},
            {headers: {'X-Jcode-Auth-Token': token}})
    },

    title(tid) {
        return instance.get('/title/' + tid)
    },

    listTitle(pstart) {
        return instance.get('/title/list', {params: {start: pstart}})
    },

    root() {
        return instance.get('/')
    },

    search(q, pagenum) {
        return instance.get('/search', {params: {q: q, start: pagenum}})
    }
}
