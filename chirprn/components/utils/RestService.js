export async function GetPostsAsync() {
    try {
        console.log(global.API_POST);
        var resp = await fetch(global.API_POST);
        var respJson = await resp.json();
        console.log(respJson);
        return respJson;
    }
    catch (error) {
        // console.error(error);
        alert('Please check your network connection' + error)
        return null;
    };
}

export async function CreatePostAsync(value, username) {
    try {
        var body = 'text=' + value + '&created_by=' + username;
        var resp = await fetch(global.API_POST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
        });
        var respJson = await resp.json();
        console.log(respJson);
        return respJson;
    }
    catch (error) {
        // console.error(error);
        alert('Please check your network connection' + error)
        return null;
    };
}

export async function LoginAsync(username, password) {
    try {
        return await Auth(username, password, global.API_LOGIN)
    }
    catch (error) {
        // console.error(error);
        alert('Please check your network connection' + error);
        return null;
    };
}

export async function RegisterAsync(username, password) {
    try {
        return await Auth(username, password, global.API_SIGNUP)
    }
    catch (error) {
        // console.error(error);
        alert('Please check your network connection' + error);
        return null;
    };
}

//#region Helper functions
function authParam(username, password) {
    var params = {
        'username': username,
        'password': password,
        // 'grant_type': 'password'
    };
    var formBody = [];
    for (var property in params) {
        var encodedKey = (property);
        var encodedValue = (params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}

export async function Auth(username, password, url) {
    var formBody = authParam(username, password);
    var resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    });
    var respJson = await resp.json();
    console.log(respJson);
    return respJson;
}
//#endregion