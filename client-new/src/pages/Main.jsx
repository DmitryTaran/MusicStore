import React from 'react';
import TypeBar from "../components/TypeBar/TypeBar";
import DeviceList from "../components/DeviceList/DeviceList";
import Pagination from "../components/UI/Pagination/Pagination";

const Main = () => {

    return (
        <div>
            <div className="mainPage">
                <TypeBar/>
                <DeviceList/>
            </div>
            <div className="pagination">
                <Pagination/>
            </div>
        </div>

    );
};

export default Main;