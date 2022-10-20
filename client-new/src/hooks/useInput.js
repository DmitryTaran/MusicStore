import {useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue, validations) => {

    const [value, setValue] = useState(initialValue)
    const [isChecking, setIsChecking] = useState(false)
    const [error, errFlag] = useValidation(value, validations, isChecking)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = () => {
        setIsChecking(true)
    }

    const onFocus = () => {
        setIsChecking(false)
    }

    return {
        value,
        onChange,
        onBlur,
        onFocus,
        error,
        errFlag,
        setValue
    }
}