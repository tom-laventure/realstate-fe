import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/main'
import StoreProvider from './Store/StoreProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AuthProvider } from "react-oidc-context";
import './config/amplify'

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-west-2.amazonaws.com/us-west-2_Gk7eldAnK",
  client_id: "5vmfjt1sgo7740fce0tje35e2",
  redirect_uri: "http://localhost:3000/",
  response_type: "code",
  scope: "phone openid email",
};

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
})

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider {...cognitoAuthConfig}>
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </StoreProvider>
      </AuthProvider>
    </QueryClientProvider>
)
