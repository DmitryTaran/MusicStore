import React, {useContext} from 'react';
import classes from './DeviceItem.module.css'
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from "../../utils/consts";
import {AiFillStar} from 'react-icons/ai'
import {Context} from "../../index";

const DeviceItem = ({device}) => {

    const navigate = useNavigate()

    const {oneDevice} = useContext(Context)

    return (
        <div className={classes.deviceItem} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>

            <div className={classes.image}>
                <img src={process.env.REACT_APP_API_URL + device.img} alt=""/>
            </div>


            <div className={classes.price}>Цена: {device.price}</div>
            <div className={classes.info}>

                <p className={classes.title}>
                    {device.name}
                </p>
                <div className={classes.rating}>
                    {device.rating} <AiFillStar color={'#f1ba30'} size={25}/>
                </div>

            </div>

        </div>
    );
};

export default DeviceItem;