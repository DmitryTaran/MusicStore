import React, {useContext, useState} from 'react';
import Input from "../UI/Input/TextInput/Input";
import classes from './AuthForm.module.css'
import {Context} from "../../index";
import Form from "../UI/Form/Form";
import {useInput} from "../../hooks/useInput";
import {validateEmail, validateEmptiness, validateMinLength} from "../../utils/validations";
import {useForm} from "../../hooks/useForm";
import {login, registration} from "../../http/userAPI";
import {observer} from "mobx-react-lite";
import {useFetching} from "../../hooks/useFetching";
import Loading from "../UI/Loading/Loading";
import SubmitButton from "../UI/SubmitButton/SubmitButton";

const AuthForm = observer(({setAuthActive, ...props}) => {

    const {user} = useContext(Context)

    const [signInWithRegistration,
        isRegistrationDataLoading,
        registrationError] = useFetching(async () => {
        await registration(email.value, password.value).then((data) => {
            user.setUser(data)
            user.setIsAuth(true)
            setAuthActive(false)
        })
    })

    const [signInWithAuthorization,
        isAuthorizationDataLoading,
        authorizationError] = useFetching(async () => {
        const data = await login(email.value, password.value)
        user.setUser(data)
        user.setIsAuth(true)
        setAuthActive(false)
    })

    const [isLogin, setIsLogin] = useState(true)

    const email = useInput('', [
        {condition: validateEmptiness, message: "Email не может быть пустым"},
        {condition: validateEmail, message: 'Некорректный email'}
    ])

    const password = useInput('', [
        {condition: validateEmptiness, message: "Пароль не может быть пустым"},
        {condition: validateMinLength, message: "Длина пароля не меньше 8 символов", option: 8},
    ])

    const {isSubmitButtonDisabled} = useForm([email.errFlag, password.errFlag])


    return (
        <Form>
            <Loading isLoading={isRegistrationDataLoading || isAuthorizationDataLoading}/>
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
                ? <div className={classes.entering}>
                    <div className={classes.haveAccount}>
                        Нет аккаунта? <span onClick={() => setIsLogin(false)}>Зарегистрируйтесь</span>
                    </div>
                    <SubmitButton submit={signInWithAuthorization} isDisabled={isSubmitButtonDisabled}>
                        Войти
                    </SubmitButton>
                </div>

                : <div className={classes.entering}>
                    <div className={classes.haveAccount}>
                        Есть аккаунт? <span onClick={() => setIsLogin(true)}>Войдите</span>
                    </div>
                    <SubmitButton submit={signInWithRegistration} isDisabled={isSubmitButtonDisabled}>
                        Зарегистрироваться
                    </SubmitButton>
                </div>
            }

            {
                !!authorizationError && <div>
                    {authorizationError}
                </div>
            }
            {
                !!registrationError && <div>
                    {registrationError}
                </div>
            }

        </Form>
    );
});

export default AuthForm;