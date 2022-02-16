
let host = "http://localhost/api-wash";

let f = async (url, method="get", token=false, data=[]) => {
    let options = {
        method: method.toUpperCase(),
        headers: {
            "Content-type": "application/json"
        }
    }

    if (token) {
        options.headers["Authorization"] = `Bearer ${token}`
    }

    if (["post", "patch", "put"].includes(method)) {
        options.body = JSON.stringify(data)
    }
    return await fetch(`${host}/${url}`, options).then(res=>res.json());
}

const dEvent = (event, detail, el) => {
    if (!el) {
        document.dispatchEvent(new CustomEvent(
            event, {detail:detail}
        ))
    } else {
        el.dispatchEvent(new CustomEvent(
            event, {detail:detail}
        ))
    }
}

const bindEvents = (name, type, callback ) => {
    console.log("BIND EVENT - " + name)
    document.addEventListener(type,(e) => {
       callback(e);
    })
}


export {f, dEvent, bindEvents}