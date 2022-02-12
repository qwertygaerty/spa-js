import {f, dEvent} from "../main.js";

export default class User extends HTMLElement {
    constructor() {
        super();
        this.users = [];
        this.data = {
            name: "",
            login: "",
            status: "",
            group: "",
            id: ""
        }
        this.user = null;

    }

    connectedCallback() {
        this.id = this.dataset.id;
        this.name = this.dataset.name;
        this.status = this.dataset.status;
        this.group = this.dataset.group;
        this.render(this.getTemplateUser());
        this.attachModel();

    }

    render(template) {
        this.innerHTML = template;
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('user-login', (e) => {
            this.user = e.detail;
            this.render(this.getTemplateUser());

        });

        document.addEventListener('user-out', () => {
            this.render(null);
        });
    }


    attachModel() {
        this.querySelector('button')
            .addEventListener('click', e => this.clickButton(e));
    }

    getTemplateUser() {
        return `
           
           <div class="basic-card basic-card-aqua">
                <div class="card-content">
                    <span class="card-title"><h3>ID:${this.id}</h3></span>
                    <p class="card-text">
                       Name: ${this.name}, Status: ${this.status}, Group: ${this.group}
                       
                       <div class="buttons">
                       <button data-click="see">Просмотр</button>   
                       <button  style="background: firebrick; color: white">Уволить</button>     
                        </div>

                    </p>
                </div>
            
                </div>
            `;
    }

    clickButton(e) {
        this[e.target.dataset.click]();
    }




}