import React, { useEffect, useState } from 'react'
import PopupContainer from '../PopupContainer'
import { useParams } from 'react-router-dom'
import { TextField } from '@mui/material'
import classes from './AddUserPopup.module.scss'
import { encryptData, exportKey, generateKey } from 'Helpers/Encryption'

interface AddUserPopupProps {
    close: () => void
}

export const AddUserPopup = ({ close }: AddUserPopupProps) => {
    const { group_id } = useParams()
    const [hashedUrl, setHashedUrl] = useState('')


    const generateGroupIDHash = async () => {
        if (!group_id) return

        const key = await generateKey();

        const encryptedString = await encryptData(group_id, key);
        const url = `${window.location.origin}?data=${encodeURIComponent(encryptedString)}`;
        setHashedUrl(url)
    }

    useEffect(() => {
        generateGroupIDHash()
    }, [])

    return (
        <PopupContainer closePopup={close}>
            <div className={classes['add-user-popup']}>
                Url to share
                <div className={classes['add-user-popup--link']}>
                    {hashedUrl}
                </div>
            </div>
        </PopupContainer>
    )
}
