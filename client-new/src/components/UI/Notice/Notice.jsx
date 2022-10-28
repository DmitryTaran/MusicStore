import React from 'react';
import classes from './Notice.module.css'

const Notice = ({children, isSuccess, ...props}) => {
    return (
            <div
                className={isSuccess
                    ? `${classes.notice} ${classes.success}`
                    : `${classes.notice} ${classes.danger}`
            }
                {...props}
            >
                {children}
            </div>
    );
};

export default Notice;