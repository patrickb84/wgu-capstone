import React from 'react'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { AppProvider } from 'hooks/AppProvider'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from 'api/firebase/app'

test('loads homepage and navbar', async () => {
	render(<App />, { wrapper: AppProvider })

	const homepage = await screen.findByTestId('homepage')
	expect(homepage).toBeInTheDocument()

	const navbar = await screen.findByTestId('navbar')
	expect(navbar).toBeInTheDocument()
})

test('firebase signs in and out', async () => {
	render(<App />, { wrapper: AppProvider })

	await signOut(auth)
	expect(auth.currentUser).toBeNull()

	const { user } = await signInWithEmailAndPassword(auth, 'test@sous.chef.wgu.app', 'password')
	await waitFor(() => expect(user).not.toBeNull())
	expect(user.email).toBe('test@sous.chef.wgu.app')

	await signOut(auth)
	expect(auth.currentUser).toBeNull()

	cleanup()
})