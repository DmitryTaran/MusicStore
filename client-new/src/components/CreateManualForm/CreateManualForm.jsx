import React, {useContext, useEffect, useState} from 'react';
import Form from "../UI/Form/Form";
import {useInput} from "../../hooks/useInput";
import {validateEmptiness} from "../../utils/validations";
import Input from "../UI/Input/TextInput/Input";
import classes from './CreateManualForm.module.css'
import {useForm} from "../../hooks/useForm";
import SubmitButton from "../UI/SubmitButton/SubmitButton";
import {useFetching} from "../../hooks/useFetching";
import {createManual} from "../../http/deviceAPI";
import Loading from "../UI/Loading/Loading";
import {Context} from "../../index";
const CreateManualForm = ({setCreateManualActive}) => {

    const {notice} = useContext(Context)

    const manualName = useInput('',[
        {condition: validateEmptiness, message: "Имя характеристики не может быть пустым"}
    ])

    const {isSubmitButtonDisabled} = useForm([manualName.errFlag])

    const [createManuals, isCreateManualsLoading, createManualMessage] = useFetching(async () => {
        await createManual(manualName.value)
        setCreateManualActive(false)
    }, 'Характеристика успешно добавлена')

    useEffect(() => {
        if (createManualMessage.message)
            notice.addNotice(createManualMessage)
    }, [createManualMessage])

    return (
        <Form>

            <Loading isLoading={isCreateManualsLoading}/>

            <h2>Создание характеристики</h2>

            <div className={classes.formInputs}>
                <Input
                    placeholder={'Введите название характеристики'}
                    value={manualName.value}
                    title={'Название характеристики'}
                    onChange={manualName.onChange}
                    onBlur={manualName.onBlur}
                    onFocus={manualName.onFocus}
                    errorMessage={manualName.error}
                />
                <div className={classes.btnBlock}>
                    <SubmitButton isDisabled={isSubmitButtonDisabled} submit={createManuals}>
                        Создать
                    </SubmitButton>

                </div>
            </div>

        </Form>
    );
};

export default CreateManualForm;