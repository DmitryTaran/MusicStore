import React from 'react';
import classes from './Notice.module.css'

const Notice = ({children, isActive}) => {
    return (
            <div className={isActive ? `${classes.notice} ${classes.active}` : classes.notice}>
                {children}
            </div>
    );
};

export default Notice;