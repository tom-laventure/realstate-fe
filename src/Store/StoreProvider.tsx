import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import { element } from 'prop-types';
import StoreContext from './Reducers';

interface storeProviderTypes {
	children: JSX.Element
}

const StoreProvider = ({ children }: storeProviderTypes) => {
	return (
		<Provider store={StoreContext}>
			{children}
		</Provider>
	)
}

StoreProvider.propTypes = {
	children: element
}

export default StoreProvider