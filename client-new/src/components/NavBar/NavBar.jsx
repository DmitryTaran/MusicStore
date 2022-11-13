import React, {useContext} from 'react';
import classes from './NavBar.module.css'
import Button from "../UI/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {BASKET_ROUTE, MAIN_ROUTE, MY_ORDERS_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Modal from "../UI/Modal/Modal";
import {useState} from "react";
import AuthForm from "../AuthForm/AuthForm";
import AdminTools from "../AdminTools";

const NavBar = observer(() => {

    const {user, basket} = useContext(Context)

    const [authActive, setAuthActive] = useState(false)

    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        basket.setBasket({})
        basket.setDevices([])
        localStorage.removeItem('token')
        navigate(MAIN_ROUTE)
    }

    return (
        <div className={classes.navBar}>
            <div>
                <Link to={MAIN_ROUTE} className={classes.title}>Music-store</Link>
            </div>

            {user.isAuth

                ? <div style={{display: 'flex'}}>

                    {((user.user.role === 'MODERATOR') || ( user.user.role ==='ADMIN')) &&
                        <AdminTools/>
                    }

                    {user.user.role === 'CLIENT' &&
                        <>
                            <Button onClick={() => navigate(MY_ORDERS_ROUTE)}>Мои заказы</Button>
                            <Button onClick={() => navigate(BASKET_ROUTE)}>Корзина</Button>
                        </>

                    }

                    <Button onClick={() => logOut()}>Выйти</Button>
                </div>
                : <Button onClick={() => setAuthActive(true)}>Авторизация</Button>
            }
            <Modal active={authActive} setActive={setAuthActive}>
                <AuthForm setAuthActive={setAuthActive}/>
            </Modal>
        </div>
    );
});

export default NavBar;