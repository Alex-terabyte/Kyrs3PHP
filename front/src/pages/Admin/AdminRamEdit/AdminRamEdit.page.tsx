import React, { useState } from 'react';
import { Button, Navbar, Table } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { IAPIRam } from '../../../api/APIRam.util';
import { AdminNavBarComponent } from '../../../components/AdminNavBar/AdminNavBar.component';
import { AdminRamEditFormComponent } from '../../../components/AdminRamEditForm/AdminRamEditForm.component';
import { deleteRamAction } from '../../../reducers/Ram/Ram.reducer';
import { TStore } from '../../../store';
import SAdmin from './AdminRamEdit.module.scss';

export const AdminRamEditPage = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: TStore) => state.RamReducer);
    const [isEditing, setIsEditing] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState<null | IAPIRam>(null);
    const toggleEditForm = () => {
        setIsEditing((prev) => !prev);
    };

    const handleEdit = (gpu: IAPIRam) => {
        setData(gpu);
        setIsEdit(true);
        toggleEditForm();
    };

    const handleCreate = () => {
        setData(null);
        setIsEdit(false);
        toggleEditForm();
    };

    const handleDelete = (id: number) => {
        dispatch(deleteRamAction(id));
    };
    return (
        <div className={SAdmin.container}>
            <AdminNavBarComponent />
            <div className={SAdmin.tableWrapper}>
                <h2 className={SAdmin.title}>Оперативная память</h2>
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
                            <th>Название оперативной памяти</th>
                            <th>Коэффициент производительности</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.ram.map((ram, index) => (
                            <tr key={ram.name + index}>
                                <td>{index + 1}</td>
                                <td>{ram.name}</td>
                                <td>{ram.options.coef}</td>
                                <td>
                                    <Pencil
                                        className="mr-3"
                                        onClick={handleEdit.bind(
                                            undefined,
                                            ram
                                        )}
                                    />
                                    <Trash
                                        onClick={handleDelete.bind(
                                            undefined,
                                            ram.id
                                        )}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {isEditing && (
                    <AdminRamEditFormComponent
                        data={data}
                        edit={isEdit}
                        isShowing={isEditing}
                        onHide={toggleEditForm}
                    />
                )}
            </div>
        </div>
    );
};
