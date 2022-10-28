import React, {useContext} from 'react';
import Button from "../Button/Button";
import {Context} from "../../../index";

const SubmitButton = ({submit, isDisabled, children}) => {

    const {notice} = useContext(Context)

    const onSubmitButtonClick = () => {
        if (isDisabled)
            notice.addNotice({message: 'Проверьте корректность введенных данных', isSuccess: false})
        else submit()
    }

    return (
        <Button onClick={onSubmitButtonClick}>
            {children}
        </Button>
    );
};

export default SubmitButton;