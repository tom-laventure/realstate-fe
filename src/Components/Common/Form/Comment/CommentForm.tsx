import { Button, FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import classes from './CommentForm.module.scss'


interface CommentFormInterface {
    comment: string,
    type: string
}

const CommentForm = () => {
    const { register } = useForm<CommentFormInterface>()

    const submit = () => {

    }

    return (
        <form >
            <FormControl className={classes['comment-form--control']}>
                <div className={classes['comment-form--input-container']}>
                    <TextField
                        className={classes['comment-form--comment-input']}
                        label="Add a Comment"
                        type="text"
                        multiline
                        {...register('comment', {
                            minLength: {
                                value: 2,
                                message: ''
                            }
                        })}
                    />
                    <div className='w-full max-w-fit'>
                        <Select defaultValue="neutral" className={classes['comment-form--comment-select']}>
                            <MenuItem value="neutral">Neutral</MenuItem>
                            <MenuItem value="like">Something I like</MenuItem>
                            <MenuItem value="dislike">Something I dislike</MenuItem>
                            <MenuItem value="work">Would need work</MenuItem>
                        </Select>
                        <FormHelperText>What kind of comment is this?</FormHelperText>
                    </div>
                </div>
                <div className={classes['comment-form--button-container']}>
                    <Button variant="contained" onSubmit={() => submit()}>Submit Comment</Button>
                </div>
            </FormControl>
        </form>
    )
}

export default CommentForm