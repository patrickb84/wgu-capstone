import { INavbarSectionProps } from 'components/Navbar'
import { useState } from 'react'

export default function useNavbar() {
	const [isHidden, setIsHidden] = useState<boolean | null>(false)
	const [contentLeft, setContentLeft] = useState<React.ReactNode | null>(null)
	const [contentRight, setContentRight] = useState<INavbarSectionProps | null>(null)
	const [contentCenter, setContentCenter] = useState<INavbarSectionProps | null>(null)
	return {
		isHidden,
		setIsHidden,
		contentLeft,
		setContentLeft,
		contentRight,
		setContentRight,
		contentCenter,
		setContentCenter
	}
}
