
let host = "https://jurapro.bhuser.ru/api-cafe";

let f = async (url, method="get",token=false, data=[]) => {
    let options = {
        method: method.toUpperCase(),
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`
    }

    if (["post", "patch"].includes(method)) {

        options.body = JSON.stringify(data);
    }

    return await fetch(`${host}/${url}`, options).then(res=>res.json())
}

export {f, host};