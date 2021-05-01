import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { IAPIRam } from '../../api/APIRam.util';
import {
    createRamAction,
    updateRamAction,
} from '../../reducers/Ram/Ram.reducer';

interface IAdminRamEditFormFormProps {
    isShowing: boolean;
    onHide: () => void;
    edit?: boolean;
    data: IAPIRam | null;
}
export const AdminRamEditFormComponent: React.FC<IAdminRamEditFormFormProps> = ({
    isShowing,
    onHide,
    edit,

    data,
}) => {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState<IAPIRam>(
        data || {
            id: 0,
            name: '',
            options: {
                throughput: 0,
                memorySize: 0,
                frequency: 0,
                coef: 0,
            },
        }
    );

    const computeKoef = (data: IAPIRam) => {
        setInputs((prev) => ({
            ...prev,
            options: {
                ...prev.options,
                coef:
                    (+data.options.frequency +
                        +data.options.memorySize +
                        +data.options.throughput) /
                    3,
            },
        }));
    };

    useEffect(() => {
        if (data) {
            computeKoef(data);
        }
    }, []);

    const handleFiledChange = (
        field: keyof IAPIRam['options'],
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInputs((prev) => {
            computeKoef({
                ...prev,
                options: {
                    ...prev.options,
                    [field]: +e.target.value,
                },
            });
            return {
                ...prev,
                options: {
                    ...prev.options,
                    [field]: +e.target.value,
                },
            };
        });
    };

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, name: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (edit) {
            dispatch(updateRamAction(inputs));
        } else {
            dispatch(createRamAction(inputs));
        }
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
                    {edit
                        ? 'Редактирование оперативной памяти'
                        : 'Добавление оперативной памяти'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Название оперативной памяти</Form.Label>
                        <Form.Control
                            required
                            type="input"
                            placeholder="Введите название оперативной памяти"
                            value={inputs.name}
                            onChange={handleChangeName}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Частота</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Введите частоту"
                            value={inputs.options.frequency}
                            onChange={handleFiledChange.bind(
                                undefined,
                                'frequency'
                            )}
                        />
                    </Form.Group>

                    <Form.Group controlId="name">
                        <Form.Label>Пропускная способность</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Введите пропускную способность"
                            value={inputs.options.throughput}
                            onChange={handleFiledChange.bind(
                                undefined,
                                'throughput'
                            )}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Объем памяти</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Введите объем памяти"
                            value={inputs.options.memorySize}
                            onChange={handleFiledChange.bind(
                                undefined,
                                'memorySize'
                            )}
                        />
                    </Form.Group>

                    <p>
                        Коэффициент производительности:{' '}
                        {inputs.options.coef.toFixed(2)}
                    </p>

                    <Button variant="primary" type="submit">
                        {edit ? 'Сохранить' : 'Добавить'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
