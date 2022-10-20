import React from 'react';
import Form from "../UI/Form/Form";
import {useInput} from "../../hooks/useInput";
import {validateEmptiness} from "../../utils/validations";
import Input from "../UI/Input/TextInput/Input";
import classes from './CreateManualForm.module.css'
import Button from "../UI/Button/Button";

const CreateManualForm = () => {

    const manualName = useInput('',[
        {condition: validateEmptiness, message: "Имя характеристики не может быть пустым"}
    ] )

    //const isSubmitButtonActive

    return (
        <Form>
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
                    <Button>Создать</Button>
                </div>

            </div>






        </Form>
    );
};

export default CreateManualForm;