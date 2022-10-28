import {makeAutoObservable} from "mobx";


export default class DevicePageStore {
    constructor() {
        this._device = {}
        this._comments = []
        this._deviceInfos = []

        makeAutoObservable(this)
    }

    setDevice(device){
        this._device = device
    }

    setComments(comments){
        this._comments = comments
    }

    setDeviceInfos(deviceInfos){
        this._deviceInfos = deviceInfos
    }

    get device(){
        return this._device
    }

    get deviceInfos(){
        return this._deviceInfos
    }

    get comments(){
        return this._comments
    }
}