import React, { ComponentType, FC } from 'react'
import { Loader } from '../Loader/Loader'

interface IProps {
	loading: boolean
}

export function withLoader<T>(WrappedComponent: ComponentType<T>) {
	const ReturnableComponent: FC<IProps & T> = ({ loading, ...props }) => {
		if (loading) {
			return <Loader />
		}

		return <WrappedComponent {...props as T} />
	}

	return ReturnableComponent
}