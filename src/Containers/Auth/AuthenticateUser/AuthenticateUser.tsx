import React, { useEffect, useState } from 'react';
import { signInWithRedirect, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tokens, setTokens] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);

      // Get tokens
      const session = await fetchAuthSession();
      setTokens({
        idToken: session.tokens?.idToken?.toString(),
        accessToken: session.tokens?.accessToken?.toString(),
      });
      setError(null);
    } catch (err) {
      setUser(null);
      setTokens(null);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithRedirect();
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to sign in');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setTokens(null);
      setError(null);
    } catch (err) {
      console.error('Sign out error:', err);
      setError('Failed to sign out');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (user) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
        <h2>Authenticated</h2>
        <pre>Email: {user.username}</pre>
        <pre>User ID: {user.userId}</pre>

        {tokens && (
          <>
            <pre>Access Token: {tokens.accessToken?.slice(0, 50)}...</pre>
            <pre>ID Token: {tokens.idToken?.slice(0, 50)}...</pre>
            <pre>Refresh Token: {tokens.refreshToken?.slice(0, 50)}...</pre>
          </>
        )}

        <button
          onClick={handleSignOut}
          style={{
            padding: '0.5rem 1rem',
            marginTop: '1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Not Authenticated</h2>
      <button
        onClick={handleSignIn}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sign In with Cognito
      </button>
    </div>
  );
}

export default App;