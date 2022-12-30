import React, {useContext, useEffect, useState} from 'react';
import Button from "../UI/Button/Button";
import classes from './DeviceView.module.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {AiFillStar} from 'react-icons/ai'
import {useFetching} from "../../hooks/useFetching";
import {addDeviceToOrder} from "../../http/orderAPI";
import Loading from "../UI/Loading/Loading";
import Modal from "../UI/Modal/Modal";
import UpdateDeviceForm from "../UpdateDeviceForm/UpdateDeviceForm";

const DeviceView = observer (({device}) => {

    const {basket, user, notice, oneDevice} = useContext(Context)
    const [isUpdateDeviceActive, setIsUpdateDeviceActive] = useState(false)
    const [addToBasket, isAddToBasketLoading, addToBasketMessage] = useFetching(async () => {
        await addDeviceToOrder(basket.basket.id, device.id, 1).then(data => {
            basket.setDevices([{...device, deviceInOrders: [{count: 1}]}, ...basket.devices])
        })
    }, 'Товар добавлен в корзину')

    useEffect(() => {
        if (addToBasketMessage.message)
            notice.addNotice(addToBasketMessage)
    }, [addToBasketMessage])

    return (
        <div className={classes.deviceView}>
            <Loading isLoading={isAddToBasketLoading}/>
            <div style={{display: "flex"}}>
                <div className={classes.imageBlock}>
                    <img src={process.env.REACT_APP_API_URL + device.img} alt=""/>
                </div>

                <div className={classes.deviceName}>
                    <p>{device.name}</p>
                    <div className={classes.deviceViewRating}>
                        Рейтинг: {oneDevice.rating}
                        <AiFillStar size={30} color={'#f1ba30'}/>
                    </div>

                </div>
            </div>

            <div className={classes.deviceViewBtn}>
                <span className={classes.devicePrice}>Стоимость: {device.price}</span>
                {user.user.role === 'CLIENT' &&
                    <div>
                        {

                            basket.devices.find((d) => d.id === device.id)
                                ? <div className={classes.deviceInBasketText}>
                                    Товар в корзине
                                </div>
                                : <Button onClick={addToBasket}>
                                    Добавить в корзину
                                </Button>
                        }
                    </div>
                }
                {
                    (user.user.role === 'MODERATOR' || user.user.role === 'ADMIN') &&

                    <>
                        <Button onClick={() => setIsUpdateDeviceActive(true)}>
                            Редактировать
                        </Button>
                        <Modal setActive={setIsUpdateDeviceActive} active={isUpdateDeviceActive}>
                            <UpdateDeviceForm setUpdateDeviceActive={setIsUpdateDeviceActive}/>
                        </Modal>
                    </>

                }


            </div>


        </div>
    );
});

export default DeviceView;