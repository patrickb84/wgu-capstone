import SearchItem from './SearchItem'

export default class Area extends SearchItem {
  constructor ({ strArea }) {
    super()

    this.name = strArea
    this.type = 'Area'
    // this.description = strDescription
    // this.id = idIngredient
    this.typeIcon = 'fa-earth-americas text-secondary'
    this.searchPath = `area/${strArea.toLowerCase().replace(' ', '-')}`
  }
}
