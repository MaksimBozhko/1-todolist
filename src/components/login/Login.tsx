import React from 'react';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks-RTK';
import {Navigate} from 'react-router-dom';
import Grid from "@mui/material/Grid/Grid";
import {FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {login} from '../../toolkit/authSlice';

export const Login = () => {
    const dispatch = useAppDispatch()
    const {isLoggedIn} = useAppSelector(state => state.login)
    const formik = useFormik({
        validate: values => {
            if (!values.email) return {email: 'Email is required'}
            if (!values.password) return {password: 'Password is required'}
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => dispatch(login(values)),
    });
    if (isLoggedIn) return <Navigate to='/1-todolist' />
    return (<Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal" {...formik.getFieldProps('email')}/>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal" {...formik.getFieldProps('password')}/>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox/>} {...formik.getFieldProps('rememberMe')}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
                </form>
            </Grid>
        </Grid>

    );
};

// <form onSubmit={formik.handleSubmit}>
//     <label htmlFor="email">
//         <p>Email Address</p>
//         <input id="email" type="email" {...formik.getFieldProps('email')}/>
//         {formik.errors.email ? <div>{formik.errors.email}</div> : null}
//     </label>
//     <label htmlFor="password">
//         <p>Password</p>
//         <input id="password" type="password" {...formik.getFieldProps('password')}/>
//         {formik.errors.password ? <div>{formik.errors.password}</div> : null}
//     </label>
//     <label htmlFor="rememberMe">
//         <div>
//             <input id="rememberMe" type="checkbox"{...formik.getFieldProps('rememberMe')}/>
//             <p>remember Me</p>
//         </div>
//     </label>
//     <button type="submit">Submit</button>
// </form>