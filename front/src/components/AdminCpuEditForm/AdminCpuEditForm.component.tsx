import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { IAPICpu } from '../../api/APICpu.util';
import {
    createCpuAction,
    updateCpuAction,
} from '../../reducers/Cpu/Cpu.reducer';

interface IAdminCpuEditFormFormProps {
    isShowing: boolean;
    onHide: () => void;
    edit?: boolean;
    data?: IAPICpu | null;
}
export const AdminCpuEditFormComponent: React.FC<IAdminCpuEditFormFormProps> = ({
    isShowing,
    onHide,
    edit,

    data,
}) => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState<IAPICpu>(
        data || {
            id: 0,
            name: '',
            options: {
                cores: 0,
                flows: 0,
                frequency: 0,
                coef: 0,
            },
        }
    );
    const computeKoef = (data: IAPICpu) => {
        setInputs((prev) => ({
            ...prev,
            options: {
                ...prev.options,
                coef:
                    (+data.options.cores +
                        +data.options.frequency +
                        +data.options.flows) /
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
        field: keyof IAPICpu['options'],
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
            dispatch(updateCpuAction(inputs));
        } else {
            dispatch(createCpuAction(inputs));
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
                        ? 'Редактирование процессора'
                        : 'Добавление процессора'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Название процессора</Form.Label>
                        <Form.Control
                            required
                            type="input"
                            placeholder="Введите название процессора"
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
                            step="0.01"
                        />
                    </Form.Group>

                    <Form.Group controlId="name">
                        <Form.Label>Количество ядер</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Введите кол-во ядер"
                            value={inputs.options.cores}
                            onChange={handleFiledChange.bind(
                                undefined,
                                'cores'
                            )}
                        />
                    </Form.Group>
                    <Form.Group controlId="name">
                        <Form.Label>Количество потоков</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            placeholder="Введите количество потоков"
                            value={inputs.options.flows}
                            onChange={handleFiledChange.bind(
                                undefined,
                                'flows'
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
