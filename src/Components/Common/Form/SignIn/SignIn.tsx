import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classes from './SignIn.module.scss';
import { Button, FormControl, TextField } from '@mui/material';
import useSignIn from 'Store/Hooks/Auth/useSignIn';

interface SignInFormInputs {
  email: string;
  password: string;
}

const SignIn = () => {
    const {mutate} = useSignIn()
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInputs>();

  const onSubmit: SubmitHandler<SignInFormInputs> = (formData) => {
    const temp = mutate({
        user: formData
    })
    console.log(temp)
  };

  return (
    <form
        className={classes['signin']} 
        onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <div className={classes['signin--header']}>Sign In</div>
        <div className={classes['signin--button-container']}>
          
          <div className={classes['signin--input']}>
            <TextField
              label="Email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email format'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>

          <div className={classes['signin--input']}>
            <TextField
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long'
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>
            
          <Button type="submit">Submit</Button>
        
        </div>
      </FormControl>
    </form>
  );
};

export default SignIn;