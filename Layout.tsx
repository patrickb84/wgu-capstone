import React, { useState, useContext } from 'react'

export interface ILayoutProps {
	children: React.ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {
	return (
		<>
			<div className="container mt-5">{children}</div>
		</>
	)
}
