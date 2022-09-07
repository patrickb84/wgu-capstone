interface ISpacerProps {
	h?: number
	w?: number
}

const Spacer = ({ h: height, w: width }: ISpacerProps) => {
	if (!!width) return <span style={{ marginLeft: `${width}rem` }} />
	if (!!height) return <div style={{ height: `${height}rem` }} />
	throw new Error('Spacer requires either a height or width')
}

export default Spacer