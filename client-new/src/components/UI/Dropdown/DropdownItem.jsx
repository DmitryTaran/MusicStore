import React from 'react';
import classes from './Dropdown.module.css'

const DropdownItem = (props) => {
    return (
        <div className={classes.dropdownItem} {...props}>
            {props.children}
        </div>
    );
};

export default DropdownItem;