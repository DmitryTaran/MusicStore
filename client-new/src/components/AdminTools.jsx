import React, {useContext, useEffect} from 'react';
import Dropdown from "./UI/Dropdown/Dropdown";
import DropdownItem from "./UI/Dropdown/DropdownItem";
import Modal from "./UI/Modal/Modal";
import {useState} from "react";
import CreateDeviceForm from "./CreateDeviceForm/CreateDeviceForm";
import CreateManualForm from "./CreateManualForm/CreateManualForm";
import Button from "./UI/Button/Button";
import {useDropdown} from "../hooks/useDropdown";
import {FiTool} from 'react-icons/fi'
import {Context} from "../index";
import {dump, restore} from "../http/adminAPI";
import {useFetching} from "../hooks/useFetching";
import Loading from "./UI/Loading/Loading";


const AdminTools = () => {

    const {user, notice} = useContext(Context)

    const [createDeviceFormActive, setCreateDeviceFormActive] = useState(false)
    const [createManualFormActive, setCreateManualFormActive] = useState(false)
    const [openAdminTool, setOpenAdminTool, dropdownRef] = useDropdown()

    const [dumping, isDumpingLoading, dumpingMessage] = useFetching(async () => {
        await dump()
    }, 'Резервная копия создана успешно')

    const [restoring, isRestoringLoading, restoringMessage] = useFetching(async () => {
        await restore()
    }, 'База успешно восстановлена')

    useEffect(() => {
        if (dumpingMessage.message)
            notice.addNotice(dumpingMessage)
    }, [dumpingMessage])

    useEffect(() => {
        if (restoringMessage.message)
            notice.addNotice(restoringMessage)
    }, [restoringMessage])

    return (
        <div>
            <Loading isLoading={isDumpingLoading || isRestoringLoading}/>
            <div ref={dropdownRef}>
                <Button onClick={() => setOpenAdminTool(!openAdminTool)}>Инструменты</Button>
                <Dropdown
                    title='Админ панель'
                    open={openAdminTool}
                    setOpen={setOpenAdminTool}
                    ref={dropdownRef}
                >
                    <DropdownItem
                        onClick={() => {
                            setCreateDeviceFormActive(true)
                            setOpenAdminTool(false)
                        }
                        }
                    >
                        Добавить товар
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => {
                            setCreateManualFormActive(true)
                            setOpenAdminTool(false)
                        }
                        }
                    >
                        Добавить характеристику
                    </DropdownItem>
                    {
                        user.user.role === 'ADMIN' &&
                        <>
                            <DropdownItem onClick={dumping}>
                                Резервная копия
                            </DropdownItem>
                            <DropdownItem>
                                Отмена действия
                            </DropdownItem>
                            <DropdownItem onClick={restoring}>
                                Восстановление базы
                            </DropdownItem>
                        </>

                    }


                </Dropdown>
            </div>
            <Modal
                active={createDeviceFormActive}
                setActive={setCreateDeviceFormActive}
            >
                <CreateDeviceForm setCreateDeviceActive={setCreateDeviceFormActive}/>
            </Modal>
            <Modal
                active={createManualFormActive}
                setActive={setCreateManualFormActive}
            >
                <CreateManualForm
                    setCreateManualActive={setCreateManualFormActive}
                />
            </Modal>
        </div>
    );
};

export default AdminTools;