import React, { useState } from 'react';
import { Button, Navbar, Table } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { IAPIGpu } from '../../../api/APIGpu.util';
import { AdminGpuEditFormComponent } from '../../../components/AdminGpuEditForm/AdminGpuEditForm.component';
import { AdminNavBarComponent } from '../../../components/AdminNavBar/AdminNavBar.component';
import { deleteGpuAction } from '../../../reducers/Gpu/Gpu.reducer';
import { TStore } from '../../../store';
import SAdmin from './AdminGpuEdit.module.scss';

export const AdminGpuEditPage = () => {
    const state = useSelector((state: TStore) => state.GpuReducer);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState<null | IAPIGpu>(null);
    const toggleEditForm = () => {
        setIsEditing((prev) => !prev);
    };

    const handleEdit = (gpu: IAPIGpu) => {
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
        dispatch(deleteGpuAction(id));
    };

    return (
        <div className={SAdmin.container}>
            <AdminNavBarComponent />
            <div className={SAdmin.tableWrapper}>
                <h2 className={SAdmin.title}>Видеокарты</h2>
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
                            <th>Название видеокарты</th>
                            <th>Коэффициент призводительности</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.gpu.map((gpu, index) => (
                            <tr key={gpu.name + index}>
                                <td>{index + 1}</td>
                                <td>{gpu.name}</td>
                                <td>{gpu.options.coef.toFixed(2)}</td>
                                <td>
                                    <Pencil
                                        className="mr-3"
                                        onClick={handleEdit.bind(
                                            undefined,
                                            gpu
                                        )}
                                    />
                                    <Trash
                                        onClick={handleDelete.bind(
                                            undefined,
                                            gpu.id
                                        )}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {isEditing && (
                    <AdminGpuEditFormComponent
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
