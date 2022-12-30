import React, {useContext, useEffect, useState} from 'react';
import classes from './RestoringForm.module.css'
import Form from "../UI/Form/Form";
import {useFetching} from "../../hooks/useFetching";
import {getAllDumps, restore} from "../../http/adminAPI";
import Loading from "../UI/Loading/Loading";
import {Context} from "../../index";

const RestoringForm = ({setRestoringFormActive}) => {

    const [dumps, setDumps] = useState([])
    const {notice} = useContext(Context)
    const [getDumps, isGetDumpsLoading, getDumpsMessage] = useFetching(async () => {
        await getAllDumps().then((data) => setDumps(data))
    })
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        getDumps()
    }, [])

    useEffect(() => {
        if (getDumpsMessage.message)
            notice.addNotice(getDumpsMessage)
    }, [getDumpsMessage])

    return (
        <Form>
            <Loading isLoading={isGetDumpsLoading || isLoading}/>

            <h2>Выберите файл</h2>

            <div className={classes.dumps}>
                {
                    dumps.map((dump) =>
                        <div className={classes.dumpNames} key={dump} onClick={async () =>  {
                            setIsLoading(true)
                            await restore(dump)
                                .catch(data => {
                                    console.log(data)
                                   /* notice.addNotice({message: data, isSuccess: false})*/
                                })
                                .then((data) => notice.addNotice({message: data, isSuccess: true}))
                                .finally(() =>  setIsLoading(false))
                        }}
                        >
                            {dump}
                        </div>
                    )
                }
            </div>

        </Form>
    );
};

export default RestoringForm;