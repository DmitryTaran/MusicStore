import React, {useContext} from 'react';
import image from "../../assets/guitar.jpg";
import Button from "../UI/Button/Button";
import classes from './DeviceView.module.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {AiFillStar} from 'react-icons/ai'

const DeviceView = observer (({device}) => {

    const {basket, user} = useContext(Context)



    return (
        <div className={classes.deviceView}>

            <div style={{display: "flex"}}>
                <div className={classes.imageBlock}>
                    <img src={image} alt=""/>
                </div>

                <div className={classes.deviceName}>
                    <p>{device.name}</p>
                    <div className={classes.deviceViewRating}>
                        Рейтинг: {device.rating}
                        <AiFillStar size={30} color={'#f1ba30'}/>
                    </div>

                </div>
            </div>

            <div className={classes.deviceViewBtn}>
                <span className={classes.devicePrice}>Стоимость: {device.price}</span>
                {

                    basket.devices.find((d) => d.id === device.id)
                        ?   <div className={classes.deviceInBasketText}>
                            Товар в корзине
                        </div>
                        : <Button onClick={() => basket.setDevices([{...device, count: 1}, ...basket.devices])}>
                            Добавить в корзину
                        </Button>
                }

            </div>

        </div>
    );
});

export default DeviceView;