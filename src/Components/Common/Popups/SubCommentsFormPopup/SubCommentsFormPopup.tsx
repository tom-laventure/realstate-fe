import React from 'react'
import classes from './SubCommentsFormPopup.module.scss'
import PopupContainer from '../PopupContainer'

interface SubCommentsFormPopupProps {
    children: React.ReactNode
    closePopup: () => void
}

const SubCommentsFormPopup = ({ children, closePopup }: SubCommentsFormPopupProps) => {
    return (
        <PopupContainer closePopup={closePopup}>
            <div className={classes['subcomments-form-popup']}>
                {children}
            </div>
        </PopupContainer>
    )
}

export default SubCommentsFormPopup