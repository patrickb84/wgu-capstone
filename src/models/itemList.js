class ItemList {
  constructor (items) {
    this.items = items
  }

  getItems () {
    return this.items
  }

  addItem (item) {
    this.items.push(item)
  }

  removeItem (item) {
    this.items = this.items.filter(i => i !== item)
  }
}
