import React from 'react'
import { FormikHelpers, useFormik } from 'formik'
import { useAppSelector } from '../../common/hooks/hooks-RTK'
import { Navigate } from 'react-router-dom'
import { authThunks } from './authSlice'
import { LoginParamsType } from '../../common/types/common.types'
import { useActions } from '../../common/hooks/useActions'
import Grid from '@mui/material/Grid/Grid'
import { FormControl, FormControlLabel, FormGroup, FormLabel, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { getIsLoggedIn } from './auth.selectors'

export const Login = () => {
	const { login } = useActions(authThunks)
	const isLoggedIn = useAppSelector(getIsLoggedIn)

	const formik = useFormik({
		validate: values => {
			if (!values.email) return { email: 'Email is required' }
			if (!values.password) return { password: 'Password is required' }
		},
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
			login(values)
				.unwrap()
				.catch(reason => {
					reason.fieldsErrors.forEach((fieldError: any) => {
						formikHelpers.setFieldError(fieldError.field, fieldError.error)
					})
				})
		}
	})

	if (isLoggedIn) return <Navigate to='/1-todolist' />
	return (
		<Grid container justifyContent={'center'}>
			<Grid item justifyContent={'center'}>
				<form onSubmit={formik.handleSubmit}>
					<FormControl>
						<FormLabel>
							<p>
								To log in get registered
								<a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
									{' '}
									here
								</a>
							</p>
							<p>or use common test account credentials:</p>
							<p>Email: free@samuraijs.com</p>
							<p>Password: free</p>
						</FormLabel>
						<FormGroup>
							<TextField label='Email' margin='normal' {...formik.getFieldProps('email')} />
							{formik.errors.email ? <div>{formik.errors.email}</div> : null}
							<TextField type='password' label='Password' margin='normal' {...formik.getFieldProps('password')} />
							{formik.errors.password ? <div>{formik.errors.password}</div> : null}
							<FormControlLabel label={'Remember me'} control={<Checkbox />} {...formik.getFieldProps('rememberMe')} />
							<Button type={'submit'} variant={'contained'} color={'primary'}>
								Login
							</Button>
						</FormGroup>
					</FormControl>
				</form>
			</Grid>
		</Grid>
	)
}
