import React from 'react';
import classes from './DeviceItem.module.css'
import MyImage from '../../assets/guitar.jpg'
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from "../../utils/consts";
import {AiFillStar} from 'react-icons/ai'

const DeviceItem = ({device}) => {

    const navigate = useNavigate()

    return (
        <div className={classes.deviceItem} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>

            <div className={classes.image}>
                <img src={MyImage} alt=""/>
            </div>


            <div className={classes.price}>Цена: {device.price}</div>
            <div className={classes.info}>

                <p className={classes.title}>
                    {device.name}
                </p>
                <div className={classes.rating}>
                    {device.rating?.substring(0, 3)} <AiFillStar color={'#f1ba30'} size={25}/>
                </div>

            </div>

        </div>
    );
};

export default DeviceItem;