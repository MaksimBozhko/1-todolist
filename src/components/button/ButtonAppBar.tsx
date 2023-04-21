import * as React from 'react'
import { useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import LinearProgress from '@mui/material/LinearProgress'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks-RTK'
import { authThunks } from '../../features/auth/authSlice'

export const ButtonAppBar = () => {
	const dispatch = useAppDispatch()
	const { status } = useAppSelector(state => state.app)
	const { isLoggedIn } = useAppSelector(state => state.auth)
	const logoutHandler = useCallback(() => {
		dispatch(authThunks.logout())
	}, [])
	return (
		<Box sx={{ flexGrow: 1, position: 'relative', height: '64px' }}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						News
					</Typography>
					{isLoggedIn && (
						<Button onClick={logoutHandler} color='inherit'>
							Log out
						</Button>
					)}
				</Toolbar>
			</AppBar>
			{status == 'loading' && <LinearProgress />}
		</Box>
	)
}
