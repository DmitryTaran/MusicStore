import {makeAutoObservable} from "mobx";

export default class DeviceStore {

    constructor() {

        this._devices =  []

        this._types = []

        this._selectedType =  {id: 0, description: "Все товары"}

        this._limit = 9

        this._page = 1

        this._totalCount = 20

        makeAutoObservable(this)
    }

    setDevices(devices){
        this._devices = devices
    }

    get devices(){
        return this._devices
    }

    setTypes(types){
        this._types = types
    }

    get types(){
        return this._types
    }

    setSelectedType(type){
        this._selectedType = type
    }

    get selectedType(){
        return this._selectedType
    }

    setLimit(limit){
     this._limit = limit
    }

    get limit(){
        return this._limit
    }

    setPage(page){
        this._page = page
    }

    get page(){
        return this._page
    }

    setTotalCount(totalCount){
        this._totalCount = totalCount
    }

    get totalCount(){
        return this._totalCount
    }


}