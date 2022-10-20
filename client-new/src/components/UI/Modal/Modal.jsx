import React, {useEffect, useRef} from 'react';
import classes from './Modal.module.css'
const Modal = ({active, setActive, children}) => {

    const inModal = useRef()

    const outsideClickListener = (e) => {
        if (e.target === inModal.current) setActive(false)
    }

    useEffect(() => {
        inModal?.current?.addEventListener('click', outsideClickListener)
        return () => {
            inModal?.current?.removeEventListener('click', outsideClickListener)
        }
    },[])

    return (
        <div className={active ? `${classes.modal} ${classes.modalActive}` : classes.modal} ref={inModal} >
            <div  className={classes.modalContent}>
                {children}
            </div>
        </div>
    );
};

export default Modal;