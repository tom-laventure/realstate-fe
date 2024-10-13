import comment from 'Assets/Types/EstateCommentType'
import React from 'react'
import classes from './SubComments.module.scss'
import { Comment } from '../Comments/Comments'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


type SubCommentsProps = {
    selectedComment: comment,
    setSelectedComment: (comment: comment | undefined) => void
}

const SubComments = ({ selectedComment, setSelectedComment }: SubCommentsProps) => {
    return (
        <div className={classes['subcomment-container']}>
            <div>
                <Button onClick={() => setSelectedComment(undefined)}><ArrowBackIcon color='action' fontSize='small' /> </Button>Reply:
            </div>
            <div className={classes['subcomment--comments']}>
                <Comment comment={selectedComment} functionArray={[]} />
            </div>
        </div>
    )
}

const SubComment = () => {

}

export default SubComments