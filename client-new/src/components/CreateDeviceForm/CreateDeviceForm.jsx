import React, {useState} from 'react';
import Input from "../UI/Input/TextInput/Input";
import FileInput from "../UI/Input/FileInput/FileInput";
import classes from './CreateDeviceForm.module.css'
import Form from "../UI/Form/Form";
import {useInput} from "../../hooks/useInput";
import {validateEmptiness, validateIntegrity, validatePositiveness} from "../../utils/validations";
import Search from "../UI/Search/Search";
import Button from "../UI/Button/Button";


const CreateDeviceForm = () => {


    const addNewInfo = () => {
        setDeviceInfos([...deviceInfos, {manualId: 0, description: '', id: Date.now()}])
    }
    const removeInfo = (info) => {
        setDeviceInfos(deviceInfos.filter(i => i.id !== info.id))
    }

    const [deviceInfos, setDeviceInfos] = useState([])
    const [img, setImg] = useState({})

    const deviceName = useInput('', [
        {condition: validateEmptiness, message: "Поле не может быть пустым"},
    ])
    const price = useInput(0, [
        {condition: validateEmptiness, message: "Поле не может быть пустым"},
        {condition: validatePositiveness, message: "Стоимость не может быть отрицательной"},
        {condition: validateIntegrity, message: "Стоимость является целым числом"},
    ])

    return (
        <Form>
            <h2>Добавить товар</h2>

            <div className={classes.formInputs}>
                <Input
                    placeholder='Введите название товара'
                    type='text'
                    value={deviceName.value}
                    onChange={deviceName.onChange}
                    onBlur={deviceName.onBlur}
                    onFocus={deviceName.onFocus}
                    errorMessage={deviceName.error}
                    title={'Название товара'}
                />
                <Input
                    placeholder='Введите название товара'
                    type='number'
                    value={price.value}
                    onChange={price.onChange}
                    onBlur={price.onBlur}
                    onFocus={price.onFocus}
                    errorMessage={price.error}
                    title={'Стоимость'}
                />
                <FileInput
                    file={img}
                    setFile={setImg}
                    title={'Изоображение'}
                    accept={'.jpg,.jpeg,.png'}
                />

                <Button onClick={() => addNewInfo()}>Добавить новое свойство</Button>

                {
                    deviceInfos.map(info =>
                        <div key={info.id} className={classes.deviceInfoItem}>
                            <Search/>
                            <Input/>
                            <Button onClick={() => removeInfo(info)}
                            >
                                Удалить
                            </Button>
                        </div>
                    )
                }
            </div>

        </Form>
    );
};

export default CreateDeviceForm;