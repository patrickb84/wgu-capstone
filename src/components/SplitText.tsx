interface SplitTextProps {
	children: React.ReactNode
}

export const SplitText = ({ children }: SplitTextProps) => {
	return (
		<small className="text-center">
			<hr className="mb-0 mx-5" />
			<div style={{ transform: 'translateY(-.8rem)' }}>
				<span className="text-small text-muted bg-white px-3">{children}</span>
			</div>
		</small>
	)
}
