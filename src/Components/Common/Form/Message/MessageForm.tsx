import { Button, FormControl, TextField } from '@mui/material'
import React from 'react'
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form'
import classes from './MessageForm.module.scss'
import usePostMessage from 'Store/Hooks/Messages/usePostMessage'
import { useParams } from 'react-router-dom'
import message from 'Assets/Types/MessageType'


interface MessageFormInterface {
    message: string
}

const MessageForm = () => {
    const { group_id } = useParams()
    const { mutate: postMessage } = usePostMessage({ complete: () => { } })

    const { register, handleSubmit, reset } = useForm<MessageFormInterface>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<MessageFormInterface> = (formData) => {
        const body: message = {
            message: formData.message,
            group_id: group_id
        }
        postMessage(body)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl className={classes['message-form--control']}>
                <PostMessage register={register} />
            </FormControl>
        </form>
    )
}

interface PostMessageProps {
    register: UseFormRegister<MessageFormInterface>
}

const PostMessage = ({ register }: PostMessageProps) => {
    return (
        <>
            <div className={classes['message-form--input-container']}>
                <TextField
                    className={classes['message-form--message-input']}
                    label="enter a message"
                    type="text"
                    multiline
                    {...register('message', {
                        required: 'A message is required',
                        minLength: {
                            value: 1,
                            message: 'a message is required'
                        },
                        maxLength: {
                            value: 1000,
                            message: 'character limit of 1000'
                        }
                    })}
                />
                <div className={classes['message-form--button-container']}>
                    <Button variant="contained" type='submit'>Submit</Button>
                </div>
            </div>
        </>
    )
}

export default MessageForm