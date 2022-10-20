import React, {useRef, useState} from 'react';
import classes from './FileInput.module.css'
import Button from "../../Button/Button";

const FileInput = ({file, setFile, title, ...props}) => {

    const fileUploadRef = useRef()

    const onFileUpload = (e) => {
        if (e.target.files[0]){
            setFile(e.target.files[0])
        }
    }
    return (
        <div className={classes.fileInput}>
            <div className={classes.title}>{title}</div>
            <input
                ref={fileUploadRef}
                className={classes.fileUpload}
                type="file"
                   onChange={onFileUpload}
                {...props}
            />
            <Button
                onClick={() => fileUploadRef.current.click()}
            >
                Выбрать файл
            </Button>
            <span>{file.name}</span>

        </div>
    );
};

export default FileInput;