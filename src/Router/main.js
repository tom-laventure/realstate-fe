import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppShell from 'Components/Common/Shells/AppShell'
import AccountManagement from 'Containers/Auth/AccountManagement/AccountManagement'
import GroupDashBoard from 'Containers/Dashboard/Groups/GroupDashboard'
import EstatesDashboard from 'Containers/Dashboard/Estate/EstatesDashboard'
import EstateView from 'Containers/View/Estate/EstateView'
import ErrorPage from 'Containers/ErrorPage/ErrorPage'
import AuthenticateUser from 'Containers/Auth/AuthenticateUser/AuthenticateUser'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppShell/>,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <GroupDashBoard />,
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
				path: "estates/:estate_id/selected/:selected_id/*"
			},
			{
				element: <EstatesDashboard />,
				path: "estates/:estate_id"
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
])

export default router
