import { Link } from 'react-router-dom'
import ROUTES from 'routes/routes'
import healthyfood from 'styles/img/healthy_food.png'

export interface IErrorPageProps {}

export function ErrorPage(props: IErrorPageProps) {
	return (
		<div className="h-100 w-100 d-flex align-items-center justify-content-center bg-secondary text-white flex-column">
			<img src={healthyfood} alt="healthy food" style={{ maxWidth: 360 }} className='mb-4' />
			<p>Sorry for the error.</p>
			<Link to={ROUTES.HOME} className="btn btn-brand">
				Go back to home
			</Link>
		</div>
	)
}
