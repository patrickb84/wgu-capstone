import * as React from 'react'
import { IMeasuredIngredient } from 'types/Recipe'

const RecipePageIngredientsList = ({ ingredients }: { ingredients: IMeasuredIngredient[] }) => {
	return (
		<>
			<h2 className="h1 font-hand text-tertiary mb-0">Ingredients</h2>
			<div className="border rounded px-5 px-lg-3 py-4">
				{ingredients.map((ingredient, idx) => (
					<div key={idx} className="d-flex align-items-end justify-content-between my-1">
						<span className="fw-semibold">{ingredient.ingredientName}</span>
						<small className="text-brand">{ingredient.measure}</small>
					</div>
				))}
			</div>
		</>
	)
}

export default RecipePageIngredientsList
