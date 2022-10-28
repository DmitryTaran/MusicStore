import {$authHost, $host} from "./index";


export const getAllTypes = async () => {
    const {data} = await $host.get('api/deviceInfo/')
    return data
}

export const getAllManuals = async () => {

}

export const createManual = async (manualName) => {
    const {data} = await $authHost.post('api/manual',{name: manualName})
    return data
}

export const getAllDevices = async (typeName, limit, page) => {
    const {data} = await $host.get('api/device', {params: {
        page, limit, typeName
    }})
    return data
}

export const getOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const getAllDeviceInfos = async (deviceId) => {
    const {data} = await $host.get('api/deviceInfo/' + deviceId)
    return data
}

export const createDevice = async () => {

}


export const getAllComments = async (deviceId) => {
    const {data} = await $host.get('api/feedback/' + deviceId)
    return data
}

export const leaveComment = async (deviceId, title, description, rate, userId) => {
    const {data} = await $authHost.post('api/feedback', {deviceId, title, description, rate, userId})
    return data
}