import {dEvent} from "./libs/helper.js";
import {f} from "./libs/helper.js";
import Router from "./libs/router.js";
import LoginForm from "./components/LoginForm.js";
import Home from "./components/Home.js";

class App {

}

const routes = [
    {path:"/login", component: LoginForm, name: "Войти"},
    {path:"/home", component: Home, name: "Домашняя страница"},
]

const router = new Router(
    {routes}
)

new App();
