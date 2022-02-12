import {f, dEvent} from "../main.js";

export default class Users extends HTMLElement {

    constructor() {
        super();
        this.users = [];
        this.data = {};
        this.user = null;
        this.renderer = false;
    }

    connectedCallback() {
        if (!this.renderer) {
            this.render(this.getTemplateUsers());
        }
    }

    render(template) {
        this.bindEvents();
        this.renderer = true;
        this.innerHTML = template;
        this.users.forEach(e => {
            this.append(e);
        })
    }

    getTemplateUsers() {
        return `
         <h3>Пользователи</h3>
            <div class="message"></div> 
        `
    }

   bindEvents() {
        document.addEventListener('user-login', (e) => {
            this.user = e.detail;
            this.loadUsers();
            this.render(this.getTemplateUsers());
        });

        document.addEventListener('user-out', () => {
            this.render(null);
        });
    }

    clear() {
        this.users = [];
        this.innerHTML = '';
    }

    addUser(user) {
        this.users.push(this.createUser(user));
    }

    createUser(data) {

        let user = document.createElement('shop-admin-user');
        user.dataset.id = data.id;
        user.dataset.name = data.name;
        user.dataset.status = data.status;
        user.dataset.group = data.group;

        return user;
    }

    async loadUsers() {
        let list = (await f('user', 'get', this.user.api_token)).data;
        // console.log(list)

        list.forEach(el => this.addUser(el));

        this.users.forEach(e => {
            this.append(e);
        })

    }

}