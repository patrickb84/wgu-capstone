import Breadcrumbs from 'components/Breadcrumbs'
import ButtonAddToPlan from 'components/ButtonAddToPlan'
import ButtonBookmark from 'components/ButtonBookmark'
import { IIconButton } from 'components/IconButton'
import Container from 'react-bootstrap/Container'
import { ROUTES } from 'routes/AppRouter'
import { IRecipe } from 'types/Recipe'

const iconProps: Pick<IIconButton, 'size' | 'className' | 'colorVariant'> = {
	size: '1.5em',
	className: 'mx-2',
	colorVariant: 'white'
}

export function RecipeHeader(recipe: IRecipe) {
	const breadcrumbs = [
		{ label: 'Meal Plan', to: ROUTES.MEALPLAN },
		{ label: 'Recipes', to: ROUTES.RECIPES },
		{ label: recipe.name, to: '.', active: true }
	]
	return (
		<>
			<Container fluid className="bg-brand">
				<Container className="bg-brand py-lg-5 py-4 d-flex flex-column align-items-start">
					<Breadcrumbs items={breadcrumbs} />
					<div className="d-flex w-100 align-items-lg-center align-items-end  justify-content-between">
						<div>
							<h1 className="text-white display-4 mb-0">{recipe.name}</h1>
						</div>
						<div className="d-flex flex-lg-row flex-column justify-content-center align-items-lg-end align-items-center">
							<ButtonBookmark iconFaGroup="fal" {...iconProps} recipeId={recipe.id} />
							<ButtonAddToPlan
								recipeId={recipe.id}
								iconFaGroup="fas"
								{...iconProps}
								recipeName={recipe.name}
							/>
							{/* <IconButton iconFaName="fa-youtube" iconFaGroup="fa-brands" {...iconProps} /> */}
						</div>
					</div>
				</Container>
			</Container>
		</>
	)
}
