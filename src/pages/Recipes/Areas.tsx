import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import { useRecipeData } from 'hooks/RecipeDataProvider'
import PageHeader, { PageTitle } from 'pages/shared/PageHeader'
import * as React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'

export interface IRecipeAreasProps {}

export function RecipeAreas(props: IRecipeAreasProps) {
	const { areas } = useRecipeData()
	return (
		<>
			<Layout>
				<PageHeader>
					<div>
						<Breadcrumbs
							items={[
								{
									to: '/recipes',
									label: 'Recipes'
								},
								{
									to: '/recipes/areas',
									label: 'Areas'
								}
							]}
						/>
						<PageTitle>Areas</PageTitle>
					</div>
				</PageHeader>
				<Container className="my-3">
					<div className="d-flex flex-wrap">
						{areas.map(area => (
							<div className="p-2" key={area.strArea}>
								<Link
									to={ROUTES.TO_RECIPE_TYPE_VIEW(
										'area',
										area.strArea?.toLowerCase().split(' ').join('_') || '',
										area.strArea || ''
									)}>
									{area.strArea}
								</Link>
							</div>
						))}
					</div>
				</Container>
			</Layout>
		</>
	)
}
