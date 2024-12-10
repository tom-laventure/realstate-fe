import * as React from 'react';
import classes from './PopupContainer.module.scss'

interface popupContainerTypes {
    children: JSX.Element,
    closePopup: () => void,
    disableOutsideClickClose?: boolean
}

const PopupContainer = ({ children, closePopup, disableOutsideClickClose }: popupContainerTypes) => {
    const outsideClick = () => {
        if(disableOutsideClickClose) return
        else return closePopup() 
    }
    
    return (
        <div className={classes['popup-container']} onClick={outsideClick}>
            <div className={classes['popup-container__modal']} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default PopupContainer;