export function getTemplateLogin() {
    return `
        <h3>Вход</h3>
        <div class="message"></div>
        <label>Логин: <input type="text" data-model="login"></label>
        <label>Пароль: <input type="text" data-model="password"></label>
         <a data-click="login" class="button">Вход</a>
        `
}

export function getTemplateOut(user) {
    return `
        <h3>Вы вошли как ${user}</h3>
        <div class="message"></div>
        <a data-click="logout" class="button">Выход</a>
        `
}

export function getTemplateUsers(registration) {
    return `
           <div class="basic-card basic-card-aqua" id="${registration.id}">
                <div class="card-content">
                    <span class="card-title"><h3>ID:${registration.id}</h3></span>
                    <p class="card-text">
                       Url: ${registration.url}, Service: ${registration.name}, Description: ${registration.description}
                       City: ${registration.position}
                       
                       <div class="buttons">
                       <a class="button" data-click="register" data-service="${registration.name}">Записаться на услугу</a>   
                       <a class="button" data-click="put" data-id="${registration.id}" style="background: dodgerblue; color: white">Редактировать услугу</a>     
                       <a class="button" data-click="restore" data-id="${registration.id}" style="background: firebrick; color: white">Удалить услугу</a>     
                        </div>
                    </p>
                </div>
                </div>
            `;
}

export function getTemplateRegistration(reg) {
    return `
        <h3>Редактировать ${reg.name}</h3>
        <div class="message"></div>
        <label>Name: <input type="text" data-model="name"></label>
        <label>Price: <input type="text" data-model="price"></label>
        <br>
        <br>
        <br>
        <br>
        <label>Description: <input type="text" data-model="description"></label>
        <label>Position: <input type="text" data-model="position"></label>
         <a data-click="change" data-id="${reg.id}" class="button">Сохранить изменения</a>
        `
}

export function getTemplateCab(registration) {
    return `
           <div class="basic-card basic-card-aqua" id="${registration.id}">
                <div class="card-content">
                    <span class="card-title"><h3>ID:${registration.id}</h3></span>
                    <p class="card-text">
                       Url: ${registration.url}, Service: ${registration.name}, Description: ${registration.description}
                       City: ${registration.position}
                       
                       <div class="buttons">      
                       <a class="button" data-click="restore" data-id="${registration.id}" style="background: firebrick; color: white">Удалить услугу</a>     
                        </div>
                    </p>
                </div>
                </div>
            `;
}