interface SplitTextProps {
	children: React.ReactNode
}

export const SplitText = ({ children }: SplitTextProps) => {
	return (
		<div className="mb-2 pt-2">
			<small className="text-center">
				<hr className="mb-0 mx-5" />
				<div style={{ transform: 'translateY(-.8rem)', backgroundColor: 'transparent' }}>
					<span className="text-small text-muted bg-white px-3">{children}</span>
				</div>
			</small>
		</div>
	)
}
