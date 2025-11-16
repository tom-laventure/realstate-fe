import { Button, FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form'
import classes from './CommentForm.module.scss'
import usePostComments from 'Store/Hooks/Comments/usePostComment'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import comment from 'Assets/Types/EstateCommentType'
import { useDispatch } from 'react-redux'
import { editComment } from 'Store/Reducers/comments'
import useEditComments from 'Store/Hooks/Comments/useEditComment'


interface CommentFormInterface {
    comment: string,
    type: string
}

interface CommentFormProps {
    closePopup: () => void
}

const CommentForm = ({ closePopup }: CommentFormProps) => {
    const [editForm, setEditForm] = useState(false)
    const dispatch = useDispatch()
    const editCommentState = useAppSelector(state => state.comments.editComment)
    const { register, handleSubmit, reset } = useForm<CommentFormInterface>({
        defaultValues: {
            comment: '',
            type: 'neutral'
        }
    })
    const { mutate: submitPostComment } = usePostComments({ complete: () => { reset(); closePopup() } })
    const { mutate: submitEditComment } = useEditComments({
        complete: () => {
            reset()
            setEditForm(false)
            closePopup()
        }
    })
    const estateId = useAppSelector(state => state.estates.selectedEstate?.id)

    useEffect(() => {
        if (editCommentState) {
            setEditForm(true)
            reset({
                comment: editCommentState.comment,
                type: editCommentState.comment_type
            })
        }
        else {
            setEditForm(false)
            reset({
                comment: '',
                type: 'neutral'
            })
        }
    }, [editCommentState])

    const onSubmit: SubmitHandler<CommentFormInterface> = (formData) => {
        if (!estateId) return

        const body = {
            comment: formData.comment,
            comment_type: formData.type,
            estate_id: estateId,
            id: editCommentState?.id
        }

        if (editCommentState) {
            submitEditComment(body)
            dispatch(editComment(undefined))
        } else {
            submitPostComment(body)
        }

        reset({
            comment: '',
            type: 'neutral'
        })
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl className={classes['comment-form--control']}>
                {editForm && editCommentState ? <EditComment register={register} comment={editCommentState} /> : <PostComment register={register} />}
            </FormControl>
        </form>
    )
}

interface PostCommentProps {
    register: UseFormRegister<CommentFormInterface>
}

const PostComment = ({ register }: PostCommentProps) => {
    return (
        <>
            <div className={classes['comment-form--input-container']}>
                <TextField
                    className={classes['comment-form--comment-input']}
                    label="Add a Comment"
                    type="text"
                    multiline
                    rows={4} // disable TextareaAutosize; avoids ResizeObserver
                    {...register('comment', {
                        required: 'A comment is required',
                        minLength: {
                            value: 1,
                            message: 'a comment is required'
                        }
                    })}
                />
            </div>
            <div className={classes['comment-form--button-container']}>
                <div className='w-full max-w-fit mr-4'>
                    <Select
                        defaultValue="neutral"
                        className={classes['comment-form--comment-select']}
                        {...register('type')}
                        size='small'
                        MenuProps={{ disablePortal: true }} // reduce portal-induced layout/focus churn
                    >
                        <MenuItem value="neutral">Note</MenuItem>
                        <MenuItem value="like">Something I like</MenuItem>
                        <MenuItem value="dislike">Something I dislike</MenuItem>
                        <MenuItem value="work">Would need work</MenuItem>
                    </Select>
                    <FormHelperText>What type of comment is this?</FormHelperText>
                </div>
                <div className={classes['comment-form--button']}>
                    <Button variant="contained" type='submit'>Submit</Button>
                </div>
            </div>
        </>
    )
}


interface EditCommentProps {
    register: UseFormRegister<CommentFormInterface>,
    comment: comment,
}

const EditComment = ({ register, comment }: EditCommentProps) => {
    return (
        <>
            <div className={classes['comment-form--input-container']}>
                <TextField
                    className={classes['comment-form--comment-input']}
                    label="Edit Comment"
                    type="text"
                    multiline
                    rows={4}
                    {...register('comment', {
                        required: 'A comment is required',
                        minLength: {
                            value: 1,
                            message: 'a comment is required'
                        }
                    })}
                />
            </div>
            <div className={classes['comment-form--button-container__edit']}>
                <div className='w-full max-w-fit mr-2'>
                    <Select
                        className={classes['comment-form--comment-select']}
                        defaultValue={comment.comment_type}
                        {...register('type')}
                        size='small'
                        MenuProps={{ disablePortal: true }}
                    >
                        <MenuItem value="neutral">Note</MenuItem>
                        <MenuItem value="like">Something I like</MenuItem>
                        <MenuItem value="dislike">Something I dislike</MenuItem>
                        <MenuItem value="work">Would need work</MenuItem>
                    </Select>
                    <FormHelperText>What type of comment is this?</FormHelperText>
                </div>
                <div>
                    <Button variant="contained" type='submit'>Edit Comment</Button>
                </div>
            </div>
        </>
    )
}

export default CommentForm