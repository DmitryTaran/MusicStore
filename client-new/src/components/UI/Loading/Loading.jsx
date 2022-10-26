import React from 'react';
import classes from './Loading.module.css'

const Loading = ({isLoading}) => {
    return (
        <div className={isLoading ? `${classes.loading} ${classes.active}` : classes.loading}>
            <div className={classes.loadingContent}>
                <div className={classes.loader}></div>
                <div>Загрузка...</div>
            </div>
        </div>
    );
};

export default Loading;