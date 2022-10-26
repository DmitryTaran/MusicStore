import {useEffect, useState} from "react";

export const useForm = (errFlags) => {

    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true)

    useEffect(() => {
        if(errFlags.includes(true)){
            setIsSubmitButtonDisabled(true)
        } else setIsSubmitButtonDisabled(false)

    }, [errFlags])


    return {
        isSubmitButtonDisabled
    }
}