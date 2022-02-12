import {f} from "./helper.js";
import LoginForm from "./components/LoginForm.js";
import Router from "./libs/router.js";
import Users from "./components/Users.js";
import User from "./components/User.js";


// if(performance.navigation.type == 1){
//
//         window.location.href = "http://localhost:63342/2/index.html?_ijt=fnllvp0t9v4php6jdavqcmvhtq&_ij_reload=RELOAD_ON_SAVE";
//         window.location.reload();
//
// }


const dEvent = (event, detail) => {
    document.dispatchEvent(new CustomEvent(
        event, {
            detail: detail
        }
    ))
}

class App {
    constructor() {
        this.defineElements();
    }

    defineElements() {
        customElements.define("shop-admin-user", User);
    }

}

const routes = [
    {path: "/login", component: LoginForm, name: 'Вход'},
    {path: "/users", component: Users, name: 'Работники'},
]

const router = new Router(
    {routes})


window.onload = (event)=>{
    console.log(window.location.href)
    if (window.location.href !== "http://localhost:63342/2/index.html?_ijt=fnllvp0t9v4php6jdavqcmvhtq&_ij_reload=RELOAD_ON_SAVE") {
        window.location.href = "http://localhost:63342/2/index.html?_ijt=fnllvp0t9v4php6jdavqcmvhtq&_ij_reload=RELOAD_ON_SAVE";
    }

}



new App();

export {f, dEvent};