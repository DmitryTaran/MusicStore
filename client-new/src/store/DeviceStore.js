import {makeAutoObservable} from "mobx";

export default class DeviceStore {

    constructor() {

        this._devices =  []

        this._types = []

        this._manuals = []

        this._selectedType =  {}

        this._limit = 3

        this._page = 1

        this._totalCount = 0

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

    setManuals(manuals){
        this._manuals = manuals
    }

    get manuals(){
        return this._manuals
    }

}