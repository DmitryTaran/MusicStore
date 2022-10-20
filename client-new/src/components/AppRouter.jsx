import React, {useContext} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import {authRoutes, moderatorRoutes, publicRoutes} from "../routes";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {

    const {user} = useContext(Context)
    return (
        <div className="content">
            <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {user.user.role === 'MODERATOR' && moderatorRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Navigate to={MAIN_ROUTE}/>}></Route>
        </Routes>
        </div>

    );
};

export default AppRouter;