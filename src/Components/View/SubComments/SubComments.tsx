import React, { useState } from 'react'
import classes from './SubComments.module.scss'
import { Comment } from '../Comments/Comments'
import { Button, Tooltip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useFetchSubComments from 'Store/Hooks/Subcomments/useFetchSubcomments'
import { useAppSelector, useAppDispatch } from 'Store/Hooks/useDispatch'
import subcomment from 'Assets/Types/EstateSubCommentType'
import EllipsisMenu, { elipsisFunctionType } from 'Components/Common/Buttons/Elipsis/Elipsis'
import { setEditSubcomment } from 'Store/Reducers/subcomments'
import useDeleteSubcomment from 'Store/Hooks/Subcomments/useDeleteSubcomment';
import { editComment } from 'Store/Reducers/comments';
import comment from 'Assets/Types/EstateCommentType';
import useDeleteComment from 'Store/Hooks/Comments/useDeleteComment';

interface SubCommentsProps {
    openPopup: () => void
}

const formatTime = (value?: string | number | Date) => {
    if (!value) return ''
    const d = new Date(value)
    if (isNaN(d.getTime())) return ''
    return new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).format(d)
}

const SubComments = ({ openPopup }: SubCommentsProps) => {
    const [confirmPopup, setConfirmPopup] = useState(0)
    const { mutate: deleteComment } = useDeleteComment({ complete: () => setConfirmPopup(0) })
    const { group_id, selected_id, comment_id } = useParams()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const goBack = () => {
        const next = new URLSearchParams(searchParams)
        next.set('tab', 'comments')

        navigate(`/estates/${group_id}/selected/${selected_id}?${next.toString()}`, { replace: true })
    }

    const selectedComment = useAppSelector((state) => state.estates.selectedEstate.estate_comments?.find(el => el.id == comment_id))
    const subcomments = useAppSelector((state) => state.subcomments.subcomments)
    const { mutate: deleteSub, isLoading: isDeleting } = useDeleteSubcomment({ complete: () => { } })
    const dispatch = useAppDispatch()

    const { } = useFetchSubComments(comment_id)

    const editSubComment = (closeElipsis: () => void, sc: subcomment) => {
        closeElipsis()
        dispatch(setEditSubcomment(sc))
    }

    const deleteSubComment = (closeElipsis: () => void, sc: subcomment) => {
        closeElipsis()
        deleteSub({ id: sc.id })
    }

    const functionSubCommentArray = [
        {
            label: 'edit',
            func: editSubComment
        },
        {
            label: 'delete',
            func: deleteSubComment
        }
    ]

    const editFunction = (closeElipsis: () => void, comment: comment) => {
        closeElipsis()
        dispatch(editComment(comment))
        openPopup()
    }

    const deleteFunction = (closeElipsis: () => void, comment: comment) => {
        closeElipsis()
        if (comment.id) setConfirmPopup(comment.id)
    }


    const functionCommentArray = [
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
        <div className={classes['subcomment-container']}>
            <div>
                <Button onClick={() => goBack()}><ArrowBackIcon color='action' fontSize='small' /> </Button>
            </div>
            <div className={classes['subcomment--comments']}>
                {selectedComment && <Comment comment={selectedComment} functionArray={functionCommentArray} />}
                {subcomments.map((el, index) => {
                    return <SubComment functionArray={functionSubCommentArray} subcomment={el} key={index} />
                })}
            </div>
        </div>
    )
}


interface SubcommentProps {
    subcomment: subcomment,
    functionArray: elipsisFunctionType[]
}

const SubComment = ({ functionArray, subcomment }: SubcommentProps) => {
    const createdText = formatTime(subcomment.created_at)
    const updatedText = formatTime(subcomment.updated_at)
    const isEdited = subcomment.updated_at !== subcomment.created_at

    return (
        <div className={classes['subcomment--comment']}>
            <div className={classes['subcomment--comment__elipsis']}>
                {subcomment.is_author && <EllipsisMenu functionArray={functionArray} item={subcomment} />}
            </div>
            <div className={classes['subcomment--comment__text']}>{subcomment.comment}</div>
            <div className={classes['subcomment--comment__addition']}>
                <div className={classes['subcomment--comment__owner']}>{subcomment.comment_owner}</div>
                <div className={classes['subcomment--comment__date']}>
                    {isEdited ? (
                        <Tooltip title={`Created ${createdText}`}  placement="bottom">
                            <span>edited {updatedText}*</span>
                        </Tooltip>
                    ) : (
                        <span>{createdText}</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SubComments