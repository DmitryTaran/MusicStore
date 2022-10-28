import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DeviceStore from "./store/DeviceStore";
import UserStore from "./store/UserStore";
import BasketStore from "./store/BasketStore";
import DevicePageStore from "./store/DevicePageStore";
import {NoticeStore} from "./store/NoticeStore";

export const Context = createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        device: new DeviceStore(),
        user: new UserStore(),
        basket: new BasketStore(),
        oneDevice: new DevicePageStore(),
        notice: new NoticeStore()
    }}>
        <App />
    </Context.Provider>
);
