const logHelper = () => {
	const pickColorStringAndEmoji = (color: string | number) => {
		switch (color) {
			case 'red':
				return { color: 'red', emoji: '❌', $emoji: '💀' }
			case 'green':
				return { color: 'green', emoji: '🏵', $emoji: '🧚‍♂️' }
			case 'yellow':
				return { color: 'yellow', emoji: '🐙', $emoji: '🐳' }
			case 'blue':
				return { color: 'blue', emoji: '🧠', $emoji: '🍄' }
			case 'purple':
				return { color: 'purple', emoji: '🦄', $emoji: '🍀' }
			case 'orange':
				return { color: 'orange', emoji: '🍊', $emoji: '🌵' }
			default:
				return { color: 'blue', emoji: '🧠', $emoji: '🍄' }
		}
	}

	const getColorContrast = (color: string) => {
		switch (color) {
			case 'red':
				return 'white'
			case 'green':
				return 'white'
			case 'yellow':
				return 'black'
			case 'blue':
				return 'white'
			case 'purple':
				return 'white'
			case 'orange':
				return 'black'
			default:
				return 'white'
		}
	}

	type CreateConsoleGroupWhole = (
		title: string,
		color: string | number,
		isCollapsed: boolean
	) => PrintLogAction

	type PrintLogAction = (callback?: () => void | null) => void

	const createConsoleGroupWhole: CreateConsoleGroupWhole = (
		title: string,
		color: string | number,
		isCollapsed: boolean
	) => {
		const { color: colorString, $emoji } = pickColorStringAndEmoji(color)
		const $colorString = getColorContrast(colorString)
		const titleString = `%c${$emoji} ${title}`
		const titleStyle = `background: ${colorString}; color: ${$colorString}; padding: 2px 4px; border-radius: 3px;`

		const printLogAction: PrintLogAction = (callback?: () => void | null) => {
			console.group(titleString, titleStyle)
			callback && callback()
			console.groupEnd()
		}
		const printLogActionCollapsed: PrintLogAction = (callback?: () => void | null) => {
			console.groupCollapsed(titleString, titleStyle)
			callback && callback()
			console.groupEnd()
		}
		return isCollapsed ? printLogActionCollapsed : printLogAction
	}

	return {
		log: (title: string, color: string | number, callback?: () => void) =>
			createConsoleGroupWhole(title, color, false)(callback ? callback : () => {}),
		logCollapsed: (title: string, color: string | number, callback?: () => void) =>
			createConsoleGroupWhole(title, color, true)(callback ? callback : () => {})
	}
}

const bonsole = {
	data: (title: string = 'Data', data: any) =>
		logHelper().logCollapsed(title, 'blue', () => console.log(data)),

	error: (title: string = 'Error', data: any) =>
		logHelper().log(title, 'red', () => console.log(data)),
	warn: (title: string = 'Warning', data: any) =>
		logHelper().log(title, 'yellow', () => console.log(data)),
	info: (title: string = 'Info', data: any) =>
		logHelper().log(title, 'blue', () => console.log(data)),
	success: (title: string = 'Success', data: any) =>
		logHelper().log(title, 'green', () => console.log(data)),
	debug: (title: string = 'Debug', data: any) =>
		logHelper().log(title, 'purple', () => console.log(data)),
	fire: (title: string = 'Important', data: any) =>
		logHelper().log(title, 'orange', () => console.log(data))
}

export default bonsole
