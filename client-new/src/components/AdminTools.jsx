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
import RestoringForm from "./RestoringForm/RestoringForm";
import SetRoleForm from "./SetRoleForm/SetRoleForm";


const AdminTools = () => {

    const {user, notice} = useContext(Context)

    const [createDeviceFormActive, setCreateDeviceFormActive] = useState(false)
    const [createManualFormActive, setCreateManualFormActive] = useState(false)
    const [roleFormActive, setRoleFormActive] = useState(false)
    const [restoringFormActive, setRestoringFormActive] = useState(false)
    const [openAdminTool, setOpenAdminTool, dropdownRef] = useDropdown()

    const [dumping, isDumpingLoading, dumpingMessage] = useFetching(async () => {
        await dump().then(data => notice.addNotice({message: data, isSuccess: true}))
    })

    useEffect(() => {
        if (dumpingMessage.message)
            notice.addNotice(dumpingMessage)
    }, [dumpingMessage])

    return (
        <div>
            <Loading isLoading={isDumpingLoading}/>
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
                            <DropdownItem onClick={() => setRoleFormActive(true)}>
                                Раздача ролей
                            </DropdownItem>
                            <DropdownItem onClick={() => {
                                setRestoringFormActive(true)
                                setOpenAdminTool(false)
                            }
                            }>
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
                active={roleFormActive}
                setActive={setRoleFormActive}
            >
                <SetRoleForm setActive={setRoleFormActive}/>
            </Modal>
            <Modal
                active={createManualFormActive}
                setActive={setCreateManualFormActive}
            >
                <CreateManualForm
                    setCreateManualActive={setCreateManualFormActive}
                />
            </Modal>
            <Modal
                active={restoringFormActive}
                setActive={setRestoringFormActive}
            >
                <RestoringForm
                    setRestoringFormActive={setRestoringFormActive}
                />
            </Modal>
        </div>
    );
};

export default AdminTools;