import React, {useContext, useState} from 'react';
import classes from './TypeBar.module.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useFetching} from "../../hooks/useFetching";
import {useEffect} from "react";
import {getAllManuals, getAllTypes} from "../../http/deviceAPI";
import Loading from "../UI/Loading/Loading";

const TypeBar = observer (() => {

    const {device} = useContext(Context)

    const [
        fetchTypes,
        isFetchTypesLoading,
        fetchTypesError
    ] = useFetching(async () => {

        await getAllManuals().then(data => {
            device.setManuals(data)
        })

        await getAllTypes().then(data => {
            device.setTypes([{description: 'Все товары'}, ...data])
            device.setSelectedType({description: 'Все товары'})
        })

    })

    useEffect(() => {
        fetchTypes()
    }, [])

    return (
        <div className={classes.wrap}>
            <Loading isLoading={isFetchTypesLoading}/>
            <div className={classes.typeBar}>
                {device.types.map(type =>
                    <div key={type.description}
                         className={
                        device.selectedType.description === type.description
                             ? classes.itemSelected
                             : classes.item
                    }
                         onClick={() => {
                             device.setSelectedType(type)
                             device.setPage(1)
                         }}
                    >
                        {type.description}
                    </div>
                )}
            </div>

        </div>
    );
});

export default TypeBar;