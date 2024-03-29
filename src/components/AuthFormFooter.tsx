import { Link } from 'react-router-dom'
import { GoogleButton } from 'components/GoogleButton'
import { SplitText } from 'components/SplitText'
import ROUTES from 'routes/routes'

export interface IAuthFormFooterProps {}

export function AuthFormFooter(props: IAuthFormFooterProps) {
	return (
		<>
			<div className="mb-3" />
			<SplitText>or</SplitText>
			<div className="mb-3" />
			<div className="text-center d-flex flex-column px-5">
				<GoogleButton className="btn-gray-200" />
				<Link className="btn btn-link mt-2" to={ROUTES.HOME}>
					Back to Home Page
				</Link>
			</div>
		</>
	)
}
