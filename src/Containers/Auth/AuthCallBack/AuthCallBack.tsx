// src/components/Auth/AuthCallback.tsx
import React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCognitoAuth } from 'Store/Hooks/Auth/useCognitoAuth'

const AuthCallback = () => {
    const navigate = useNavigate()
    const { checkUser } = useCognitoAuth()

    useEffect(() => {
        const handleCallback = async () => {
            // Wait for Amplify to process the OAuth callback
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Check if user is authenticated
            await checkUser()

            // Redirect to dashboard or intended route
            const redirectTo = sessionStorage.getItem('authRedirect') || '/dashboard'
            sessionStorage.removeItem('authRedirect')
            navigate(redirectTo)
        }

        handleCallback()
    }, [])

    return <div>Loading...</div>
}

export default AuthCallback