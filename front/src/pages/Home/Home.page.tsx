import React, { useState, useEffect } from 'react';
import { Col, Form, Navbar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { IAPIGame } from '../../api/APIGames.util';
import { TStore } from '../../store';

export const HomePage = () => {
    const state = useSelector((state: TStore) => state);
    const [fps, setFps] = useState(0);
    const [gpu, setGpu] = useState<'' | number>('');
    const [cpu, setcpu] = useState<'' | number>('');
    const [ram, setram] = useState<'' | number>('');
    const [game, setGame] = useState<string>('');

    useEffect(() => {
        if (!!gpu && !!cpu && !!ram && !!game) {
            const parseGame = JSON.parse(game);
            if (parseGame) {
                const match = parseGame.find(
                    (option: IAPIGame['options'][number]) =>
                        +gpu + +cpu + +ram >= option.koef
                );

                if (match) setFps(match.fps);
            }
        } else {
            setFps(0);
        }
    }, [gpu, cpu, ram, game]);

    const handleHardwareChange = (
        field: 'gpu' | 'cpu' | 'ram',
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        switch (field) {
            case 'cpu':
                setcpu(+e.target.value);
                break;
            case 'gpu':
                setGpu(+e.target.value);
                break;
            case 'ram':
                setram(+e.target.value);
                break;
            default:
                break;
        }
    };

    const handleGameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGame(e.target.value);
    };

    return (
        <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">FPS Metrics</Navbar.Brand>
            </Navbar>
            <div className="mt-5 px-5">
                <Row>
                    <Col>
                        <Form>
                            <Form.Group controlId="name">
                                <Form.Label>Видеокарта</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={handleHardwareChange.bind(
                                        undefined,
                                        'gpu'
                                    )}
                                >
                                    <option value="">Выберите значение</option>
                                    {state.GpuReducer.gpu.map((gpu) => (
                                        <option
                                            key={gpu.id}
                                            value={gpu.options.coef}
                                        >
                                            {gpu.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Процессор</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={handleHardwareChange.bind(
                                        undefined,
                                        'cpu'
                                    )}
                                >
                                    <option value="">Выберите значение</option>
                                    {state.CpuReducer.cpu.map((cpu) => (
                                        <option
                                            key={cpu.id}
                                            value={cpu.options.coef}
                                        >
                                            {cpu.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Оперативная память</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={handleHardwareChange.bind(
                                        undefined,
                                        'ram'
                                    )}
                                >
                                    <option value="">Выберите значение</option>
                                    {state.RamReducer.ram.map((ram) => (
                                        <option
                                            key={ram.id}
                                            value={ram.options.coef}
                                        >
                                            {ram.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Игра</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={handleGameChange}
                                >
                                    <option value="">Выберите значение</option>
                                    {state.GamesReducer.games.map((game) => (
                                        <option
                                            key={game.id}
                                            value={JSON.stringify(game.options)}
                                        >
                                            {game.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col>
                        <h1>FPS: {fps}</h1>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
