import React from 'react'
import classes from './GroupForm.module.scss'
import { Button, FormControl, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import usePostGroup from 'Store/Hooks/Groups/usePostGroups'

interface CreateGroupProps {
  cancelCreate: () => void
}

interface CreateGroupFormType {
  groupName: string
}

const CreateGroupForm = ({ cancelCreate }: CreateGroupProps) => {
  const { register, handleSubmit, reset } = useForm<CreateGroupFormType>() 
  const { mutate: postGroup } = usePostGroup({ complete: () => {
    reset()
    cancelCreate()
  }})

  const formSubmit: SubmitHandler<CreateGroupFormType> = (formData) => {
    const body = {
      name: formData.groupName
    }

    postGroup(body)
  }

  return (
    <form onSubmit={handleSubmit(formSubmit)} className={classes['create-group']}>
      <FormControl className={classes['create-group--form-control']}>
        <div className={classes['create-group--header']}>
          Create Group
        </div>
        <TextField
          className={classes['comment-form--comment-input']}
          label="Group Name"
          type="text"
          multiline
          {...register('groupName', {
            required: 'A Group name is required',
            minLength: {
              value: 1,
              message: 'A name is required'
            }
          })} />
        <div className={classes['create-group--submit-button']}>
          <Button type="submit">Create Group</Button>
          <Button onClick={cancelCreate}>Cancel</Button>
        </div>
      </FormControl>
    </form>
  )
}

export default CreateGroupForm