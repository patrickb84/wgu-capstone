import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ROUTES } from '../routes/AppRouter'

export interface IHomePageProps {}

export const HomePage = (props: IHomePageProps) => {
	return (
		<div className="pt-5">
			<Hero />

			<section className="pt-5">
				<Container>
					<div className="text-center">
						<h1>Welcome to the Home Page</h1>
					</div>
				</Container>
			</section>
		</div>
	)
}

const Hero = () => {
	return (
		<header className="bg-light">
			<Container>
				<div
					className="text-center d-flex align-items-center justify-content-center flex-column pt-3"
					style={{ height: '30rem' }}>
					<h1 className="font-display text-brand display-2">Sous Chef!</h1>
					<p className="fs-1 text-secondary font-hand" style={{ opacity: 0.85 }}>
						Your meal plan assistant
					</p>
					<div className="pt-4">
						<Link to={ROUTES.REGISTER} className="btn btn-brand btn-lg px-5 mx-1 mx-lg-2">
							Sign Up
						</Link>
						<Link
							to={ROUTES.LOGIN}
							className="mx-1 mx-lg-2 btn btn-outline-secondary btn-lg px-5">
							Sign In
						</Link>
					</div>
				</div>
			</Container>
		</header>
	)
}
