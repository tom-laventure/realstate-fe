import SignIn from 'Components/Common/Form/SignIn/SignIn'
import SignUp from 'Components/Common/Form/SignUp/SignUp'
import React, { useState } from 'react'

const SignInSignUp = () => {
    const [signIn, setSignIn] = useState(true)

    return (
        <div>
            {signIn ? <SignIn switchForm={() => setSignIn(!signIn)} /> : <SignUp switchForm={() => setSignIn(!signIn)} />}
        </div>
    )
}

export default SignInSignUp