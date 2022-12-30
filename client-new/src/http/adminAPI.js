import {$authHost, $host} from "./index";

export const dump = async () => {
    const {data} = await $authHost.get('api/admin/dumping')
    return data
}

export const getAllDumps = async () => {
    const {data} = await $authHost.get('api/admin/dumps')
    return data
}

export const restore = async (fileName) => {
    const {data} = await $authHost.post('api/admin/restoring', {fileName})
    return data
}