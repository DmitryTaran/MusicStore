import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import {getAllDevicesInOrder, getOrders} from "../http/orderAPI";
import {Context} from "../index";
import Loading from "../components/UI/Loading/Loading";
import {formatDate} from "../utils/formatDate";
import Button from "../components/UI/Button/Button";
import {login} from "../http/userAPI";
import OrderItem from "../components/OrderItem/OrderItem";

const MyOrdersPage = () => {

    const {user} = useContext(Context)

    const [orders, setOrders] = useState([])


    const [getAllOrders, isGetAllOrdersLoading, getAllOrdersMessage] = useFetching(async () => {
            await getOrders(user.user.id).then((data) => {
                const filteredOrders = data.filter((order) => order.status !== null)
                const statefulOrders = filteredOrders.map((order) => {
                    return  {...order, isActive: false}
                })
                setOrders(statefulOrders)
            })
    })

    useEffect(() => {
        getAllOrders()
    }, [])

    if (isGetAllOrdersLoading)
       return (
           <Loading isLoading={isGetAllOrdersLoading}/>
       )


     if ( orders.length === 0)
         return (
             <div className="orderPage">
                 <h1>Мои заказы</h1>
                 <div className="emptyPage">Вы не оформили ни одного заказа</div>
                 </div>
         )

    return (
        <div className="orderPage">
            <h1>Мои заказы</h1>
            <div>
                <div className="orderItemTitle">
                    <div className="orderItemData">
                        Дата
                    </div>
                    <div  className="orderItemData">
                        Стоимость
                    </div>
                    <div  className="orderItemData">
                        Способ доставки
                    </div>
                    <div  className="orderItemData">
                        Статус
                    </div>
                </div>
                {orders.map((order) =>
                    <OrderItem key={order.id} order={order}/>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;