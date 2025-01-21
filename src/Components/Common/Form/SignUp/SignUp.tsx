import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import classes from './SignUp.module.scss';
import { Button, FormControl, TextField } from '@mui/material';
import useSignUp from 'Store/Hooks/Auth/useSignUp';

interface signUpFormInputs {
    email: string;
    password: string;
    confirmPassword: string;
    name: string
}

interface Props {
    switchForm: () => void,
    complete?: () => void
}

const SignUp = ({ switchForm, complete }: Props) => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<signUpFormInputs>();
    const password = watch('password')
    const { mutate } = useSignUp({ complete })
    const onSubmit: SubmitHandler<signUpFormInputs> = (formData) => {
        const user = {
            email: formData.email,
            password: formData.password,
            name: formData.name
        }

        mutate({ user })
    };

    return (
        <form
            className={classes['signup']}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl>
                <div className={classes['signup--header']}>
                    Sign Up
                    <Button onClick={() => switchForm()}>Sign In</Button>
                </div>
                <div className={classes['signup--button-container']}>

                    <div className={classes['signup--input']}>
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
                    <TextField
                        label="Name"
                        type="name"
                        {...register('name', {
                            required: 'Name is required',
                            minLength: {
                                value: 2,
                                message: 'Name must be at least 2 characters long'
                            }
                        })}
                    />

                    <div className={classes['signup--input']}>
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

                    <div className={classes['signup--input']}>
                        <TextField
                            label="Confirm Password"
                            type="password"
                            {...register('confirmPassword', {
                                required: 'Password is required',
                                validate: (value) => {
                                    return value === password || 'Passwords do not match'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters long'
                                }
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                    </div>

                    <Button type="submit">Submit</Button>

                </div>
            </FormControl>
        </form>
    );
};

export default SignUp;