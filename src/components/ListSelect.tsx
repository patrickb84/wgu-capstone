import * as React from 'react'
import { Form, ListGroup } from 'react-bootstrap'
import { UserRecipeIngredient } from 'types/UserRecipe'
import { ComboBoxSelector } from './ComboBox'
import { IconButton } from './IconButton'
import Spacer from './Spacer'

export interface IListSelectProps {
	options: string[]
	placeholder: string
	label: string
	setSelected: (value: UserRecipeIngredient[]) => void
	selected: UserRecipeIngredient[]
}

export function ListSelect(props: IListSelectProps) {
	const { options, placeholder, label, setSelected, selected } = props

	const handleAddFromComboBox = (ingredient: string) => {
		const newSelected = [...selected]
		newSelected.push({ ingredient, measure: undefined } as UserRecipeIngredient)
		setSelected(newSelected)
	}

	const handleUpdateItemMeasure = (index: number, measure: string) => {
		const newSelected = [...selected]
		newSelected[index].measure = measure
		setSelected(newSelected)
	}

	const handleRemoveItem = (index: number) => {
		const newSelected = [...selected]
		newSelected.splice(index, 1)
		setSelected(newSelected)
	}

   console.log('selected', selected)

	return (
		<>
			<div className="position-static">
				<ComboBoxSelector
					options={options}
					placeholder={placeholder}
					label={label}
               onChange={value => handleAddFromComboBox(value)}
				/>
				<div className="border border-gray-300 rounded bg-light p-3">
					{!!selected.length ? (
						<ListGroup>
							{selected.map((value, index) => {
								return (
									<React.Fragment key={index}>
										<ListSelectItem
											name={value.ingredient}
											setMeasure={measure => handleUpdateItemMeasure(index, measure)}
											measure={value.measure}
											onRemove={() => handleRemoveItem(index)}
										/>
									</React.Fragment>
								)
							})}
						</ListGroup>
					) : (
						<div className="p-3 text-muted">No items selected</div>
					)}
				</div>
			</div>
		</>
	)
}

const ListSelectItem = (props: {
	onRemove: () => void
	setMeasure: (measure: string) => void
	measure?: string
	name: string
}) => {
	const { onRemove, measure, name, setMeasure } = props
	const [measureValue, setMeasureValue] = React.useState(measure || '')

	const handleMeasureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMeasureValue(event.target.value)
		setMeasure(event.target.value)
	}

	return (
		<ListGroup.Item className="d-flex align-items-center">
			<IconButton
				onClick={onRemove}
				iconFaName="fa-circle-xmark"
				iconFaGroup="far"
				colorVariant="danger"
				tooltip="Remove"
			/>
			<Spacer w={1} />
			{name}
			<div className="ms-auto">
				<Form.Control
					type="text"
					placeholder="Qty/Measure"
					value={measureValue}
					onChange={handleMeasureChange}
				/>
			</div>
		</ListGroup.Item>
	)
}
