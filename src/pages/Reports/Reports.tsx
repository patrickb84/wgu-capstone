import Layout from 'components/Layout'
import PageHeader, { PageTitle } from 'pages/shared/PageHeader'
import { Button, Container } from 'react-bootstrap'

export interface IReportsProps {}

export function Reports(props: IReportsProps) {
	return (
		<Layout>
			<PageHeader>
				<div>
					<PageTitle>My Reports</PageTitle>
				</div>
				<div>
					<Button>Button</Button>
				</div>
         </PageHeader>
         <Container className='my-3'>
            
         </Container>
		</Layout>
	)
}
