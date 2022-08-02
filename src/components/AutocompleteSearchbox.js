import { useState } from 'react'
import { Badge, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { useCombobox } from 'downshift'

function getFilter(inputValue) {
  return function regularFilter(item) {
    return (
      !inputValue ||
      item.name.toLowerCase().includes(inputValue) ||
      item.type.toLowerCase().includes(inputValue)
    )
  }
}

const AutocompleteSearchbox = ({ data }) => {
  const [items, setItems] = useState(data)
  const [searchValue, setSearchValue] = useState('')

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
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(data.filter(getFilter(inputValue.toLowerCase())))
    },
    items,
    itemToString(item) {
      return item ? item.name : ''
    },
  })

  const handleSearchValueChange = event => {
    setSearchValue(event.target.value)
  }

  return (
    <>
      <div className='autocomplete-searchbox'>
        <InputGroup className='mb-1' {...getComboboxProps()}>
          <InputGroup.Text id='inputGroup-sizing-default'>
            <i className='fa-duotone fa-magnifying-glass'></i>
          </InputGroup.Text>
          <Form.Control
            aria-label='Default'
            aria-describedby='inputGroup-sizing-default'
            placeholder='Search for recipes, ingredients, etc.'
            value={searchValue}
            onChange={handleSearchValueChange}
            {...getInputProps()}
          />
        </InputGroup>

        {/* Dropdown */}
        <div {...getMenuProps()}>
          {isOpen && (
            <ListGroup>
              {items.slice(0, 10).map((item, index) => (
                <ListGroup.Item
                  {...getItemProps({ item, index })}
                  key={index}
                  className={`d-flex justify-content-between align-items-start ${
                    highlightedIndex === index && 'active'
                  } ${selectedItem === item && 'active bg-secondary border-secondary'}`}>
                  <div className='ms-2 me-auto'>
                    <div className='fw-bold'>{item.name}</div>
                    <small style={{ opacity: 0.6 }}>{item.type}</small>
                  </div>
                  {/* <Badge bg='primary' pill>
                    14
                  </Badge> */}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </>
  )
}

export default AutocompleteSearchbox
