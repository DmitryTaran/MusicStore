import {useEffect, useState} from "react";

export const useValidation = (value, validations = [], isChecking) => {

    const [message, setMessage] = useState('')
    const [errFlag, setErrFlag] = useState(true)
    useEffect(() => {
        setMessage('')
        if (isChecking){
            for (let i = 0; i < validations.length; i++)
                if (validations[i].condition(value, validations[i].option)){
                    setMessage(validations[i].message)
                    setErrFlag(true)
                    break
                } else setErrFlag(false)
        }
    } , [isChecking, value])



    return [message, errFlag]
}
