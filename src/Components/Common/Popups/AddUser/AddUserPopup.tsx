import React, { useState } from 'react'
import PopupContainer from '../PopupContainer'
import { useParams } from 'react-router-dom'

interface AddUserPopupProps {
    close: () => void
}

export const AddUserPopup = ({ close }: AddUserPopupProps) => {
    const { group_id } = useParams()
    const [hashedUrl, setHashedUrl] = useState('')

    const hashGroupId = async () => {
        const encoder = new TextEncoder();
        const data = encoder.encode(group_id);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    return (
        <PopupContainer closePopup={close}>
            <div>
                Url to share
                
            </div>
        </PopupContainer>
    )
}
