import React from 'react'
import classes from './CommentsFormPopup.module.scss'
import PopupContainer from '../PopupContainer'

interface CommentsFormPopupProps {
    children: React.ReactNode,
    closePopup: () => void
}

const CommentsFormPopup = ({ children, closePopup }: CommentsFormPopupProps) => {
    return (
        <PopupContainer closePopup={closePopup}>
            <div className={classes['comments-form-popup']}>
                {children}
            </div>
        </PopupContainer>
    )
}

export default CommentsFormPopup