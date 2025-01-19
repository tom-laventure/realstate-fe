import React, { useEffect, useState } from 'react'
import PopupContainer from '../PopupContainer'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import classes from './AddUserPopup.module.scss'
import { decryptData, encryptData } from 'Helpers/Encryption'

interface AddUserPopupProps {
    close: () => void
}

export const AddUserPopup = ({ close }: AddUserPopupProps) => {
    const { group_id } = useParams()
    const [copied, setCopied] = useState(false)
    const [hashedUrl, setHashedUrl] = useState('')


    const generateGroupIDHash = async () => {

        if (!group_id) return

        const encryptedString = await encryptData(group_id);
        const url = `${window.location.origin}/invite/join-group/${encodeURIComponent(encryptedString)}`;

        setHashedUrl(url)
    }

    useEffect(() => {
        generateGroupIDHash()
    }, [])

    const copyClicked = () => {
        navigator.clipboard.writeText(hashedUrl);
        setCopied(true)
    }

    return (
        <PopupContainer closePopup={close}>
            <div className={classes['add-user-popup']}>
                <div className={classes['add-user-popup--blurb']}>
                    Share this link to add users to this group
                </div>
                <div className={classes['add-user-popup--shareable-container']}>
                    <div className={classes['add-user-popup--link']}>
                        {hashedUrl}
                    </div>
                    <Button variant='contained' onClick={() => copyClicked()}>Copy</Button>
                </div>
                {copied && <div className={classes['add-user-popup--copied']}>Copied to clip board!</div>}
            </div>
        </PopupContainer>
    )
}
