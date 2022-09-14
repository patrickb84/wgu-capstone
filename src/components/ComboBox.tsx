import Tippy from '@tippyjs/react'
import { useCombobox } from 'downshift'
import React from 'react'
import { Button, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap'

export interface IComboBoxProps {
	options: string[]
	placeholder: string
	label: string
	onChange?: (value: string) => void
}

export function ComboBoxSelector(props: IComboBoxProps) {
	const { options, placeholder, label, onChange } = props

	function getOptionsFilter(inputValue: any) {
		return function optionsFilter(option: any) {
			return (
				!inputValue ||
				option.toLowerCase().includes(inputValue) ||
				option.toLowerCase().includes(inputValue)
			)
		}
	}

	function ComboBox() {
		const [items, setItems] = React.useState(options)
		const {
			isOpen,
			getToggleButtonProps,
			getLabelProps,
			getMenuProps,
			getInputProps,
			getComboboxProps,
			highlightedIndex,
			getItemProps,
			selectedItem,
			selectItem
		} = useCombobox({
			onInputValueChange({ inputValue }) {
				setInputValue(inputValue || '')
				setItems(options.filter(getOptionsFilter(inputValue)))
			},
			items,
			itemToString(item) {
				return item ? item : ''
			},
			onSelectedItemChange({ selectedItem }) {
				if (selectedItem) {
					selectItem(selectedItem)
					onChange && onChange(selectedItem)
				}
			}
		})
		const [$inputValue, setInputValue] = React.useState('')

		return (
			<div className="custom-combobox w-100 position-relative">
				<Form.Label {...getLabelProps()}>{label}</Form.Label>
				<InputGroup className="mb-1" {...getComboboxProps()}>
					<Button
						aria-label="toggle menu"
						variant="light"
						className="border-gray-300"
						{...getToggleButtonProps()}>
						{isOpen ? (
							<i className="far fa-chevron-down" />
						) : (
							<i className="far fa-chevron-up" />
						)}
					</Button>
					<Form.Control value={$inputValue} placeholder={placeholder} {...getInputProps()} />
					{!!$inputValue && (
						<Tippy content="Clear" placement="top">
							<Button variant="secondary-gray" onClick={() => selectItem(null as any)}>
								<i className="far fa-xmark" />
							</Button>
						</Tippy>
					)}
				</InputGroup>

				<div {...getMenuProps()} className="w-100 position-absolute" style={{ zIndex: 1000 }}>
					{isOpen && (
						<ListGroup
							variant="flush"
							className="shadow border border-gray-300 rounded"
							style={{ maxHeight: '16rem', overflow: 'auto' }}>
							{items.map((item, index) => (
								<ListGroupItem
									className={`d-flex justify-content-start align-items-center ${
										highlightedIndex === index && selectedItem !== item && 'bg-gray-200'
									} ${selectedItem === item && 'active bg-secondary border-secondary'}`}
									key={index}
									{...getItemProps({ item, index })}>
									<span>{item}</span>
								</ListGroupItem>
							))}
						</ListGroup>
					)}
				</div>
			</div>
		)
	}
	return <ComboBox />
}
