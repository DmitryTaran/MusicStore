import React, {useState} from 'react';
import {formatDate} from "../../utils/formatDate";
import classes from './OrderItem.module.css'
import {getAllDevicesInOrder} from "../../http/orderAPI";

const OrderItem = ({order}) => {

    const [isShow, setIsShow] = useState(false)
    const [orderDetails, setOrderDetails] = useState([])

    const getOrderDetails = async (order) => {
        await getAllDevicesInOrder(order.id).then((data) => {
            console.log(data)
            setOrderDetails(data)
            setIsShow(true)
        })
    }

    return (
        <>
            <div key={order.id} className={classes.orderItem} onClick={() => {
                if (isShow)
                    setIsShow(false)
                else getOrderDetails(order)
            }}>
                <div className={classes.orderItemData}>
                    {formatDate(order.date)}
                </div>
                <div  className={classes.orderItemData}>
                    {order.totalCost} руб.
                </div>
                <div  className={classes.orderItemData}>
                    {order.delivery}
                </div>
                <div  className={classes.orderItemData}>
                    {order.status}
                </div>
            </div>

            {isShow &&
            <div className={classes.orderDetails}>
                <div className={classes.orderDetailTitle}>
                    <div className={classes.orderItemData}>Наименование</div>
                    <div className={classes.orderItemData}>Стоимость</div>
                    <div className={classes.orderItemData}>Количество</div>
                </div>

                {orderDetails.map((orderDetail) =>
                <div key={orderDetail.id} className={classes.orderDetail}>

                    <div className={classes.orderItemData}>{orderDetail.name}</div>
                    <div className={classes.orderItemData}>{orderDetail.price} </div>
                    <div className={classes.orderItemData}>{orderDetail.deviceInOrders[0].count}</div>


                </div>
                )}
            </div>
            }
        </>

            );
};

export default OrderItem;