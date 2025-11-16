import { Button, FormControl, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import classes from './SubCommentForm.module.scss'
import usePostSubcomments from 'Store/Hooks/Subcomments/usePostSubcomment'
import useEditSubcomment from 'Store/Hooks/Subcomments/useEditSubcomment'
import useDeleteSubcomment from 'Store/Hooks/Subcomments/useDeleteSubcomment'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import { useDispatch } from 'react-redux'
import { setEditSubcomment } from 'Store/Reducers/subcomments'

interface SubcommentFormInterface {
    comment: string
}


const SubCommentForm = () => {
    const { comment_id } = useParams()
    const dispatch = useDispatch()
    const edit = useAppSelector(s => s.subcomments.editSubcomment)
    const { register, handleSubmit, reset, setValue } = useForm<SubcommentFormInterface>({
        defaultValues: { comment: '' }
    })

    const safeClose = () => {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
        requestAnimationFrame(() => {
            dispatch(setEditSubcomment(undefined))
        })
    }

    const { mutate: createSub, isLoading: isCreating } = usePostSubcomments({ complete: () => { safeClose(); reset() } })
    const { mutate: editSub, isLoading: isEditing } = useEditSubcomment({ complete: () => { safeClose(); reset() } })
    const { mutate: deleteSub, isLoading: isDeleting } = useDeleteSubcomment({ complete: () => { safeClose(); reset() } })

    useEffect(() => {
        if (edit) setValue('comment', edit.comment)
        else reset({ comment: '' })
    }, [edit])

    const onSubmit: SubmitHandler<SubcommentFormInterface> = (formData) => {
        if (edit) {
            editSub({ id: edit.id, comment: formData.comment })
            return
        }
        if (!comment_id) return
        createSub({ comment: formData.comment, comment_id: +comment_id })
    }

    const onDelete = () => {
        if (!edit) return
        deleteSub({ id: edit.id })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl className={classes['comment-form--control']}>
                <div className={classes['comment-form--input-container']}>
                    <TextField
                        className={classes['comment-form--comment-input']}
                        label={edit ? 'Edit Reply' : 'Reply'}
                        type="text"
                        multiline
                        {...register('comment', {
                            required: 'A comment is required',
                            minLength: { value: 1, message: 'a comment is required' }
                        })}
                    />
                    <div className={classes['comment-form--button-container']}>
                        {edit ? (
                            <>
                                <Button variant="contained" type="submit" disabled={isEditing}>
                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="contained" type="submit" disabled={isCreating}>
                                    Reply
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </FormControl>
        </form>
    )
}

export default SubCommentForm