import {$host} from "./index";


export const getAllTypes = async () => {
    const {data} = await $host.get('api/deviceInfo/')
    return data
}

export const getAllManuals = async () => {

}

export const createManual = async () => {

}

export const getAllDevices = async (typeName, limit, page) => {
    const {data} = await $host.get('api/device', {params: {
        page, limit, typeName
    }})
    return data
}

export const getOneDevice = async () => {

}

export const createDevice = async () => {

}
