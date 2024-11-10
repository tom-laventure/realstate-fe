
import React, { useState } from 'react';
import classes from './AuthenticateUser.module.scss'
import SignIn from 'Components/Common/Form/SignIn/SignIn';
import SignUp from 'Components/Common/Form/SignUp/SignUp';

const AuthenticateUser = () => {
    const [signIn, setSignIn] = useState(true)


    return (
        <div className={classes.container}>
            {signIn ? <SignIn switchForm={() => setSignIn(!signIn)} /> : <SignUp switchForm={() => setSignIn(!signIn)} />}
        </div>
    );
}

export default AuthenticateUser;