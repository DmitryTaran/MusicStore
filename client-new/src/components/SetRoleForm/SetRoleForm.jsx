import React, {useContext, useEffect, useState} from 'react';
import Form from "../UI/Form/Form";
import Input from "../UI/Input/TextInput/Input";
import Select from "../UI/Select/Select";
import {useInput} from "../../hooks/useInput";
import {validateEmptiness} from "../../utils/validations";
import SubmitButton from "../UI/SubmitButton/SubmitButton";
import classes from './SetRoleForm.module.css'
import {useFetching} from "../../hooks/useFetching";
import {setRole, updateUserRole} from "../../http/userAPI";
import {useForm} from "../../hooks/useForm";
import notice from "../UI/Notice/Notice";
import {Context} from "../../index";
import Loading from "../UI/Loading/Loading";

const SetRoleForm = ({setActive}) => {

    const {notice} = useContext(Context)

    const [setUserRole, isSetUserRoleLoading, userRoleMessage] = useFetching(async () => {
        await updateUserRole(email.value, role)
        setActive(false)
    }, 'Роль успешно установлена')

    const email = useInput('', [
        {condition: validateEmptiness, message: "Email не может быть пустым"},
    ])

    const [role, setRole] = useState('CLIENT')
    const {isSubmitButtonDisabled} = useForm([email.errFlag])

    useEffect(() => {
        if (userRoleMessage.message)
            notice.addNotice(userRoleMessage)
    }, [userRoleMessage])

    return (
        <Form>

            <Loading isLoading={isSetUserRoleLoading}/>

            <h2>Задать роль</h2>

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
                <Select onChange={(e) => setRole(e.target.value)}>
                    <option value="CLIENT">Клиент</option>
                    <option value="MODERATOR">Модератор</option>
                    <option value="ADMIN">Администратор</option>
                </Select>

                <SubmitButton isDisabled={isSubmitButtonDisabled} submit={setUserRole}>
                    Сохранить изменения
                </SubmitButton>
            </div>


        </Form>
    );
};

export default SetRoleForm;