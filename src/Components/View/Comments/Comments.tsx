import comment from 'Assets/Types/EstateCommentType'
import React from 'react'
import classes from './Comments.module.scss'
import { Button } from '@mui/material'
import EllipsisMenu from 'Components/Common/Buttons/Elipsis/Elipsis'

interface Props {
    comments?: comment[]
}

const Comments = ({ comments }: Props) => {
    console.log(comments)
    return (
        <div className={classes['comment-container']}>
            <div className={classes['comment-container--header']}>Comments:</div>
            {comments && comments.map((comment, index) => {
                return <div key={index} className={classes['comment']}>
                    <div className={classes['comment--elipsis']}><EllipsisMenu /></div>
                    <div className={classes['comment--text']}>{comment.comment}</div>
                    <div className={classes['comment--addition']}>
                        <div className={classes['comment--owner']}>{comment.comment_owner}</div>
                        <Button className={classes['comment--reply']}>Reply</Button>
                    </div>
                </div>
            })}
        </div>
    )
}



export default Comments