import * as React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { IconButton } from './IconButton'

export interface IHelperModalProps {
	children?: React.ReactNode
	title?: string
	asButton?: boolean
	colorVariant?: string
	iconFaGroup?: string
	style?: React.CSSProperties
}

export function HelperModal(props: IHelperModalProps) {
	const [show, setShow] = React.useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)

	const { children, asButton } = props
	return (
		<>
			{asButton ? (
				<Button variant="primary" onClick={handleShow}>
					<i className="fad fa-circle-question"></i>
				</Button>
			) : (
				<IconButton
					iconFaName="fa-circle-question"
					iconFaGroup={props.iconFaGroup ? props.iconFaGroup : 'far'}
					onClick={handleShow}
					tooltip="Help"
					style={props.style}
					colorVariant={props.colorVariant ? props.colorVariant : 'secondary'}
				/>
			)}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{props.title ? props.title : 'Help'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
				<Modal.Footer>
					<button className="btn btn-secondary" onClick={handleClose}>
						Close
					</button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
