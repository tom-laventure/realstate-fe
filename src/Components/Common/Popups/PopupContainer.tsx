import * as React from 'react';
import classes from './PopupContainer.module.scss'

interface popupContainerTypes {
	children: JSX.Element,
    closePopup: () => void
}

const PopupContainer = ({children, closePopup}: popupContainerTypes ) => {
    return (
        <div className={classes['popup-container']} onClick={closePopup}>
            <div className={classes['popup-container__modal']}>
                {children}
            </div>
        </div>
    );
}

export default PopupContainer;