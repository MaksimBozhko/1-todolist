import React from 'react';
import {useFormik} from 'formik';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {login} from '../../reducer/authReducer';
import {Navigate} from 'react-router-dom';

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
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">
                <p>Email Address</p>
                <input id="email" type="email" {...formik.getFieldProps('email')}/>
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            </label>
            <label htmlFor="password">
                <p>Password</p>
                <input id="password" type="password" {...formik.getFieldProps('password')}/>
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            </label>
            <label htmlFor="rememberMe">
                <div>
                    <input id="rememberMe" type="checkbox"{...formik.getFieldProps('rememberMe')}/>
                    <p>remember Me</p>
                </div>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};