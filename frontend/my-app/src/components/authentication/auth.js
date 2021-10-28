
function setToken(token){
    if(window.localStorage){
        localStorage.setItem('token', token)
    }
}

function isLogin(){
    if(window.localStorage){
        const token =  localStorage.getItem('token')
        return Boolean(token)
    }
    return false;
}

function getToken(){
    if(window.localStorage){
        const res = localStorage.getItem('token')
        return (res)
    }
    return '';
}

export {getToken, isLogin, setToken}