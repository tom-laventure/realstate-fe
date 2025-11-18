import React from 'react'
import classes from './ConfirmPopup.module.scss'
import PopupContainer from '../PopupContainer'
import { Button } from '@mui/material'

interface ConfirmPopupProps {
    setConfirmPopup: React.Dispatch<React.SetStateAction<number>>;
    confirmDelete: () => void;
}


const ConfirmPopup = ({ setConfirmPopup, confirmDelete }: ConfirmPopupProps) => {
    return (
        <PopupContainer closePopup={() => setConfirmPopup(0)}>
            <div className={classes['comment--pop-up']}>
                <div>Are you sure you want to delete this comment?</div>
                <div>
                    <Button onClick={() => confirmDelete()}>Delete</Button>
                    <Button onClick={() => setConfirmPopup(0)}>Cancel</Button>
                </div>
            </div>
        </PopupContainer>
    )
}

export default ConfirmPopup