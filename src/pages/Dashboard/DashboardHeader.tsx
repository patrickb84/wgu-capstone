import { IconButton } from 'components/IconButton'
import * as React from 'react'
import { Container } from 'react-bootstrap'

export interface IDashboardHeaderProps {}

export default function DashboardHeader(props: IDashboardHeaderProps) {
	return (
		<header className="py-3 bg-tertiary">
			<Container className="py-5 d-flex align-items-center h-100 justify-content-between">
				<h1 className="text-white mb-0">My Meal Plan</h1>
				<IconButton
					iconFaName="fa-circle-question"
					iconFaGroup="fas"
					colorVariant="white"
					size="2rem"
				/>
			</Container>
		</header>
	)
}
