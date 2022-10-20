import React, {useContext, useState} from 'react';
import Input from "../UI/Input/TextInput/Input";
import Button from "../UI/Button/Button";
import classes from './AuthForm.module.css'
import {Context} from "../../index";
import Form from "../UI/Form/Form";
import {useInput} from "../../hooks/useInput";
import {validateEmail, validateEmptiness, validateMinLength} from "../../utils/validations";
import {useForm} from "../../hooks/useForm";

const AuthForm = (props) => {

    const onSubmitButtonClick = () => {
        user.setIsAuth(true)
        props.setAuthActive(false)
    }

    const [isLogin, setIsLogin] = useState(false)

    const email = useInput('', [
            {condition: validateEmptiness, message: "Email не может быть пустым"},
            {condition: validateEmail, message: 'Некорректный email'}
        ])

    const password = useInput('',[
        {condition: validateEmptiness, message: "Пароль не может быть пустым"},
        {condition: validateMinLength, message: "Длина пароля не меньше 8 символов", option: 8},
    ])

    const {isSubmitButtonDisabled} = useForm([email, password], [email.errFlag, password.errFlag])

    const {user} = useContext(Context)

    return (
       <Form>
           <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>

           <div className={classes.formInputs}>
               <Input
                   type="text"
                   placeholder="Введите e-mail"
                   title={'E-mail'}
                   value={email.value}
                   onChange={email.onChange}
                   onBlur={email.onBlur}
                   onFocus={email.onFocus}
                   errorMessage={email.error}
               />
               <Input
                   type="password"
                   placeholder="Введите пароль"
                   title={'Пароль'}
                   value={password.value}
                   onChange={password.onChange}
                   onBlur={password.onBlur}
                   onFocus={password.onFocus}
                   errorMessage={password.error}
               />
           </div>

           {isLogin
               ?  <div className={classes.entering}>

                   <div className={classes.haveAccount}>
                       Нет аккаунта? <span onClick={() => setIsLogin(false)}>Зарегистрируйтесь</span>
                   </div>
                   <Button onClick={() => onSubmitButtonClick()}
                       disabled={isSubmitButtonDisabled}
                   >
                       Войти
                   </Button>
               </div>

               : <div className={classes.entering}>
                   <div className={classes.haveAccount}>
                       Есть аккаунт? <span onClick={() => setIsLogin(true)}>Войдите</span>
                   </div>
                   <Button >Зарегистрироваться</Button>
               </div>
           }
       </Form>
);
};

export default AuthForm;