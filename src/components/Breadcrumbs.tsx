import * as React from 'react'
import BootstrapBreadcrumb from 'react-bootstrap/Breadcrumb'
import BootstrapBreadcrumbItem from 'react-bootstrap/BreadcrumbItem'
import { LinkContainer } from 'react-router-bootstrap'

// export interface IBootstrapBreadcrumbItemProps {
// 	active?: boolean
// 	href?: string
// 	title?: string
// 	target?: string
// 	onClick?: (event: React.MouseEvent<HTMLElement>) => void
// 	children?: React.ReactNode
// }

export interface IBreadcrumbItemProps {
	active?: boolean
	to: string
	label: string
}

export interface IBreadcrumbProps {
	items: IBreadcrumbItemProps[]
}

export default function Breadcrumbs({ items }: IBreadcrumbProps) {
	return (
		<>
			<BootstrapBreadcrumb className="small">
				<LinkContainer to={'/'}>
					<BootstrapBreadcrumbItem>
						<span className="text-white">
							<i className="fad fa-home" />
						</span>
					</BootstrapBreadcrumbItem>
				</LinkContainer>
				{items.map((item, index) => (
					<LinkContainer key={index} to={item.to}>
						<BootstrapBreadcrumbItem>
							<span className="text-white">{item.label}</span>
						</BootstrapBreadcrumbItem>
					</LinkContainer>
				))}
			</BootstrapBreadcrumb>
		</>
	)
}
