import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function setHeaderName() {
    return Cookies.set(TokenKey)
}

export function getHeaderName() {
    return Cookies.get(TokenKey)
}

export function getStorage(name) {
    return window.sessionStorage.getItem(name)
}
export function setStorage(name, token) {
    return window.sessionStorage.setItem(name, token)
}
export function removeStorage(name) {
    return window.sessionStorage.removeItem(name)
}