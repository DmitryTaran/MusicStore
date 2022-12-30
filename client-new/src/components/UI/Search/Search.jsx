import React, {useContext, useEffect, useMemo, useState} from 'react';
import Input from "../Input/TextInput/Input";
import classes from './Search.module.css'
import DropdownItem from "../Dropdown/DropdownItem";
import Dropdown from "../Dropdown/Dropdown";
import {useDropdown} from "../../../hooks/useDropdown";
import {useInput} from "../../../hooks/useInput";
import {Context} from "../../../index";
import {validateEmptiness} from "../../../utils/validations";
import {useForm} from "../../../hooks/useForm";

const Search = ({info, setChangingFlag, changingFlag}) => {

    const {device} = useContext(Context)



    useEffect(() => {
        const realInfo = {...info}
        const infoManual = {...realInfo.manual}
        setSelectedManual(infoManual)
        manualName.setValue(info?.manual?.name)
        infoDescription.setValue(info?.description)
        manualName.onBlur()
        infoDescription.onBlur()
    }, [])

    const [selectedManual, setSelectedManual] = useState({})

    const [openSearch, setOpenSearch, searchCloseRef] = useDropdown()
    const manualName
     = useInput('', [
        {
            condition:
                () => device.manuals.filter((manual) => manual.name === selectedManual.name).length === 0,
            message: 'Выберите характеристику из списка'
        }
    ])

    const infoDescription = useInput('',[
        {condition: validateEmptiness, message: "Введите описание характеристики"}
    ])

    const searchedManuals = useMemo(() => {
        if (manualName.value)
            return device.manuals.filter(manual => manual.name.toLowerCase().includes(manualName.value))
        else
            return []

    }, [manualName.value])

    const selectManual = (manual) => {
        setSelectedManual(manual)
        manualName.setValue(manual.name)
        setOpenSearch(false)
    }

    useEffect(() => {

        if (searchedManuals.length !== 0)
            setOpenSearch(true)
        else setOpenSearch(false)

    }, [manualName.value, searchedManuals])

    const {isSubmitButtonDisabled} = useForm([manualName.errFlag, infoDescription.errFlag])

    useEffect(() => {
        info.manualId = selectedManual.id
        info.description = infoDescription.value
        info.errFlag = isSubmitButtonDisabled
        setChangingFlag(!changingFlag)
    }, [selectedManual, infoDescription.value, isSubmitButtonDisabled])

    return (
        <div className={classes.searchBlock} ref={searchCloseRef}>
            <Input
                title={'Название характеристики'}
                value={manualName.value}
                onChange={manualName.onChange}
                onFocus={() => {
                    if (searchedManuals.length !== 0) setOpenSearch(true)
                    manualName.onFocus()
                }}
                onBlur={manualName.onBlur}
                errorMessage={manualName.error}
            />
            <Dropdown
                ref={searchCloseRef}
                open={openSearch}
                setOpen={setOpenSearch}
                style={{transform: 'translateX(30%)'}}
            >
                {searchedManuals.map(manual =>
                    <DropdownItem key={manual.id} onClick={(e) => selectManual(manual)}>
                        {manual.name}
                    </DropdownItem>
                )}
            </Dropdown>
            <Input
                title={'Описание характеристики'}
                value={infoDescription.value}
                onChange={infoDescription.onChange}
                onFocus={() => infoDescription.onFocus}
                onBlur={infoDescription.onBlur}
                errorMessage={infoDescription.error}
            />
        </div>
    );
};

export default Search;