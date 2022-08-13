import { useState } from 'react'
import { Badge, Form, InputGroup, ListGroup } from 'react-bootstrap'
import { useCombobox } from 'downshift'
import { useNavigate, Link } from 'react-router-dom'

function getFilter (inputValue) {
  return function regularFilter (item) {
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
    // getToggleButtonProps,
    // getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem
  } = useCombobox({
    onInputValueChange ({ inputValue }) {
      setItems(data.filter(getFilter(inputValue.toLowerCase())))
    },
    items,
    itemToString (item) {
      return item ? item.name : ''
    }
  })

  const handleSearchValueChange = event => {
    setSearchValue(event.target.value)
  }

  return (
    <>
      <div className='autocomplete-searchbox'>
        <InputGroup className='mb-1' {...getComboboxProps()}>
          <InputGroup.Text id='inputGroup-sizing-default'>
            <i className='fa-duotone fa-magnifying-glass' />
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
                <Link
                  {...getItemProps({ item, index })}
                  key={index}
                  to={`/dashboard/recipes/search/${item.searchPath}`}
                  state={{ searchTerm: item.name }}
                  replace
                  style={{ textDecoration: 'none' }}
                >
                  <ListGroup.Item
                    className={`d-flex justify-content-start align-items-center ${
                      highlightedIndex === index &&
                      selectedItem !== item &&
                      'bg-gray-200'
                    } ${
                      selectedItem === item &&
                      'active bg-secondary border-secondary'
                    }`}
                  >
                    <div
                      className='ms-1 text-center'
                      style={{ width: 40, fontSize: '1.6rem' }}
                    >
                      <i className={`fa-duotone ${item.typeIcon}`} />
                    </div>
                    <div className='ms-2 me-auto'>
                      <div className='fw-bold'>{item.name}</div>
                      <small style={{ opacity: 0.6 }}>{item.type}</small>
                    </div>

                    {/* <Badge bg='primary' pill>
                    14
                  </Badge> */}
                  </ListGroup.Item>
                </Link>
              ))}
              {items.length > 10 && (
                <ListGroup.Item
                  className='p-3 text-center combobox-see-all-results'
                >
                  {' '}
                  See all results ...
                </ListGroup.Item>
              )}
            </ListGroup>
          )}
        </div>
      </div>
    </>
  )
}

export default AutocompleteSearchbox
