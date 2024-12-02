import comment from 'Assets/Types/EstateCommentType'
import React, { useState } from 'react'
import classes from './Comments.module.scss'
import { Button } from '@mui/material'
import EllipsisMenu, { elipsisFunctionType } from 'Components/Common/Buttons/Elipsis/Elipsis'
import useDeleteComment from 'Store/Hooks/Comments/useDeleteComment'
import PopupContainer from 'Components/Common/Popups/PopupContainer'
import { useLocation, useNavigate } from 'react-router-dom'
import subcomment from 'Assets/Types/EstateSubCommentType'
import { useDispatch } from 'react-redux'
import { editComment } from 'Store/Reducers/comments'

interface Props {
    comments?: comment[],
    estateId: number
}

const Comments = ({ comments, estateId }: Props) => {
    // const { editComment: mutate } = useEditComments()
    const [confirmPopup, setConfirmPopup] = useState(0)
    const { mutate: deleteComment } = useDeleteComment({ complete: () => setConfirmPopup(0) })
    const navigate = useNavigate()
    const location = useLocation()
    const dishpatch = useDispatch()

    const editFunction = (closeElipsis: () => void, comment: comment) => {
        dishpatch(editComment(comment))
        closeElipsis()
    }

    const deleteFunction = (closeElipsis: () => void, comment: comment) => {
        if (comment.id) setConfirmPopup(comment.id)
        closeElipsis()
    }

    const confirmDelete = () => {
        deleteComment({
            estateId: estateId,
            commentId: confirmPopup
        })

    }

    const openSubComment = (id?: number) => {
        if (!id) return

        navigate(`${location.pathname}/comment/${id}`)
    }

    const functionArray = [
        {
            label: 'edit',
            func: editFunction
        },
        {
            label: 'delete',
            func: deleteFunction
        }
    ]

    const ConfirmPopup = () => {
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



    return (
        <div className={classes['comment-container']}>
            <div className={classes['comment-container--header']}>Comments:</div>
            {!!confirmPopup && <ConfirmPopup />}
            {comments && comments.map((comment, index) => {
                return <Comment
                    key={index}
                    comment={comment}
                    functionArray={functionArray}
                    openSubComment={openSubComment}
                />
            })}
        </div>
    )
}


interface CommentsArrayProps {
    comment: comment,
    functionArray: elipsisFunctionType[],
    openSubComment?: (id?: number) => void
}


interface CommentDetailsType {
    [key: string]: {
        color: string,
        text: string
    }
}

const commentDetails: CommentDetailsType = {
    neutral: {
        color: classes['comment--neutral'],
        text: 'Note'
    },
    like: {
        color: classes['comment--like'],
        text: 'Something I like'
    },
    dislike: {
        color: classes['comment--dislike'],
        text: 'Something I dislike'
    },
    work: {
        color: classes['comment--work'],
        text: 'Would need work'
    },
}


const Comment = ({ comment, functionArray, openSubComment }: CommentsArrayProps) => {
    return (
        <div className={`${classes['comment']} ${commentDetails[comment.comment_type].color}`}>
            <div className={classes['comment--elipsis']}>{comment.is_author && <EllipsisMenu functionArray={functionArray} item={comment} />}</div>
            <div className={classes['comment--text']}>{comment.comment}</div>
            <div className={classes['comment--addition']}>
                <div className={classes['comment--owner']}>{comment.comment_owner} - {commentDetails[comment.comment_type].text}</div>
                {openSubComment && <Button onClick={() => openSubComment(comment.id)} className={classes['comment--reply']}>Reply</Button>}
            </div>
        </div>
    )
}

export { Comment }
export default Comments