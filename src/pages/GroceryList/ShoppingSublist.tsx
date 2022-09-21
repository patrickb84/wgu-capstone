import { Card, Form } from 'react-bootstrap'

export interface IShoppingSublistProps {
	includedItems: string[]
	isItemIncluded: (item: string) => boolean
	handleToggleIncluded: (item: string) => void
}

export default function ShoppingSublist(props: IShoppingSublistProps) {
	const { includedItems, isItemIncluded, handleToggleIncluded } = props
	return (
		<Card className="mb-4">
			<Card.Body>
				<Card.Title>Shopping List ({includedItems.length})</Card.Title>
				<div>
					{includedItems.length ? (
						includedItems
							.sort((a, b) => a.localeCompare(b))
							.map((item, index) => {
								return (
									<div key={index}>
										<Form.Check
											type="checkbox"
											checked={isItemIncluded(item)}
											onChange={e => handleToggleIncluded(item)}
											label={item}
										/>
									</div>
								)
							})
					) : (
						<div className="text-muted">No items selected</div>
					)}
				</div>
			</Card.Body>
		</Card>
	)
}
