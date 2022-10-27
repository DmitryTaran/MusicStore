import React, {useEffect, useMemo, useState} from 'react';
import Input from "../Input/TextInput/Input";
import classes from './Search.module.css'
import DropdownItem from "../Dropdown/DropdownItem";
import Dropdown from "../Dropdown/Dropdown";
import {useDropdown} from "../../../hooks/useDropdown";
import {useInput} from "../../../hooks/useInput";

const Search = ({manuals}) => {

    const [selectedManual, setSelectedManual] = useState({})

    const [openSearch, setOpenSearch, searchCloseRef] = useDropdown()


    const manualName
     = useInput('', [
        {
            condition: () => false, message: 'Выберите характеристику из списка'
        }
    ])

    const searchedManuals = useMemo(() => {
        if (manualName.value)
            return manuals.filter(manual => manual.name.toLowerCase().includes(manualName.value))
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
                style={{transform: 'translateX(-100%)'}}
            >
                {searchedManuals.map(manual =>
                    <DropdownItem key={manual.id} onClick={(e) => selectManual(manual)}>
                        {manual.name}
                    </DropdownItem>
                )}
            </Dropdown>
        </div>
    );
};

export default Search;