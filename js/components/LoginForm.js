import {getTemplateLogin} from "./Templates.js";
import {getTemplateOut} from "./Templates.js";
import {bindEvents, dEvent} from "../libs/helper.js";
import {f} from "../libs/helper.js"

export default class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.user= null;
        this.data = {
            login: "",
            password: ""
        }
        this.bind();
    }

    connectedCallback() {
        if (!this.user) {
            this.render(getTemplateLogin());
        }
    }

    render(template) {
        this.innerHTML = template;
        this.attachModel();
    }

    bind() {
        bindEvents("LoginFormLogin", "user-login", (e)=> {
            this.user = e.detail;
            this.render(getTemplateOut(this.user.login));
        })

        bindEvents("LoginFormOut", "user-logout", (e)=> {
            this.render(getTemplateLogin());
        })
    }

    attachModel() {
        this.querySelectorAll("input")
            .forEach(el=>el.addEventListener("input",e =>this.inputText(e)))
        this.querySelector('.button')
            .addEventListener('click', e => this.clickButton(e));
        // this.querySelectorAll("input")
        //     .forEach(el=>bindEvents("inputs","input", (el)=> {this.inputText(el)}))
        // this.querySelectorAll(".button")
        //     .forEach(el=>bindEvents(el.innerHTML,"click", (el)=> {this.clickButton(el)}))
    }

    inputText(e) {
        if (this.data[e.target.dataset.model] !== undefined) {
            this.data[e.target.dataset.model] = e.target.value;
        }
    }

    clickButton(e) {
        if (this[e.target.dataset.click]) {
            this[e.target.dataset.click]();
        }
    }

    async login() {
        if (!this.data.login || !this.data.password) return;
        let res = await f("api-token-auth", "post", null, this.data)
        console.log(res);

        if (res.error) {
            this.querySelector('.message').innerHTML = 'Не правильный логин или пароль';
            this.querySelector('.message').innerHTML+=`<style>.message {background:crimson}</style>`
            return;
        }

        dEvent("user-login",{login:this.data.login, user_token:res.data.user_token, role: "admin"});

    }

    async logout() {
        console.log("work")
        if (!this.user) return;
        let res = await f('api-token-logout', 'get', this.user.user_token, null);
        console.log(res)
        if (!res.error) {
            dEvent('user-logout');
        }
    }

}