import {makeAutoObservable} from "mobx";


export default class BasketStore {
        constructor() {
            this._devices = []
            this._basket = {}
            makeAutoObservable(this)
        }

        get totalCost(){
            return this._devices.reduce((accum, item) => accum + (item.price * item.deviceInOrders[0].count), 0)
        }

        setDeviceInBasketCount(device, count){
            const index =  this._devices.indexOf(device)
            this._devices[index].deviceInOrders[0].count = count
        }

        deleteDevice(device){
            this._devices = this._devices.filter(d => d.id !== device.id)
        }

        setBasket(basket){
            this._basket = basket
        }

        get basket(){
            return this._basket
        }

        setDevices(devices){
            this._devices = devices
        }

        get devices(){
            return this._devices
        }


}