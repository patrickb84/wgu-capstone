import Spacer from 'components/Spacer'
import { Link } from 'react-router-dom'
import { Recipe } from 'types/Recipe'

const RecipePageMetadata = (recipe: Recipe) => {
	return (
		<div className="small d-flex py-4 mb-2 w-100 flex-wrap">
			{recipe.area && (
				<div className="me-3 py-1">
					<span className="text-muted">Area:</span>
					<Spacer w={0.3} />
					<span className="text-tertiary">{recipe.area}</span>
				</div>
			)}
			{recipe.category && (
				<div className="me-3 py-1">
					<span className="text-muted">Category:</span>
					<Spacer w={0.3} />
					<span className="text-tertiary">{recipe.category}</span>
				</div>
			)}
			{recipe.tags && (
				<div className="me-3 py-1">
					<span className="text-muted">Tags:</span>
					<Spacer w={0.3} />
					<span className="text-tertiary">{recipe.tags.split(',').join(', ')}</span>
				</div>
			)}

			{recipe.youtubeUrl && (
				<div className="me-3 ms-lg-auto py-1">
					<Link className="d-flex align-items-center text-tertiary i" to={recipe.youtubeUrl}>
						<span>Watch it on YouTube</span> <Spacer w={0.5} />
						<i className="fab fa-youtube fa-lg" />
					</Link>
				</div>
			)}
		</div>
	)
}

export default RecipePageMetadata
