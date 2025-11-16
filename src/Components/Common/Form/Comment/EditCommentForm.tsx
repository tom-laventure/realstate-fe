import { Button, FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import classes from './CommentForm.module.scss'
import usePostComments from 'Store/Hooks/Comments/usePostComment'
import { useAppSelector } from 'Store/Hooks/useDispatch'


interface EditCommentFormInterface {
    comment: string,
    type: string
}

const EditCommentForm = () => {
    const { register, handleSubmit, reset } = useForm<EditCommentFormInterface>()
    const { mutate } = usePostComments({ complete: () => reset() })
    const estateId = useAppSelector(state => state.estates.selectedEstate?.id)

    const onSubmit: SubmitHandler<EditCommentFormInterface> = (formData) => {
        if (!estateId) return

        const body = {
            comment: formData.comment,
            comment_type: formData.type,
            estate_id: estateId
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
                </div>
                <div className={classes['comment-form--button-container']}>
                    <div className='w-full max-w-fit'>
                        <Select
                            defaultValue="neutral"
                            className={classes['comment-form--comment-select']}
                            {...register('type')}
                        >
                            <MenuItem value="neutral">Note</MenuItem>
                            <MenuItem value="like">Something I like</MenuItem>
                            <MenuItem value="dislike">Something I dislike</MenuItem>
                            <MenuItem value="work">Would need work</MenuItem>
                        </Select>
                        <FormHelperText>What type of comment is this?</FormHelperText>
                    </div>
                    <Button variant="contained" type='submit'>Submit</Button>
                </div>
            </FormControl>
        </form>
    )
}

export default EditCommentForm