import React, { useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import { Trash, PlusCircle } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { IAPIGame } from '../../api/APIGames.util';
import {
    createGameAction,
    updateGameAction,
} from '../../reducers/Games/Games.reducer';

interface IAdminGameEditFormProps {
    isShowing: boolean;
    onHide: () => void;
    edit?: boolean;
    data: IAPIGame;
}
export const AdminGameEditFormComponent: React.FC<IAdminGameEditFormProps> = ({
    isShowing,
    onHide,
    edit,
    data,
}) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(data.name);
    const [inputs, setInputs] = useState<Array<{ koef: number; fps: number }>>(
        data.options
    );

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleInputAdd = () => {
        const replOfInputs = [...inputs];
        replOfInputs.push({
            koef: 0,
            fps: 0,
        });
        setInputs(replOfInputs);
    };

    const handleInputChange = (
        index: number,
        field: 'koef' | 'fps',
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const replOfInputs = [...inputs];
        replOfInputs[index][field] = +e.target.value;
        setInputs(replOfInputs);
    };

    const handleRemoveInput = (index: number) => {
        if (inputs.length - 1) {
            const replOfInputs = [...inputs];
            replOfInputs.splice(index, 1);
            setInputs(replOfInputs);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (edit)
            dispatch(
                updateGameAction({
                    id: data.id,
                    name,
                    options: inputs,
                })
            );
        else
            dispatch(
                createGameAction({
                    id: data.id,
                    name,
                    options: inputs,
                })
            );
        onHide();
    };

    return (
        <Modal
            size="lg"
            show={isShowing}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    {edit ? 'Редактирование игры' : 'Добавление игры'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Название игры</Form.Label>
                        <Form.Control
                            required
                            type="input"
                            placeholder="Введите название игры"
                            name="name"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </Form.Group>
                    <PlusCircle
                        className="cursor-pointer mr-2"
                        onClick={handleInputAdd}
                    />

                    {inputs.map((input, index) => (
                        <Form.Row key={`koefChoose-${index}`}>
                            <Form.Group as={Col} controlId="koef">
                                <Form.Label>Коэффициент</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Введите коэффициент"
                                    name="koef"
                                    value={input.koef}
                                    onChange={handleInputChange.bind(
                                        undefined,
                                        index,
                                        'koef'
                                    )}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="fps">
                                <Form.Label>FPS</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Введите FPS"
                                    name="fps"
                                    value={input.fps}
                                    onChange={handleInputChange.bind(
                                        undefined,
                                        index,
                                        'fps'
                                    )}
                                />
                            </Form.Group>
                            <Trash
                                onClick={handleRemoveInput.bind(
                                    undefined,
                                    index
                                )}
                            />
                        </Form.Row>
                    ))}

                    <Button variant="primary" type="submit">
                        {edit ? 'Сохранить' : 'Добавить'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
