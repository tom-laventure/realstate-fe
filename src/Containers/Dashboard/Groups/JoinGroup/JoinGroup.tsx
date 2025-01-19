import React, { useEffect, useState } from 'react'
import classes from './JoinGroup.module.scss'
import { group } from 'Assets/Types/GroupType'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import { decryptData } from 'Helpers/Encryption'
import useGetGroup from 'Store/Hooks/Groups/useGetGroup'
import SignInSignUp from 'Components/View/Auth/SignInSignUp'


const JoinGroup = () => {
    const [groupInfo, setGroupInfo] = useState<group>()
    const [groupID, setGroupID] = useState<string>()
    const { token } = useParams()
    const { isLoading, isSuccess } = useGetGroup(groupID)

    useEffect(() => {
        if (token) decrypt(token)
    }, [token])

    const decrypt = async (encryptedID: string) => {
        const decoded = await decryptData(encryptedID)
        setGroupID(decoded)
    }


    if (isLoading) {
        return <div>Loading</div>
    } else if (isSuccess) {
        return (
            <div>
                You have been invited to join {groupInfo?.name}
                <Button>Join</Button>
            </div>
        )
    } else {
        return <SignInSignUp />
    }

}


export default JoinGroup