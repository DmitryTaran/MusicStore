import React, {useContext} from 'react';
import classes from './NavBar.module.css'
import Button from "../UI/Button/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Modal from "../UI/Modal/Modal";
import {useState} from "react";
import AuthForm from "../AuthForm/AuthForm";
import AdminTools from "../AdminTools";

const NavBar = observer(() => {

    const {user} = useContext(Context)

    const [authActive, setAuthActive] = useState(false)

    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <div className={classes.navBar}>
            <div>
                <Link to={MAIN_ROUTE} className={classes.title}>Music-store</Link>
            </div>

            {user.isAuth

                ? <div style={{display: 'flex'}}>

                    {user.user.role === 'MODERATOR' &&
                        <AdminTools/>
                    }

                    {user.user.role === 'CLIENT' &&
                        <Button onClick={() => navigate(BASKET_ROUTE)}>Корзина</Button>
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