import React, {useEffect, useState} from 'react';
import classes from './Input.module.css'

const Input = ({title, errorMessage, ...props}) => {

    return (

        <div className={!!errorMessage ? `${classes.inputBlock} ${classes.inputBlockDanger}` : classes.inputBlock}>
            <input className={classes.Input} {...props} />
            <div className={!!errorMessage ? `${classes.title} ${classes.titleDanger}` : classes.title}>
                    {title}
            </div>
            <div
                className={!!errorMessage ? `${classes.errMessage} ${classes.errMessageAppear}`: classes.errMessage}>
                    {errorMessage}
            </div>

        </div>
    );
};

export default Input;