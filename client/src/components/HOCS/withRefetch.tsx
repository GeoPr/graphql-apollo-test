import React, { ComponentType, FC, useEffect } from 'react'
import { useContextValue } from '../../state/state'

interface IProps {
	refetch: () => any
}

export function withRefetch<T>(WrappedComponent: ComponentType<T>) {
	const ReturnableComponent: FC<IProps & T> = ({ refetch, ...props }) => {
		const { modal } = useContextValue()

		useEffect(() => {
			refetch()
		}, [refetch, modal])

		return <WrappedComponent {...props as T} />
	}

	return ReturnableComponent
}