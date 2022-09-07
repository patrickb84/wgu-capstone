import { IconButton } from 'components/IconButton'
import * as React from 'react'
import { Container } from 'react-bootstrap'

export interface IDashboardHeaderProps {
	bgColor?: 'primary' | 'secondary' | 'tertiary' | 'brand' | 'dark' | 'light' | 'white'
	title?: string
	children?: React.ReactNode
	breadcrumb?: React.ReactNode
}

export default function DashboardHeader(props: IDashboardHeaderProps) {
	const { bgColor = 'brand', title, breadcrumb } = props

	return (
		<header className={`py-3 bg-${bgColor}`}>
			<Container className="py-5 d-flex align-items-center h-100 justify-content-between">
				{breadcrumb}
				<h1 className="text-white mb-0">{title}</h1>
			</Container>
		</header>
	)
}
