import Tippy from '@tippyjs/react'
import * as React from 'react'

interface IconButtonProps {
	onClick?: () => void
	className?: string
	style?: React.CSSProperties
	iconFaName: string
	iconFaGroup?: string
	colorVariant?: string
	size?: number | string
	tooltip?: string
}

export interface GenericIconButtonProps
	extends Omit<IconButtonProps, 'iconFaName' | 'onClick' | 'tooltip'> {}

const RenderButton = React.forwardRef((props: IconButtonProps, ref) => {
	const { onClick, iconFaName, iconFaGroup, colorVariant, size } = props
	return (
		<button
			ref={ref as React.Ref<HTMLButtonElement>}
			onClick={onClick}
			className={`icon-button icon-button-lg text-${colorVariant} ${props.className}`}
			style={{ fontSize: size, ...props.style }}>
			<i className={`${iconFaName} ${iconFaGroup}`} />
		</button>
	)
})

export function IconButton(props: IconButtonProps) {
	const { tooltip } = props

	return tooltip ? (
		<Tippy content={tooltip}>
			<RenderButton {...props} />
		</Tippy>
	) : (
		<RenderButton {...props} />
	)
}
