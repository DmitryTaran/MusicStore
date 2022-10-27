import {useEffect, useState} from "react";

export const useNotice = () => {

    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        if (isActive) setTimeout(() => {
            setIsActive(false)
        }, 5000)
    }, [isActive])

    return [isActive, setIsActive]
}