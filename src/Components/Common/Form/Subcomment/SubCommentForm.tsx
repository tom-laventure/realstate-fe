import { Button, FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import classes from './SubCommentForm.module.scss'
import usePostComments from 'Store/Hooks/Comments/usePostComment'
import { useAppSelector } from 'Store/Hooks/useDispatch'
import usePostSubcomments from 'Store/Hooks/Subcomments/usePostSubcomment'


interface SubcommentFormInterface {
    comment: string
}

interface SubCommentFormProps {
    selectedCommentId?: number
}

const SubCommentForm = ({ selectedCommentId }: SubCommentFormProps) => {
    const { register, handleSubmit, reset } = useForm<SubcommentFormInterface>()
    const { mutate } = usePostSubcomments({ complete: () => reset() })

    const onSubmit: SubmitHandler<SubcommentFormInterface> = (formData) => {
        if (!selectedCommentId) return

        const body = {
            comment: formData.comment,
            estate_comment_id: selectedCommentId
        }

        mutate(body)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl className={classes['comment-form--control']}>
                <div className={classes['comment-form--input-container']}>
                    <TextField
                        className={classes['comment-form--comment-input']}
                        label="Add a Comment"
                        type="text"
                        multiline
                        {...register('comment', {
                            required: 'A comment is required',
                            minLength: {
                                value: 1,
                                message: 'a comment is required'
                            }
                        })}
                    />
                    <div className={classes['comment-form--button-container']}>
                        <Button variant="contained" type='submit'>Reply</Button>
                    </div>
                </div>
            </FormControl>
        </form>
    )
}

export default SubCommentForm