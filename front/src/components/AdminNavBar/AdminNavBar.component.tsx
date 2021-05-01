import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';

export const AdminNavBarComponent = () => {
    const history = useHistory();
    const location = useLocation();
    const handleNavigate = (route: string) => {
        history.push(route);
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">FPS Metrics</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link
                    active={location.pathname === '/admin'}
                    onClick={handleNavigate.bind(undefined, '/admin')}
                >
                    Игры
                </Nav.Link>
                <Nav.Link
                    active={location.pathname === '/admin/gpu'}
                    onClick={handleNavigate.bind(undefined, '/admin/gpu')}
                >
                    Видеокарты
                </Nav.Link>
                <Nav.Link
                    active={location.pathname === '/admin/cpu'}
                    onClick={handleNavigate.bind(undefined, '/admin/cpu')}
                >
                    Процессоры
                </Nav.Link>
                <Nav.Link
                    active={location.pathname === '/admin/ram'}
                    onClick={handleNavigate.bind(undefined, '/admin/ram')}
                >
                    Оперативная память
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};
