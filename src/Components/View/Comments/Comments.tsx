import comment from 'Assets/Types/EstateCommentType'
import React, { useState } from 'react'
import classes from './Comments.module.scss'
import { Button } from '@mui/material'
import EllipsisMenu from 'Components/Common/Buttons/Elipsis/Elipsis'
import useDeleteComment from 'Store/Hooks/Comments/useDeleteComment'
import PopupContainer from 'Components/Common/Popups/PopupContainer'
import deleteComment from 'Assets/API/Comments/deleteComment'

interface Props {
    comments?: comment[],
    estateId: number
}

const Comments = ({ comments, estateId }: Props) => {
    // const { editComment: mutate } = useEditComments()
    const [confirmPopup, setConfirmPopup] = useState(1)
    const { mutate: deleteComment } = useDeleteComment({ complete: () => setConfirmPopup(0) })

    const editFunction = (closeElipsis: () => void, id: number) => {

        closeElipsis()
    }

    const deleteFunction = (closeElipsis: () => void, id: number) => {
        setConfirmPopup(id)
        closeElipsis()
    }

    const confirmDelete = () => {
        deleteComment({
            estateId: estateId,
            commentId: confirmPopup
        })

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
                return <div key={index} className={classes['comment']}>
                    <div className={classes['comment--elipsis']}><EllipsisMenu functionArray={functionArray} id={comment.id} /></div>
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