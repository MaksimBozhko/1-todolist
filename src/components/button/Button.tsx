import React, { memo } from 'react'
import { FilterValuesType } from '../../features/todolists-list/todolists/todolistSlice'

type ButtonPropsType = {
	name: string
	handler: () => void
	style?: string
	disabled?: boolean
	filter?: FilterValuesType
}

export const Button: React.FC<ButtonPropsType> = memo(
	({ name, handler, disabled, filter }) => {
		console.log('button')
		const buttonHandler = () => {
			handler()
		}

		const buttonClasses = filter === name ? 'activeFilter' : undefined

		return (
			<button
				className={buttonClasses}
				disabled={disabled}
				onClick={buttonHandler}
			>
				{name}
			</button>
		)
	}
)
