import React from 'react';
import Button from "../Button/Button";

const SubmitButton = ({submit, isDisabled, children}) => {

    const onSubmitButtonClick = () => {
        if (isDisabled)
            alert('Проверьте корректность введенных данных')
        else submit()
    }

    return (
        <Button onClick={onSubmitButtonClick}>
            {children}
        </Button>
    );
};

export default SubmitButton;