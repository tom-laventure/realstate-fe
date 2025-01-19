import React, { useState } from 'react'
import classes from './JoinGroup.module.scss'
import { group } from 'Assets/Types/GroupType'
import { Button } from '@mui/material'
import { useParams } from 'react-router-dom'

const JoinGroup = () => {
    const [groupInfo, setGroupInfo] = useState<group>()
    const { token } = useParams()
    
    

    return (
        <div>
            You have been invited to join {groupInfo?.name}
            <Button>Join</Button>
        </div>
    )
}


export default JoinGroup