import SignIn from 'Components/Common/Form/SignIn/SignIn'
import SignUp from 'Components/Common/Form/SignUp/SignUp'
import React, { useState } from 'react'

interface SignInSignUpProps {
    complete?: () => void
}

const SignInSignUp = ({ complete }: SignInSignUpProps) => {
    const [signIn, setSignIn] = useState(true)

    return (
        <div>
            {
                signIn ?
                    <SignIn complete={complete} switchForm={() => setSignIn(!signIn)} /> :
                    <SignUp complete={complete} switchForm={() => setSignIn(!signIn)} />
            }
        </div>
    )
}

export default SignInSignUp