export default interface IGenericButtonProps {
	variant?: string // 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' | undefined
	size?: 'sm' | 'lg'
	className?: string
	style?: React.CSSProperties
	children?: React.ReactNode
}
