import React, { useState } from 'react';
import { Button, Navbar, Table } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { IAPIGame } from '../../../api/APIGames.util';
import { AdminGameEditFormComponent } from '../../../components/AdminGameEditForm/AdminGameEditForm.component';
import { AdminNavBarComponent } from '../../../components/AdminNavBar/AdminNavBar.component';
import { deleteGameAction } from '../../../reducers/Games/Games.reducer';
import { TStore } from '../../../store';
import SAdmin from './AdminHome.module.scss';

export const AdminHomePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState<IAPIGame>({
        id: 0,
        name: '',
        options: [],
    });
    const state = useSelector((state: TStore) => state.GamesReducer);
    const dispatch = useDispatch();
    const toggleEditForm = () => {
        setIsEditing((prev) => !prev);
    };

    const handleCreateGame = () => {
        setIsEdit(false);
        setData({
            ...{
                id: 0,
                name: '',
                options: [
                    {
                        koef: 0,
                        fps: 0,
                    },
                ],
            },
        });
        toggleEditForm();
    };

    const handleEditGame = (game: IAPIGame) => {
        setData(game);
        setIsEdit(true);
        toggleEditForm();
    };

    const handleDeleteGame = (id: number) => {
        dispatch(deleteGameAction(id));
    };

    return (
        <div className={SAdmin.container}>
            <AdminNavBarComponent />
            <div className={SAdmin.tableWrapper}>
                <h2 className={SAdmin.title}>Игры</h2>
                <Navbar className={SAdmin.tableNav} bg="dark" variant="dark">
                    <Button
                        className="ml-auto"
                        variant="success"
                        onClick={handleCreateGame}
                    >
                        Добавить
                    </Button>
                </Navbar>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Название игры</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.games.map((game, index) => (
                            <tr key={game.name + index}>
                                <td>{index + 1}</td>
                                <td>{game.name}</td>
                                <td>
                                    <Pencil
                                        className="mr-3"
                                        onClick={handleEditGame.bind(
                                            undefined,
                                            game
                                        )}
                                    />
                                    <Trash
                                        onClick={handleDeleteGame.bind(
                                            undefined,
                                            game.id
                                        )}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {isEditing && (
                    <AdminGameEditFormComponent
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
