import React, {useState} from 'react';
import classes from './CreateOrderPanel.module.css'
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import CreateOrderForm from "../CreateOrderForm/CreateOrderForm";
const CreateOrderPanel = ({totalPrice, isVisible}) => {

    const [isCreateOrderActive, setIsCreateOrderActive] = useState(false)
    return (
            <div className={isVisible ? classes.orderPanel : `${classes.orderPanel} ${classes.invisible}`} >
                <div>
                    Общая стоимость: {totalPrice}
                </div>
                <Button onClick={() => setIsCreateOrderActive(true)}>
                    Приступить к оформлению
                </Button>

                <Modal
                    active={isCreateOrderActive}
                    setActive={setIsCreateOrderActive}
                >
                    <CreateOrderForm setCreateOrderActive={setIsCreateOrderActive}/>
                </Modal>
            </div>

    );
};

export default CreateOrderPanel;