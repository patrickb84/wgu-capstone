import * as React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export interface IScheduleDayButtonAddRecipeProps {
	date: Date
}

export default function ScheduleDayButtonAddRecipe(props: IScheduleDayButtonAddRecipeProps) {
	const navigate = useNavigate()
	return (
		<Button variant="light" size={'sm'} className="w-100" onClick={() => navigate('recipes')}>
			Add Recipe
		</Button>
	)
}
