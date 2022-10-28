import {makeAutoObservable} from "mobx";

export class NoticeStore {

    constructor() {
        this._notices = []
        makeAutoObservable(this)
    }

    addNotice(notice){
        this._notices.push({id: Date.now() ,...notice})
    }

    removeNotice(notice){
        this._notices = this.notices.filter(n => n.id !== notice.id)
    }

    get notices(){
        return this._notices
    }
}