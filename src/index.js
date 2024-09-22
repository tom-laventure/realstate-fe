import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/main'
import StoreProvider from './Store/StoreProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<QueryClientProvider client={queryClient}>
		<StoreProvider>
			<RouterProvider router={router} />
			<ReactQueryDevtools initialIsOpen={false} />
		</StoreProvider>
	</QueryClientProvider>
)
