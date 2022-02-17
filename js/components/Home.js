import {getTemplateUsers} from "./Templates.js";
import {getTemplateRegistration} from "./Templates.js";
import {bindEvents, dEvent} from "../libs/helper.js";
import {f} from "../libs/helper.js"

export default class Home extends HTMLElement {
    constructor() {
        super();
        this.user = null;
        this.registrations = null;
        this.bind();
        this.rendered = false;
        this.data = {
            name:"",
            price:"",
            description:"",
            position:"",
        }
        this.s = {
            service: null
        };

    }

    connectedCallback() {
        if (!this.rendered && this.user) {
            this.render();
        }
    }

    bind() {
        bindEvents("UserHomeLogin", "user-login", (e) => {
            this.user = e.detail;
            this.render();
        })
        bindEvents("UserHomeOut", "user-logout", (e) => {
            this.user = null;
            this.innerHTML = "";
        })
    }

    async render() {
        this.innerHTML = "";
        if (!this.user) return;
        this.rendered = true;
        let res = (await f("service", "get", this.user.user_token)).data;
        console.log(res)

        this.registrations = res;
        for (let reg of this.registrations) {
            this.innerHTML += (getTemplateUsers(reg))
        }
        this.attachModel();
    }

    attachModel() {

        this.querySelectorAll("input")
            .forEach(el=>el.addEventListener("input",e =>this.inputText(e)))

        this.querySelectorAll('.button')
            .forEach(el => el.addEventListener('click', e => this.clickButton(e)))
    }

    inputText(e) {
        if (this.data[e.target.dataset.model] !== undefined) {
            this.data[e.target.dataset.model] = e.target.value;
        }
    }

    clickButton(e) {
        if (this[e.target.dataset.click]) {
            this[e.target.dataset.click](e);
        }
    }

    async register(e) {
        this.s.service = e.target.dataset.service
        let res = await f("servicerecord", "post", this.user.user_token, this.s)
        console.log(res)
        e.target.innerHTML = "Записано"
        e.target.classList.add("disabled")

        dEvent("user-cab",{status: "update"});
    }

    async restore(e) {
        let id = e.target.dataset.id;
        let res = await f(`service/${id}`, "delete", this.user.user_token, null);
        console.log(res)
        let el = document.getElementById(id);
        el.classList.add("disabled-block");

        dEvent("user-cab",{status: "update"});
    }

    put(e) {
        let id = e.target.dataset.id;
        let el = this.registrations.find(reg=>reg.id == id)

        let div = document.createElement("div");
        div.classList = "my-div";
        div.innerHTML = getTemplateRegistration(el);
        this.append(div);
        this.attachModel();

    }
    async change(e) {
        console.log(this.data)
        let id = e.target.dataset.id;
        let res = await f(`service/${id}`, "put", this.user.user_token, this.data);

        console.log(res);

        if (res.error) {
            this.querySelector('.message').innerHTML = 'Данные введены некорректно';
            this.querySelector('.message').innerHTML+=`<style>.message {background:crimson}</style>`
            return;
        }

        let div = document.getElementsByClassName("my-div")[0];

        div.classList.add("none");

        dEvent("user-cab",{status: "update"});

    }

}