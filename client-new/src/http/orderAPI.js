import {$authHost} from "./index";


export const getCurrentOrder = async (userId) => {
    const {data} = await $authHost.get('api/order/current/' + userId )
    return data
}

export const getOrders = async (userId = '') => {
    const {data} = await $authHost.get('api/order', {params: {userId}})
    return data
}

export const getAllDevicesInOrder = async (orderId) => {
    const {data} = await $authHost.get('api/order/devices/' + orderId)
    return data
}

export const addDeviceToOrder = async (orderId, deviceId, count) => {
    const {data} = await $authHost.post('api/order/add', {orderId, deviceId, count})
    return data
}

export const deleteDeviceFromOrder = async (deviceId, orderId) => {
    const {data} = await $authHost.delete('api/order/delete', {data: {deviceId, orderId}})
    return data
}

export const updateCount = async (deviceId,  orderId, count) => {
    const {data} = await $authHost.put('api/order/devices', {deviceId, orderId, count} )
    return data
}

export const createNewOrder = async (userId, orderId, status, delivery, totalCost) => {
    console.log(totalCost)
    const {data} = await $authHost.post('api/order', {userId, orderId, status, delivery, totalCost})
    return data
}