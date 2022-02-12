import {f} from "../helper.js";
import {dEvent} from "../main.js";

export default class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.user = null;
        this.data = {
            login: "",
            password: "",
        }

    }

    connectedCallback() {
        if (!this.user) {
            this.render(this.getTemplateLogin())
        }
    }

    render(template) {
        this.innerHTML = template;
        this.bindEvents();
        this.attachModel();
    }

    getTemplateLogin() {
        return `
        <h3>Вход</h3>
        <div class="message"></div>
        <label>Логин: <input type="text" data-model="login"></label>
        <label>Пароль: <input type="text" data-model="password"></label>
        <button data-click="login">Войти</button>
        `
    }
    getTemplateOut() {
        return `
        <h3>Вы вошли как ${this.user.login}</h3>
        <div class="message"></div>
        <button data-click="logout">Выход</button>
        `
    }

    bindEvents() {
        document.addEventListener("user-login",(e) => {
            this.user = e.detail;
            this.render(this.getTemplateOut())
        })

        document.addEventListener("user-logout", (e)=>{
            this.render(this.getTemplateLogin())
        })
    }

    attachModel() {
        this.querySelectorAll("input")
            .forEach(el=>el.addEventListener("input",e =>this.inputText(e)))
        this.querySelector('button')
            .addEventListener('click', e => this.clickButton(e));
    }

    inputText(e) {
        if (this.data[e.target.dataset.model] !== undefined) {
            this.data[e.target.dataset.model] = e.target.value;
            console.log(this.data);
        }
    }

    clickButton(e) {
        this[e.target.dataset.click]();
    }

    async login() {
        if (!this.data.login || !this.data.password) return;
        let res = await f('login', 'post', null, this.data);

        console.log(res);
        localStorage.setItem("user", JSON.stringify(res));

        if (res.error) {
            this.querySelector('.message').innerHTML = 'Не правильный логин или пароль';
            this.querySelector('.message').innerHTML+=`<style>.message {background:crimson}</style>`
            return;
        }

        dEvent('user-login', {login: this.data.login, api_token: res.data.user_token, role: "admin"});
    }

    async logout() {

        console.log(this.user)

        let res = await f('logout', 'get', this.user.api_token, this.data);
        console.log(res)

        if (!res.message) {
            dEvent('user-logout');
        }

    }


}