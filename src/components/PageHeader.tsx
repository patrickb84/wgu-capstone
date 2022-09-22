import { Container } from 'react-bootstrap'

export interface IPageHeaderProps {
	variant?: string
	colorVariant?: string
	className?: string
	style?: React.CSSProperties
	children?: React.ReactNode
	nonStandard?: boolean
}

export default function PageHeader({
	variant,
	colorVariant,
	className,
	children,
	nonStandard
}: IPageHeaderProps) {
	const headerClassBuilder = () => {
		let classNames = []
		classNames.push(`bg-${variant ? variant : 'secondary-gray'}`)
		classNames.push(`text-${colorVariant ? colorVariant : 'white'}`)

		if (className) {
			classNames.push(className)
		}
		return classNames.join(' ')
	}

	if (nonStandard) {
		return (
			<header data-testid='page-header' className={headerClassBuilder()}>
				<Container className="py-4">{children}</Container>
			</header>
		)
	}

	return (
		<header data-testid='page-header' className={headerClassBuilder()}>
			<Container className="py-4">
				{nonStandard ? children : <FlexCenterBetween>{children}</FlexCenterBetween>}
			</Container>
		</header>
	)
}

export interface IChildrenProps {
	children?: React.ReactNode
}

export const FlexCenterBetween = ({ children }: IChildrenProps) => {
	return <div className="d-flex align-items-center justify-content-between flex-wrap">{children}</div>
}

interface IPageTitleProps {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
}
export const PageTitle = (props: IPageTitleProps) => {
	const { children, className } = props
	return <h1 data-testid='page-title' className={`font-display mb-lg-0 ${className}`}>{children}</h1>
}

export const PageSubtitle = (props: IChildrenProps) => {
	return <p data-testid='page-subtitle' className="mb-0">{props.children}</p>
}
