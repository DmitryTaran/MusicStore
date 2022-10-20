import React, {useContext} from 'react';
import classes from './TypeBar.module.css'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const TypeBar = observer (() => {

    const {device} = useContext(Context)

    return (
        <div className={classes.wrap}>
            <div className={classes.typeBar}>
                {device.types.map(type =>
                    <div key={type.id}
                         className={
                        device.selectedType.description === type.description
                             ? classes.itemSelected
                             : classes.item
                    }
                         onClick={() => device.setSelectedType(type)}
                    >
                        {type.description}
                    </div>
                )}
            </div>

        </div>
    );
});

export default TypeBar;