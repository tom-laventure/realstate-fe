import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppShell from '../Components/Common/Shells/AppShell'
import AccountManagement from '../Containers/Auth/AccountManagement/AccountManagement'
import CreateEvent from '../Containers/CreateEvent/CreateEvent'
import Dashboard from '../Containers/Dashboard/DashBoard'
import ErrorPage from '../Containers/ErrorPage/ErrorPage'
import Home from '../Containers/Home/Home'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppShell/>,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <Home />,
				path: '/'
			},
			{
				element: <Dashboard/>,
				path: 'dashboard/:id',
			},
			{
				element: <CreateEvent/>,
				path: 'create-event',
			},
			{
				element: <AccountManagement />,
				path: 'account'
			}
		]
	},
	{
		path: '*',
		element: <ErrorPage />
	}
])

export default router
