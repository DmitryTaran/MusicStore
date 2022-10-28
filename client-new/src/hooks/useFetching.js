import {useState} from "react";

export const useFetching = (callback, successMessage) => {

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({})

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
            setMessage({message: successMessage, isSuccess: true})
        } catch (e) {
            setMessage({message: e?.response?.data?.message, isSuccess: false})

        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, message]
}
