import * as React from 'react'
import { Layout } from '../components/Layout'
import { Link } from 'react-router-dom'

export interface IHomePageProps {}

export const HomePage = (props: IHomePageProps) => {
	return (
		<Layout>
			<h1>Home</h1>
			<p>Marketing page. User must log in.</p>
			<Link to="/login" className='btn btn-primary px-4'>Login</Link>
		</Layout>
	)
}
