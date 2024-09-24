import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppShell from 'Components/Common/Shells/AppShell'
import AccountManagement from 'Containers/Auth/AccountManagement/AccountManagement'
import Dashboard from 'Containers/Dashboard/DashBoard'
import ErrorPage from 'Containers/ErrorPage/ErrorPage'
import AuthenticateUser from 'Containers/Auth/AuthenticateUser/AuthenticateUser'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppShell/>,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <Dashboard />,
				path: '/'
			},
			{
				element: <AccountManagement />,
				path: 'account'
			},
			{
				element: <AuthenticateUser />,
				path: "login"

			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
])

export default router
