import React, {useContext, useState} from 'react';
import Input from "../UI/Input/TextInput/Input";
import FileInput from "../UI/Input/FileInput/FileInput";
import classes from './UdpateDevice.module.css'
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
import {createDevice, putDevice} from "../../http/deviceAPI";
import Loading from "../UI/Loading/Loading";



const UpdateDeviceForm = ({setUpdateDeviceActive}) => {

    const {notice, device, oneDevice} = useContext(Context)

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

    useEffect(() => {
        deviceName.setValue(oneDevice.device.name)
        price.setValue(oneDevice.device.price)
        setDeviceInfos(oneDevice.deviceInfos)
        deviceName.onBlur()
        price.onBlur()
    }, [])

    const {isSubmitButtonDisabled} = useForm(
        [
            deviceName.errFlag,
            price.errFlag,
            ...deviceInfosErrFlags
        ]
    )

    const [updateDevice, isUpdateDeviceLoading, updateDeviceMessage] = useFetching(async () => {
        const formData = new FormData()
        formData.append('id', oneDevice.device.id)
        formData.append('name', deviceName.value)
        formData.append('price', `${price.value}`)
        formData.append('img', img)
        formData.append('info', JSON.stringify(deviceInfos))

        await putDevice(formData)
        setUpdateDeviceActive(false)

    }, 'Изменения успешно сохранены')

    useEffect(() => {
        if (updateDeviceMessage.message)
            notice.addNotice(updateDeviceMessage)
    }, [updateDeviceMessage])

    return (
        <Form>
            <Loading isLoading={isUpdateDeviceLoading}/>

            <h2>Редактирование товара</h2>

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

                <SubmitButton isDisabled={isSubmitButtonDisabled} submit={updateDevice}>
                    Сохранить изменения
                </SubmitButton>
            </div>

        </Form>
    );
};

export default UpdateDeviceForm;