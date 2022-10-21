import React from 'react';
import Dropdown from "./UI/Dropdown/Dropdown";
import DropdownItem from "./UI/Dropdown/DropdownItem";
import Modal from "./UI/Modal/Modal";
import {useState} from "react";
import CreateDeviceForm from "./CreateDeviceForm/CreateDeviceForm";
import CreateManualForm from "./CreateManualForm/CreateManualForm";
import Button from "./UI/Button/Button";
import {useDropdown} from "../hooks/useDropdown";
import {FiTool} from  'react-icons/fi'


const AdminTools = () => {

    const [createDeviceFormActive, setCreateDeviceFormActive] = useState(false)
    const [createManualFormActive, setCreateManualFormActive] = useState(false)

    const [openAdminTool, setOpenAdminTool, dropdownRef] = useDropdown()


    return (
        <div>
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
                </Dropdown>
            </div>
            <Modal
                active={createDeviceFormActive}
                setActive={setCreateDeviceFormActive}
            >
                <CreateDeviceForm/>
            </Modal>
            <Modal
                active={createManualFormActive}
                setActive={setCreateManualFormActive}
            >
                <CreateManualForm/>
            </Modal>
        </div>
    );
};

export default AdminTools;