import { useEffect, useState } from 'react'
import {
    getCurrentUser,
    signInWithRedirect,
    signOut,
    fetchAuthSession
} from 'aws-amplify/auth'

export const useCognitoAuth = () => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = async () => {
        try {
            const currentUser = await getCurrentUser()
            setUser(currentUser)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    // Redirect to hosted Cognito UI for sign in/sign up
    const handleSignIn = async () => {
        await signInWithRedirect()
    }

    const handleSignOut = async () => {
        await signOut()
        setUser(null)
    }

    // Get access token for API calls
    const getAccessToken = async () => {
        try {
            const session = await fetchAuthSession()
            return session.tokens?.accessToken?.toString()
        } catch (error) {
            return null
        }
    }

    return {
        user,
        loading,
        signIn: handleSignIn,
        signOut: handleSignOut,
        getAccessToken,
        checkUser
    }
}