import SearchItem from './SearchItem'

export default class Category extends SearchItem {
  constructor({ strCategory }) {
    super()

    this.name = strCategory
    this.type = 'Category'
    // this.description = strDescription
    // this.id = idIngredient
    this.typeIcon = 'fa-salad text-primary'
  }
}
