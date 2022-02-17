import {getTemplateCab} from "./Templates.js";
import {getTemplateRegistration} from "./Templates.js";
import {bindEvents, dEvent} from "../libs/helper.js";
import {f} from "../libs/helper.js"

export default class User extends HTMLElement {
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
        this.service = null;
        this.render();
    }

    connectedCallback() {
        if (!this.rendered && this.user) {
            this.render();
        }
    }

   bind() {
        bindEvents("UserLogin", "user-login", (e) => {
            this.user = e.detail;
            this.render();
        })
        bindEvents("UserOut", "user-logout", (e) => {
            this.user = null;
            this.innerHTML = "";
        })

        bindEvents("UserCab", "user-cab", (e) => {
           this.getUserCab();
        })

    }

   async getUserCab() {
        this.innerHTML = "";
        let res = await f("servicerecord", "get", this.user.user_token);
        console.log(res)
        this.registrations = res.results;
        for (let reg of this.registrations) {
            this.innerHTML += (getTemplateCab(reg))
        }
        this.attachModel();
    }


    async render() {
        this.innerHTML = "";
        if (!this.user) return;
        this.rendered = true;
        let res = await f("servicerecord", "get", this.user.user_token);
        console.log(res)
        this.registrations = res.results;
        for (let reg of this.registrations) {
            this.innerHTML += (getTemplateCab(reg))
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

    async restore(e) {
        let id = e.target.dataset.id;
        let res = await f(`servicerecord/${id}`, "delete", this.user.user_token, null);
        console.log(res)
        let el = document.getElementById(id);
        el.classList.add("disabled-block");
    }

}