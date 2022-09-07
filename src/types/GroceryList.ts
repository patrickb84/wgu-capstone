import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { firestore as db } from "api/firebase"

export interface IShoppingList {
   id?: string
   name: string
   userId: string
   dateAdded: Date
   dateUpdated: Date
   items: IShoppingListItem[]
}

export class ShoppingList implements IShoppingList {
   id?: string
   name: string
   userId: string
   dateAdded: Date
   dateUpdated: Date
   items: IShoppingListItem[]

   constructor(groceryList: IShoppingList) {
      this.id = groceryList.id
      this.name = groceryList.name
      this.userId = groceryList.userId
      this.dateAdded = groceryList.dateAdded
      this.dateUpdated = groceryList.dateUpdated
      this.items = groceryList.items
   }

   static save = async (groceryList: IShoppingList) => {
      const docRef = await addDoc(collection(db, 'groceryLists'), groceryList)
      groceryList.id = docRef.id
      return groceryList
   }

   static delete = async (groceryList: IShoppingList) => {
      if (groceryList.id) {
         await deleteDoc(doc(db, 'groceryLists', groceryList.id))
      }
   }

   static findUsersGroceryLists = async (uid: any) => {
      const q = query(collection(db, 'groceryLists'), where('userId', '==', uid))
      const querySnapshot = await getDocs(q)
      const groceryLists: IShoppingList[] = querySnapshot.docs.map(mapDocToGroceryList)
      return groceryLists
   }
}

export interface IShoppingListItem {
   id?: string
   name: string
   quantity: number
   unit: string
   checked: boolean
}

export class ShoppingListItem implements IShoppingListItem {
   id?: string
   name: string
   quantity: number
   unit: string
   checked: boolean

   constructor(groceryListItem: IShoppingListItem) {
      this.id = groceryListItem.id
      this.name = groceryListItem.name
      this.quantity = groceryListItem.quantity
      this.unit = groceryListItem.unit
      this.checked = groceryListItem.checked
   }

   static add = async (groceryListItem: IShoppingListItem) => {
      const docRef = await addDoc(collection(db, 'groceryListItems'), groceryListItem)
      groceryListItem.id = docRef.id
      return groceryListItem
   }

   static remove = async (groceryListItem: IShoppingListItem) => {
      if (groceryListItem.id) {
         await deleteDoc(doc(db, 'groceryListItems', groceryListItem.id))
      }
   }

   static findUsersGroceryListItems = async (uid: any) => {
      const q = query(collection(db, 'groceryListItems'), where('userId', '==', uid))
      const querySnapshot = await getDocs(q)
      const groceryListItems: IShoppingListItem[] = querySnapshot.docs.map(mapDocToGroceryListItem)
      return groceryListItems
   }
}

export const mapDocToGroceryList = (doc: any) => {
   const data = doc.data()
   return new ShoppingList({
      id: doc.id,
      name: data.name,
      userId: data.userId,
      dateAdded: data.dateAdded,
      dateUpdated: data.dateUpdated,
      items: data.items
   })
}

export const mapDocToGroceryListItem = (doc: any) => {
   const data = doc.data()
   return new ShoppingListItem({
      id: doc.id,
      name: data.name,
      quantity: data.quantity,
      unit: data.unit,
      checked: data.checked
   })
}