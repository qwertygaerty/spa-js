import {getTemplateUsers} from "./Templates.js";
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
            service: null
        }
    }

    connectedCallback() {
        if (!this.rendered) {
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
        })
    }

    async render() {
        if (!this.user) return;
        this.rendered = true;
        let res = (await f("service", "get", this.user.user_token)).data;
        console.log(res)

        this.registrations = res;
        for (let reg of this.registrations) {
            console.log(reg)
            this.innerHTML +=(getTemplateUsers(reg))
        }
        this.attachModel();
    }

    attachModel() {
        this.querySelectorAll('.button')
            .forEach(el=>el.addEventListener('click', e => this.clickButton(e)))
    }

    clickButton(e) {
        if (this[e.target.dataset.click]) {
            this[e.target.dataset.click](e);
        }
    }

    async register(e) {
        this.data.service = e.target.dataset.service
        let res = await f("servicerecord","post", this.user.user_token,this.data)
        console.log(res)
        e.target.innerHTML = "Записано"
        e.target.classList.add("disabled")
    }

    async restore(e) {
        let id = e.target.dataset.id;
        let res = await f(`service/${id}`,"delete", this.user.user_token,null);
        console.log(res)
        let el = document.getElementById(id);

        el.classList.add("disabled-block");
    }

    async put(e) {

        let id = e.target.dataset.id;
    }
}