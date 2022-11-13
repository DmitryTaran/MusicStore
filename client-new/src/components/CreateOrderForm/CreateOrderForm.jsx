import React, {useContext, useEffect, useState} from 'react';
import Form from "../UI/Form/Form";
import {useInput} from "../../hooks/useInput";
import {validateEmptiness} from "../../utils/validations";
import Input from "../UI/Input/TextInput/Input";
import classes from './CreateOrderForm.module.css'
import {useForm} from "../../hooks/useForm";
import SubmitButton from "../UI/SubmitButton/SubmitButton";
import {useFetching} from "../../hooks/useFetching";
import Loading from "../UI/Loading/Loading";
import {Context} from "../../index";
import {createNewOrder} from "../../http/orderAPI";
import {useNavigate} from "react-router-dom";
import {MAIN_ROUTE} from "../../utils/consts";

const CreateOrderForm = ({setCreateOrderActive}) => {

    const {notice, user, basket} = useContext(Context)
    const navigate = useNavigate()
    const delivery = useInput('',[
        {condition: validateEmptiness, message: "Введите способ доставки"}
    ])
    const {isSubmitButtonDisabled} = useForm([delivery.errFlag])



    const [createOrder, isCreateOrderLoading, createOrderMessage] = useFetching( async () => {
         await createNewOrder(user.user.id, basket.basket.id, 'Оформлен', delivery.value, basket.totalCost)
             .then((data) => {
                 notice.addNotice({message: "Заказ успешно оформлен", isSuccess: true})
                 basket.setBasket(data)
                 basket.setDevices([])
                 navigate(MAIN_ROUTE)
             })
    }, )


    return (
        <Form>

            <Loading isLoading={isCreateOrderLoading}/>

            <h2>Оформление заказа</h2>

            <div className={classes.formInputs}>
                <Input
                    placeholder={'Введите способ доставки'}
                    value={delivery.value}
                    title={'Способ доставки'}
                    onChange={delivery.onChange}
                    onBlur={delivery.onBlur}
                    onFocus={delivery.onFocus}
                    errorMessage={delivery.error}
                />

                <div>
                    <h2>Позиции заказа</h2>
                    <table className={classes.orderTable}>
                        <thead>
                        <tr>
                            <td className={classes.tableData}>Наименование</td>
                            <td className={classes.tableData}>Количество</td>
                            <td className={classes.tableData}>Стоимость</td>
                        </tr>
                        </thead>
                        <tbody>
                        {basket.devices.map(device =>
                            <tr key={device.id}>
                                <td className={classes.tableData}>{device.name}</td>
                                <td className={classes.tableData}>{device.deviceInOrders[0].count}</td>
                                <td className={classes.tableData}>{device.price}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    <h3>Общая стоимость: {basket.totalCost}</h3>

                </div>

                <div className={classes.btnBlock}>
                    <SubmitButton isDisabled={isSubmitButtonDisabled} submit={createOrder}>
                        Оформить
                    </SubmitButton>

                </div>



            </div>

        </Form>
    );
};

export default CreateOrderForm;