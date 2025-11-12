import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../Navbar/NavBar';
import classes from './AppShell.module.scss'


const AppShellNoAuth = () => {
    useEffect(() => {

    }, [])

    return (
        <div className={classes['app-shell']}>
            <Navbar disableAuth />
            <div className={classes['app-shell__outlet']}>
                <Outlet />
            </div>
        </div>
    );
}

export default AppShellNoAuth;