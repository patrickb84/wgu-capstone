import './RecipeCard.scss'
import { Spacer } from 'components/Spacer'
import { Badge, Card, Col } from 'react-bootstrap'
import { Recipe } from 'types/Recipe'
import { Link } from 'react-router-dom'
import ButtonBookmark from './ButtonBookmark'
import ButtonAddToPlan from './ButtonAddToPlan'

export interface IRecipeCardProps {
	recipe: Recipe
}

export function RecipeCard({ recipe }: IRecipeCardProps) {
	const { name, imageUrl, area, category, id } = recipe
	return (
		<Col lg={4} className="d-flex mb-4 recipe-card">
			<Card className="w-100 shadow-lg">
				<Card.Header className="bg-brand text-white">
					<div className="d-flex align-items-center" style={{ marginLeft: -5 }}>
						<ButtonBookmark
							recipeId={recipe.id}
							iconFaGroup="far"
							colorVariant="white"
							size={'1.5rem'}
						/>
						<Spacer w={0.4} />
						<span className="header-text">{name}</span>
					</div>
				</Card.Header>
				<RecipeCardImage imageUrl={imageUrl} name={name} id={id} />
				<Card.Body className="d-flex justify-content-between align-items-center">
					<div>
						{area && <Badge className="bg-tertiary">{area}</Badge>}
						{area && category && <Spacer w={0.2} />}
						{category && <Badge className="bg-gray-500">{category}</Badge>}
					</div>

					<div>
						<ButtonAddToPlan recipeId={recipe.id} size="1.5rem" iconFaGroup="far" />
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

type IRecipeCardImageProps = Pick<Recipe, 'imageUrl' | 'name' | 'id'>

function RecipeCardImage({ imageUrl, name, id }: IRecipeCardImageProps) {
	return (
		<div className="w-100 position-relative recipe-card-image">
			<div className="recipe-card-image-overlay">
				<Link to={`/recipe/${id}`} className="text-center no-underline text-white">
					<i className="fat fa-book fa-3x" />
					<Spacer h={1} />
					<span className="font-hand fs-4">View Recipe Details</span>
				</Link>
			</div>
			<img className="w-100" src={imageUrl} alt={name} />
		</div>
	)
}
