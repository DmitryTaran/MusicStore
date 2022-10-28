import React from 'react';
import classes from './DeviceInfosList.module.css'
const DeviceInfosList = ({deviceInfos}) => {
    return (
        <div className={classes.deviceInfosList}>
            <h2>Характеристики</h2>
            <div>
                {deviceInfos.map(info =>
                    <div key={info.id} className={classes.deviceInfoItem}>
                        <div>{info?.manual?.name}:</div>
                        <div>{info.description}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceInfosList;