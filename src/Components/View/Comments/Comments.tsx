import comment from 'Assets/Types/EstateCommentType'
import React, { useState } from 'react'
import classes from './Comments.module.scss'
import { Button, Tooltip } from '@mui/material'
import EllipsisMenu, { elipsisFunctionType } from 'Components/Common/Buttons/Elipsis/Elipsis'
import useDeleteComment from 'Store/Hooks/Comments/useDeleteComment'
import PopupContainer from 'Components/Common/Popups/PopupContainer'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { editComment } from 'Store/Reducers/comments'
import ConfirmPopup from 'Components/Common/Popups/ConfirmPopup/ConfirmPopup'
import { formatTime } from 'Helpers/DateFormat'

interface Props {
    comments?: comment[],
    estateId: number,
    openPopup: () => void
}

const Comments = ({ comments, estateId, openPopup }: Props) => {
    const [confirmPopup, setConfirmPopup] = useState(0)
    const { mutate: deleteComment } = useDeleteComment({ complete: () => setConfirmPopup(0) })
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const params = useParams()
    const dishpatch = useDispatch()

    const editFunction = (closeElipsis: () => void, comment: comment) => {
        closeElipsis()
        dishpatch(editComment(comment))
        openPopup()
    }

    const deleteFunction = (closeElipsis: () => void, comment: comment) => {
        closeElipsis()
        if (comment.id) setConfirmPopup(comment.id)
    }

    const confirmDelete = () => {
        deleteComment({
            estateId: estateId,
            commentId: confirmPopup
        })
    }

    const openSubComment = (id?: number) => {
        if (!id) return

        // preserve existing query params and force tab=comments
        const next = new URLSearchParams(searchParams)
        next.set('tab', 'comments')

        // if current path already has /comment/:id, remove it first
        const basePath = `/estates/${params.group_id}/selected/${params.selected_id}`

        navigate(`${basePath}/comment/${id}?${next.toString()}`, { replace: false })
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



    return (
        <div className={classes['comment-container']}>
            {!!confirmPopup && <ConfirmPopup setConfirmPopup={setConfirmPopup} confirmDelete={confirmDelete} />}
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
    const createdText = formatTime(comment.created_at)
    const updatedText = formatTime(comment.updated_at)

    const isEdited = comment.updated_at !== comment.created_at

    return (
        <div className={`${classes['comment']}`}>
            <div className={classes['comment--elipsis']}>
                {comment.is_author && <EllipsisMenu functionArray={functionArray} item={comment} />}
            </div>
            <div className={classes['comment--top-level']}>
                <div className={classes['comment--owner']}>
                    <span className={classes['comment--owner__name']}>{comment.comment_owner}</span>
                    <span className={commentDetails[comment.comment_type].color}> {commentDetails[comment.comment_type].text}</span>
                </div>
            </div>
            <div className={`${classes['comment--text']}`} >{comment.comment}</div>
            <div className={`${classes['comment--addition']} ${!openSubComment && classes['comment--addition__without-reply']}`}>
                {isEdited ? (
                    <Tooltip title={`Created ${createdText}`} placement="bottom">
                        <span>edited {updatedText}*</span>
                    </Tooltip>
                ) : (
                    <span>{createdText}</span>
                )}
                {openSubComment && (
                    <Button onClick={() => openSubComment(comment.id)} className={classes['comment--reply']}>
                        {comment.subcomment_count ? `Replies (${comment.subcomment_count})` : `Reply`}
                    </Button>
                )}
            </div>
        </div>
    )
}

export { Comment }
export default Comments