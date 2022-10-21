import {$host} from "./index";
import jwtDecode from 'jwt-decode'

export const registration = async (email, password) => {

        const {data} = await $host.post('api/user/registration', {email, password, role: 'MODERATOR'})
        return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    return data
}

export const check = async () => {
    const response = await $host.post('api/user/auth')
    return response
}