import { useState } from 'react'
import { IconButton, IIconButton } from 'components/IconButton'

interface IButtonBookmarkProps extends IIconButton {
	// isBookmarked?: boolean
	recipeId?: string
}

export const ButtonBookmark = (props: IButtonBookmarkProps) => {
	const { recipeId, iconFaGroup, colorVariant, size } = props
	const [isBookmarked, setIsBookmarked] = useState(false)

	const handleClick = () => {
		console.log('bookmark clicked', recipeId)
		setIsBookmarked(!isBookmarked)
	}

	const iconGroup = !isBookmarked ? (iconFaGroup ? iconFaGroup : 'fa-regular') : 'fa-solid'

	return (
		<>
			<IconButton
				tooltip={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
				onClick={handleClick}
				iconFaName="fa-heart"
				iconFaGroup={iconGroup}
				colorVariant={colorVariant ? colorVariant : 'secondary'}
				size={size}
				className={props.className}
			/>
		</>
	)
}
