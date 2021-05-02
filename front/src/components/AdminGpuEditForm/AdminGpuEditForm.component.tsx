import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { IAPIGpu } from '../../api/APIGpu.util';
import {
    createGpuAction,
    updateGpuAction,
} from '../../reducers/Gpu/Gpu.reducer';

interface IAdminGpuEditFormFormProps {
    isShowing: boolean;
    onHide: () => void;
    edit?: boolean;
    data: IAPIGpu | null;
}
export const AdminGpuEditFormComponent: React.FC<IAdminGpuEditFormFormProps> = ({
    isShowing,
    onHide,
    edit,

    data,
}) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState<IAPIGpu>(
        data || {
            id: 0,
            name: '',
            options: {
                frequency: 0,
                memorySize: 0,
                tireWidth: 0,
                coef: 0,
            },
        }
    );

    const computeKoef = (data: IAPIGpu) => {
        setInputs((prev) => ({
            ...prev,
            options: {
                ...prev.options,
                coef:
                    (+data.options.memorySize +
                        +data.options.frequency +
                        +data.options.tireWidth) /
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
        field: keyof IAPIGpu['options'],
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
            dispatch(updateGpuAction(inputs));
        } else {
            dispatch(createGpuAction(inputs));
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
                        ? 'Редактирование видеокарты'
                        : 'Добавление видеокарты'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Название видеокарты</Form.Label>
                        <Form.Control
                            required
                            type="input"
                            placeholder="Введите название видеокарты"
                            value={inputs.name}
                            onChange={handleChangeName}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Частота(Гц)</Form.Label>
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
                        <Form.Label>Объем видеопамяти(Мб)</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Введите объем видеопамяти"
                            value={inputs.options.memorySize}
                            onChange={handleFiledChange.bind(
                                undefined,
                                'memorySize'
                            )}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Ширина шины(Мб)</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Введите ширину шины"
                            value={inputs.options.tireWidth}
                            onChange={handleFiledChange.bind(
                                undefined,
                                'tireWidth'
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
