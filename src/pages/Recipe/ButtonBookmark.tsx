import { useState } from 'react'
import Tippy from '@tippyjs/react'

interface IButtonBookmarkProps {
	// isBookmarked?: boolean
	recipeId?: string
}

export const ButtonBookmark = ({ recipeId }: IButtonBookmarkProps) => {
	const [isBookmarked, setIsBookmarked] = useState(false)

	const handleClick = () => {
		console.log('bookmark clicked', recipeId)
		setIsBookmarked(!isBookmarked)
	}

	return (
		<Tippy content={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
			<button className="icon-button me-2" onClick={handleClick}>
				<i className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark`} />
			</button>
		</Tippy>
	)
}
