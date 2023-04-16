export const setToken = (token) =>{
    sessionStorage.setItem('TOKEN',token);
}

export const clearToken=()=>{
    sessionStorage.removeItem('TOKEN');
}

export const getToken =() =>{
    return sessionStorage.getItem('TOKEN');
}