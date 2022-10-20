import React from 'react';
import TypeBar from "../components/TypeBar/TypeBar";
import DeviceList from "../components/DeviceList/DeviceList";
import Button from "../components/UI/Button/Button";

const Main = () => {


    return (
        <div className="mainPage">
            <TypeBar/>
            <DeviceList/>
            <Button>Кнопка</Button>
        </div>
    );
};

export default Main;