import {makeAutoObservable} from "mobx";

export default class DeviceStore {

    constructor() {

        this._devices =  [
            {id: 1, name: "FENDER SQUIER AFFINITY 2021 TELECASTER MN BUTTERSCOTCH BLONDE", price: 15000, img: "", rating: 5.0},
            {id: 2, name: "Fender Telecaster", price: 16000, img: "", rating: 4.8},
            {id: 3, name: "Fender Les Paul", price: 17000, img: "", rating: 3.7},
            {id: 4, name: "Fender Les Paul", price: 17000, img: "", rating: 3.7},
            {id: 5, name: "Fender Les Paul", price: 17000, img: "", rating: 3.7},
            {id: 6, name: "Fender Les Paul", price: 17000, img: "", rating: 3.7},
            {id: 7, name: "Fender Les Paul", price: 17000, img: "", rating: 3.7},
        ]

        this._types = [
            {id: 0, description: "Все товары"},
            {id: 1, description: "Акустические гитары"},
            {id: 2, description: "Электрогитары"},
            {id: 3, description: "Барабаны"},
            {id: 4, description: "Педали"},
            {id: 5, description: "Процессоры"},
            {id: 6, description: "Струны"},
            {id: 7, description: "Медиаторы"},
            {id: 8, description: "Аксессуары для гитар"},
        ]

        this._selectedType =  {id: 0, description: "Все товары"}

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

}