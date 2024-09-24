
import React from 'react';
import classes from './AuthenticateUser.module.scss'
import SignIn from 'Components/Common/Form/SignIn/SignIn';

const AuthenticateUser = () => {
    return (
        <div className={classes.container}>
            <SignIn />
        </div>
    );
}

export default AuthenticateUser;