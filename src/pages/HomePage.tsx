import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ROUTES } from '../routes/AppRouter'

export interface IHomePageProps {}

export const HomePage = (props: IHomePageProps) => {
	return (
		<section className="bg-light pt-5">
			<Container>
				<div
					style={{
						height: '35rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
					<h1 className="font-display text-brand display-4 mb-4">
						Welcome to Sous Chef, try us out
					</h1>
					<div className="pt-5">
						<Link to={ROUTES.REGISTER} className="btn btn-brand btn-lg px-5">
							Sign Up
						</Link>
						<Link to={ROUTES.LOGIN} className="ms-3 btn btn-outline-secondary btn-lg px-5">
							Sign In
						</Link>
					</div>
				</div>
			</Container>
		</section>
	)
}
