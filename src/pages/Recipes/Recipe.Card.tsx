import Spacer from 'components/Spacer'
import { useUser } from 'hooks/UserProvider'
import { Badge, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'
import { ButtonAddRecipeToPlan } from './ButtonAddRecipeToPlan'
import { Recipe } from './types/Recipe'

export interface IRecipeCardProps {
	recipe: Recipe
	isUserRecipe?: boolean
}

export function RecipeCard({ recipe, ...props }: IRecipeCardProps) {
	const { name, imageUrl, area, category, id } = recipe
	const user = useUser()

	return (
		<Card className="w-100 shadow-lg recipe-card">
			<Card.Header className="bg-brand text-white">
				<span className="header-text">{name}</span>
			</Card.Header>
			<RecipeCardImage imageUrl={imageUrl} name={name} id={id} />
			<Card.Body className="d-flex justify-content-between align-items-center">
				<div>
					{props.isUserRecipe && <Badge className="bg-secondary">User submitted</Badge>}
					{area && <Badge className="bg-tertiary">{area}</Badge>}
					{area && category && <Spacer w={0.2} />}
					{category && <Badge className="bg-gray-500">{category}</Badge>}
				</div>
				<div>{user && !props.isUserRecipe && <ButtonAddRecipeToPlan recipe={recipe} size={28} />}</div>
			</Card.Body>
		</Card>
	)
}

type IRecipeCardImageProps = Pick<Recipe, 'imageUrl' | 'name' | 'id'>

function RecipeCardImage({ imageUrl, name, id }: IRecipeCardImageProps) {
	return (
		<div className="w-100 position-relative recipe-card-image">
			<div className="recipe-card-image-overlay">
				<Link
					to={ROUTES.TO_RECIPE(id)}
					// to={!isUserRecipe ? ROUTES.TO_RECIPE(id) : ROUTES.TO_USER_RECIPE(id)}
					className="text-center no-underline text-white">
					<i className="fat fa-book fa-3x" />
					<Spacer h={1} />
					<span className="font-hand fs-4">View Recipe Details</span>
				</Link>
			</div>
			<img
				className="w-100"
				src={imageUrl}
				alt={name}
				onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
					e.currentTarget.src = 'https://via.placeholder.com/640x640'
				}}
			/>
		</div>
	)
}
