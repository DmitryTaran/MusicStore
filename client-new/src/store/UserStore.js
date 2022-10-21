import {makeAutoObservable} from "mobx";
import {login} from "../http/userAPI";

export default class UserStore {
    constructor() {
        this._isAuth = true
        this._user = {role: 'MODERATOR'}
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }

    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }

}