import {useState} from "react";

export const useFetching = (callback) => {

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')


    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
           setMessage(e?.response?.data?.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, message]
}
