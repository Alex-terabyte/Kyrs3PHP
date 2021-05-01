import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { AdminHomePage } from './pages/Admin/AdminHome/AdminHome.page';
import { AdminGpuEditPage } from './pages/Admin/AdminGpuEdit/AdminGpuEdit.page';
import { AdminCpuEditPage } from './pages/Admin/AdminCpuEdit/AdminCpuEdit.page';
import { AdminRamEditPage } from './pages/Admin/AdminRamEdit/AdminRamEdit.page';
import { fetchGamesAction } from './reducers/Games/Games.reducer';
import { fetchGpuAction } from './reducers/Gpu/Gpu.reducer';
import { fetchCpuAction } from './reducers/Cpu/Cpu.reducer';
import { fetchRamAction } from './reducers/Ram/Ram.reducer';
import { HomePage } from './pages/Home/Home.page';

export const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchGamesAction());
        dispatch(fetchGpuAction());
        dispatch(fetchCpuAction());
        dispatch(fetchRamAction());
    }, []);
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <HomePage />
                    </Route>
                    <Route path="/admin" exact>
                        <AdminHomePage />
                    </Route>
                    <Route path="/admin/gpu">
                        <AdminGpuEditPage />
                    </Route>
                    <Route path="/admin/cpu">
                        <AdminCpuEditPage />
                    </Route>
                    <Route path="/admin/ram">
                        <AdminRamEditPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};
