import React from 'react';
import classes from './CreateOrderPanel.module.css'
import Button from "../UI/Button/Button";
const CreateOrderPanel = ({totalPrice}) => {
    return (

            <div className={classes.orderPanel}>
                <div>
                    Общая стоимость: {totalPrice}
                </div>
                <Button>
                    Приступить к оформлению
                </Button>
            </div>

    );
};

export default CreateOrderPanel;