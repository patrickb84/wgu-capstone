import { GenericIconButtonProps } from "./IconButton"

interface IButtonBookmarkProps extends GenericIconButtonProps {
	recipeId: string
}

const ButtonBookmark = (props: IButtonBookmarkProps) => {
	// const { findBookmark } = useBookmarks()
	// const [bookmark, setBookmark] = useState<Bookmark | undefined>(undefined)
	// const { recipeId, iconFaGroup, colorVariant, size } = props
	// const user = useUser()

	// const handleClick = () => {
	// 	if (user && recipeId) {
	// 		// if (!bookmark) {
	// 		// 	Bookmark.addBookmark({ recipeId, userId: user.uid, dateCreated: new Date() }).then(
	// 		// 		bookmark => setBookmark(bookmark)
	// 		// 	)
	// 		// } else {
	// 		// 	Bookmark.removeBookmark(bookmark?.id).then(success => success && setBookmark(undefined))
	// 		// }
	// 	}
	// }

	// useEffect(() => {
	// 	if (user && recipeId) {
	// 		setBookmark(findBookmark(recipeId))
	// 	}
	// }, [findBookmark, recipeId, user])

	// const iconGroup = !bookmark ? (iconFaGroup ? iconFaGroup : 'fa-regular') : 'fa-solid'

	// return (
	// 	<>
	// 		<IconButton
	// 			tooltip={!!bookmark ? 'Remove bookmark' : 'Add bookmark'}
	// 			onClick={handleClick}
	// 			iconFaName="fa-bookmark"
	// 			iconFaGroup={iconGroup}
	// 			colorVariant={colorVariant ? colorVariant : 'secondary'}
	// 			size={size}
	// 			className={props.className}
	// 		/>
	// 	</>
	// )
	return <></>
}

export default ButtonBookmark
