import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppShell from 'Components/Common/Shells/AppShell'
import AppShellNoAuth from 'Components/Common/Shells/AppShellNoAuth'
import AccountManagement from 'Containers/Auth/AccountManagement/AccountManagement'
import AgentsDashboard from 'Containers/Dashboard/Agents/AgentsDashboard'
import JoinGroup from 'Containers/Dashboard/Agents/JoinGroup/JoinGroup'
import EstatesDashboard from 'Containers/Dashboard/Estate/EstatesDashboard'
import EstateView from 'Containers/View/Estate/EstateView'
import ErrorPage from 'Containers/ErrorPage/ErrorPage'
import AuthenticateUser from 'Containers/Auth/AuthenticateUser/AuthenticateUser'
import AuthCallback from 'Containers/Auth/AuthCallBack/AuthCallBack'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppShell/>,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <AgentsDashboard />,
				path: '/'
			},
			{
				element: <AccountManagement />,
				path: 'account'
			},
			{
				element: <AuthenticateUser />,
				path: "login"
			},
			{
				element: <EstateView />,
				path: "estates/:group_id/selected/:selected_id/*"
			},
			{
				element: <EstatesDashboard />,
				path: "estates"
			},
			{
				element: <EstatesDashboard />,
				path: "estates/:group_id"
			}
		]
	},
	{
		path: '/invite/',
		element: <AppShellNoAuth/>,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <JoinGroup />,
				path: "join-group/:token"
			}
		]
	},
	{
		path: '/auth/callback',
		element: <AuthCallback />
	},
	{
		path: '*',
		element: <ErrorPage />
	}
])

export default router
