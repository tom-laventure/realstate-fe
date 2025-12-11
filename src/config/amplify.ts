// src/config/amplify.ts
import { Amplify } from 'aws-amplify'

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || '',
            userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || '',
            identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID || '',
            signUpVerificationMethod: 'code',
            loginWith: {
                email: true
            }
        }
    }
})