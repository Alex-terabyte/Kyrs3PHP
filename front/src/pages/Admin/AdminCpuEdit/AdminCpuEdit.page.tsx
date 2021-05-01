import React, { useState } from 'react';
import { Button, Navbar, Table } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { IAPICpu } from '../../../api/APICpu.util';
import { AdminCpuEditFormComponent } from '../../../components/AdminCpuEditForm/AdminCpuEditForm.component';
import { AdminNavBarComponent } from '../../../components/AdminNavBar/AdminNavBar.component';
import { deleteCpuAction } from '../../../reducers/Cpu/Cpu.reducer';
import { TStore } from '../../../store';
import SAdmin from './AdminCpuEdit.module.scss';

export const AdminCpuEditPage = () => {
    const state = useSelector((state: TStore) => state.CpuReducer);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState<null | IAPICpu>(null);
    const toggleEditForm = () => {
        setIsEditing((prev) => !prev);
    };

    const handleEdit = (cpu: IAPICpu) => {
        setData(cpu);
        setIsEdit(true);
        toggleEditForm();
    };

    const handleCreate = () => {
        setData(null);
        setIsEdit(false);
        toggleEditForm();
    };

    const handleDelete = (id: number) => {
        dispatch(deleteCpuAction(id));
    };
    return (
        <div className={SAdmin.container}>
            <AdminNavBarComponent />
            <div className={SAdmin.tableWrapper}>
                <h2 className={SAdmin.title}>Процессоры</h2>
                <Navbar className={SAdmin.tableNav} bg="dark" variant="dark">
                    <Button
                        className="ml-auto"
                        variant="success"
                        onClick={handleCreate}
                    >
                        Добавить
                    </Button>
                </Navbar>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название процессора</th>
                            <th>Коэффициент производительности</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.cpu.map((cpu, index) => (
                            <tr key={cpu.name + index}>
                                <td>{index + 1}</td>
                                <td>{cpu.name}</td>
                                <td>{cpu.options.coef.toFixed(2)}</td>
                                <td>
                                    <Pencil
                                        className="mr-3"
                                        onClick={handleEdit.bind(
                                            undefined,
                                            cpu
                                        )}
                                    />
                                    <Trash
                                        onClick={handleDelete.bind(
                                            undefined,
                                            cpu.id
                                        )}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {isEditing && (
                    <AdminCpuEditFormComponent
                        edit={isEdit}
                        data={data}
                        isShowing={isEditing}
                        onHide={toggleEditForm}
                    />
                )}
            </div>
        </div>
    );
};
