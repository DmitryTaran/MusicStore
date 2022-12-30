import React from 'react';
import classes from './Select.module.css'
const Select = ({children, ...props}) => {
    return (
        <select className={classes.select} {...props}>
            {children}
        </select>
    );
};

export default Select;