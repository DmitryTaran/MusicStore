import {$authHost, $host} from "./index";

export const dump = async () => {
    const {data} = await $authHost.get('api/dumping')
    return data
}

export const restore = async () => {
    const {data} = await $authHost.get('api/restoring')
    return data
}