import './RecipeCard.scss'
import { Spacer } from 'components/Spacer'
import { Badge, Card, Col } from 'react-bootstrap'
import { Recipe } from 'types/Recipe'
import { ButtonBookmark } from './ButtonBookmark'
import { ButtonAddToPlan } from './ButtonAddToPlan'
import { ButtonViewDetails } from './ButtonViewDetails'

export interface IRecipeCardProps {
	recipe: Recipe
}

export function RecipeCard({ recipe }: IRecipeCardProps) {
	const { name, imageUrl, area, category } = recipe
	return (
		<Col lg={4} className="d-flex mb-4 recipe-card">
			<Card className="w-100">
				<Card.Header className="bg-brand text-white">
					<div className="header-text">
						<ButtonBookmark recipeId={recipe.id} />
						{name}
					</div>
				</Card.Header>
				<img src={imageUrl} alt={name} />
				<Card.Body className="d-flex justify-content-between align-items-start">
					<div>
						{area && <Badge className="bg-tertiary">{area}</Badge>}
						{area && category && <Spacer w={0.2} />}
						{category && <Badge className="bg-gray-500">{category}</Badge>}
					</div>

					<div className="d-flex flex-row">
						<ButtonAddToPlan recipeId={recipe.id} />
						<Spacer w={0.5} />
						<ButtonViewDetails recipeId={recipe.id} />
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}
