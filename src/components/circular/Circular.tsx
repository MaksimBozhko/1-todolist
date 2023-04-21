import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { styled } from '@mui/material'

const StyledBox = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	marginTop: '500px'
})

export const Circular = () => {
	return (
		<StyledBox>
			<CircularProgress />
		</StyledBox>
	)
}
