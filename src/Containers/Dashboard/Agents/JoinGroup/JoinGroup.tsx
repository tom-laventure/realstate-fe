import React, { useEffect, useState } from 'react'
import classes from './JoinGroup.module.scss'
import { group } from 'Assets/Types/GroupType'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { decryptData } from 'Helpers/Encryption'
import useGetGroup from 'Store/Hooks/Groups/useGetGroup'
import SignInSignUp from 'Components/View/Auth/SignInSignUp'
import useJoinGroup from 'Store/Hooks/Groups/useJoinGroup'
import { useAppSelector } from 'Store/Hooks/useDispatch'


const JoinGroup = () => {
    const [groupInfo, setGroupInfo] = useState<group>()
    const [groupID, setGroupID] = useState<string>()
    const { token } = useParams()
    const { mutate: joinGroup } = useJoinGroup({ complete: () => { } })
    const navigate = useNavigate()


    const fetchComplete = ({ group, in_group }: { group: group, in_group: boolean }) => {
        if (in_group) {
            navigate(`/estates/${group.id}`)
        } else {
            setGroupInfo(group)
        }
    }
    const { isLoading, isSuccess, refetch } = useGetGroup(groupID, fetchComplete)


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
            <div className={classes['join-group']}>
                <div className={classes['join-group--body']}>
                    <div className={classes['join-group--blurb']}>
                        You have been invited to join {groupInfo?.name}
                    </div>
                    <div className={classes['join-group--button-container']}>
                        <Button onClick={() => joinGroup({ groupId: groupID })}>Join</Button>
                        <Button onClick={() => navigate('/')}>Decline</Button>
                    </div>
                </div>
            </div>
        )
    } else {
        return <SignInSignUp complete={() => refetch()} />
    }

}


export default JoinGroup