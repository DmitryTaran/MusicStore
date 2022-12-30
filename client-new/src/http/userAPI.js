import {$authHost, $host} from "./index";
import jwtDecode from 'jwt-decode'

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'CLIENT'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    if (localStorage.getItem('token')) {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    }
}

export const updateUserRole = async (email, role) => {
    const {data} = await $authHost.put('api/user/updateRole', {email, role})
    console.log(data)
    return data
}