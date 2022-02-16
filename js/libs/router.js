import {dEvent} from "./helper.js";

export default class Router {
    constructor(settings) {
        this.routes = settings.routes;
        for (let i = 0; i < this.routes.length;i++) {
            if (!this.routes[i].element) {
                const elementName = "template-" +this.routes[i].component.name.toLowerCase();
                if (!customElements.get(elementName)) customElements.define(elementName, this.routes[i].component);
                this.routes[i].element = document.createElement(elementName);
                console.log("CREATE " + elementName);
            }
        }
        this.link = settings.link || "router-link";
        this.view = settings.view || "router-view";
        this.home = window.location.toString();
        customElements.define(this.link, RouterLink);
        customElements.define(this.view, RouterView);
        this.bindEvents();
    }
    bindEvents() {
        document.addEventListener("router-click", (e)=> {
            let route = this.routes.find(route=>route.path === e.detail);
            if (!route) return;
            window.history.pushState({},e.path,this.home+String(e.detail));
            let el = document.querySelector(this.view);
            dEvent("router-view", route.element, el);
        })
    }
}

class RouterView extends HTMLElement {
    connectedCallback() {
        this.bindEvents()
    }
    bindEvents() {
        this.addEventListener("router-view",(e) => {
            this.innerHTML ="";
            this.append(e.detail);
        })
    }

}

class RouterLink extends HTMLElement {
    constructor() {
        super();
        this.bindEvents()
    }
    bindEvents() {
        this.addEventListener("click",() => {
            dEvent("router-click", this.getAttribute("to"))
        })
    }
}