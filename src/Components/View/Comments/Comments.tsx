import comment from 'Assets/Types/EstateCommentType'
import React from 'react'
import classes from './Comments.module.scss'

interface Props {
    comments?: comment[]
}

const Comments = ({ comments }: Props) => {
    console.log(comments)
    return (
        <div className={classes['comment-container']}>
            {comments && comments.map((comment, index) => {
                return <div key={index} className={classes['comment']}>
                    <div className={classes['comment--text']}>{comment.comment}</div>
                    <div className={classes['comment--owner']}>{comment.comment_owner}</div>
                </div>
            })}
        </div>
    )
}



export default Comments