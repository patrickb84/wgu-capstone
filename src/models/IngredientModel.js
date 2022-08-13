import SearchItem from './SearchItem'

export default class Ingredient extends SearchItem {
  constructor ({ idIngredient, strIngredient, strDescription, strType }) {
    super()

    this.name = strIngredient
    this.type = 'Ingredient'
    this.description = strDescription
    this.id = idIngredient
    this.typeIcon = 'fa-leafy-green text-tertiary'
  }
}
