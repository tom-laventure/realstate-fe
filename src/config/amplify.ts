import { Amplify } from 'aws-amplify'

Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || '',
            userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || '',
            loginWith: {
                oauth: {
                    domain: process.env.REACT_APP_COGNITO_DOMAIN || '',
                    scopes: [
                        'email',
                        'openid',
                        'phone',
                        'profile',
                        'aws.cognito.signin.user.admin'
                    ],
                    redirectSignIn: [process.env.REACT_APP_REDIRECT_SIGN_IN || 'http://localhost:3000/'],
                    redirectSignOut: [process.env.REACT_APP_REDIRECT_SIGN_OUT || 'http://localhost:3000/'],
                    responseType: 'code'
                }
            }
        }
    }
})

console.log('✅ Amplify Cognito configured')