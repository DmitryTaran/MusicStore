import React, {useContext, useState} from 'react';
import Input from "../UI/Input/TextInput/Input";
import FileInput from "../UI/Input/FileInput/FileInput";
import classes from './CreateDeviceForm.module.css'
import Form from "../UI/Form/Form";
import {useInput} from "../../hooks/useInput";
import {validateEmptiness, validateIntegrity, validatePositiveness} from "../../utils/validations";
import Search from "../UI/Search/Search";
import Button from "../UI/Button/Button";
import SubmitButton from "../UI/SubmitButton/SubmitButton";
import {useForm} from "../../hooks/useForm";
import {useFetching} from "../../hooks/useFetching";
import {useEffect} from "react";
import {Context} from "../../index";
import {createDevice} from "../../http/deviceAPI";
import Loading from "../UI/Loading/Loading";



const CreateDeviceForm = ({setCreateDeviceActive}) => {

    const {notice, device} = useContext(Context)

    const [changingArrayFlag, setChangingArrayFlag] = useState(false)

    const addNewInfo = () => {
        setDeviceInfos([...deviceInfos, {manualId: 0, description: '', id: Date.now(), errFlag: true}])
    }
    const removeInfo = (info) => {
        setDeviceInfos(deviceInfos.filter(i => i.id !== info.id))
    }

    const [deviceInfos, setDeviceInfos] = useState([])
    const [deviceInfosErrFlags, setDeviceInfosErrFlags] = useState([])
    const [img, setImg] = useState({})
    const deviceName = useInput('', [
        {condition: validateEmptiness, message: "Поле не может быть пустым"},
    ])
    const price = useInput(0, [
        {condition: validateEmptiness, message: "Поле не может быть пустым"},
        {condition: validatePositiveness, message: "Стоимость не может быть отрицательной"},
        {condition: validateIntegrity, message: "Стоимость является целым числом"},
    ])


    useEffect(() => {
        setDeviceInfosErrFlags(deviceInfos.map((info) => info.errFlag))
    }, [changingArrayFlag, deviceInfos])


    const {isSubmitButtonDisabled} = useForm(
        [
            deviceName.errFlag,
            price.errFlag,
            ...deviceInfosErrFlags
        ]
    )

    const [createDevices, isCreateDeviceLoading, createDeviceMessage] = useFetching(async () => {
        const formData = new FormData()
        formData.append('name', deviceName.value)
        formData.append('price', `${price.value}`)
        formData.append('img', img)
        formData.append('info', JSON.stringify(deviceInfos))

        await createDevice(formData).then((data) => {
            device.setDevices([...device.devices, data])
            device.setTotalCount(device.totalCount + 1)
        })

        setCreateDeviceActive(false)

    }, 'Товар успешно создан')

    useEffect(() => {
        if (createDeviceMessage.message)
            notice.addNotice(createDeviceMessage)
    }, [createDeviceMessage])

    return (
        <Form>
            <Loading isLoading={isCreateDeviceLoading}/>

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
                            <Search
                                info={info}
                                changingFlag={changingArrayFlag}
                                setChangingFlag={setChangingArrayFlag}
                            />
                            <Button onClick={() => removeInfo(info)}
                            >
                                Удалить
                            </Button>
                        </div>
                    )
                }

                <SubmitButton isDisabled={isSubmitButtonDisabled} submit={createDevices}>
                    Добавить товар
                </SubmitButton>
            </div>

        </Form>
    );
};

export default CreateDeviceForm;