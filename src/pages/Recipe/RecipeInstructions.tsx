import * as React from 'react'
import { IRecipe } from 'types/Recipe'

export function RecipeInstructions(recipe: IRecipe) {
	return (
		<>
			<h2 className="display-4 mt-0 font-hand text-brand d-flex align-items-end justify-content-between">
				Instructions
			</h2>
			<ol>
				{recipe.instructions?.map((instruction, idx) => (
					<li key={idx} className="my-4 pb-1">
						{instruction}
					</li>
				))}
			</ol>
		</>
	)
}
