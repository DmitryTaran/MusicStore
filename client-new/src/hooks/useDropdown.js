import {useRef, useState} from "react";

export const useDropdown = () => {

    const [open, setOpen] = useState(false)
    const dropdownClosingRef = useRef()

    return [
        open,
        setOpen,
        dropdownClosingRef
    ]

}