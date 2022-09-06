import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { firestore as db } from "api/firebase"

export interface GroceryList {
   id?: string
   name: string
   userId: string
   dateAdded: Date
   dateUpdated: Date
   items: GroceryListItem[]
}

export class GroceryList implements GroceryList {
   id?: string
   name: string
   userId: string
   dateAdded: Date
   dateUpdated: Date
   items: GroceryListItem[]
   constructor(groceryList: GroceryList) {
      this.id = groceryList.id
      this.name = groceryList.name
      this.userId = groceryList.userId
      this.dateAdded = groceryList.dateAdded
      this.dateUpdated = groceryList.dateUpdated
      this.items = groceryList.items
   }

   static save = async (groceryList: GroceryList) => {
      const docRef = await addDoc(collection(db, 'groceryLists'), groceryList)
      groceryList.id = docRef.id
      return groceryList
   }

   static delete = async (groceryList: GroceryList) => {
      if (groceryList.id) {
         await deleteDoc(doc(db, 'groceryLists', groceryList.id))
      }
   }

   static findUsersGroceryLists = async (uid: any) => {
      const q = query(collection(db, 'groceryLists'), where('userId', '==', uid))
      const querySnapshot = await getDocs(q)
      const groceryLists: GroceryList[] = querySnapshot.docs.map(mapDocToGroceryList)
      return groceryLists
   }
}

export interface GroceryListItem {
   id?: string
   name: string
   quantity: number
   unit: string
   checked: boolean
}

export class GroceryListItem implements GroceryListItem {
   id?: string
   name: string
   quantity: number
   unit: string
   checked: boolean
   constructor(groceryListItem: GroceryListItem) {
      this.id = groceryListItem.id
      this.name = groceryListItem.name
      this.quantity = groceryListItem.quantity
      this.unit = groceryListItem.unit
      this.checked = groceryListItem.checked
   }

   static add = async (groceryListItem: GroceryListItem) => {
      const docRef = await addDoc(collection(db, 'groceryListItems'), groceryListItem)
      groceryListItem.id = docRef.id
      return groceryListItem
   }

   static remove = async (groceryListItem: GroceryListItem) => {
      if (groceryListItem.id) {
         await deleteDoc(doc(db, 'groceryListItems', groceryListItem.id))
      }
   }

   static findUsersGroceryListItems = async (uid: any) => {
      const q = query(collection(db, 'groceryListItems'), where('userId', '==', uid))
      const querySnapshot = await getDocs(q)
      const groceryListItems: GroceryListItem[] = querySnapshot.docs.map(mapDocToGroceryListItem)
      return groceryListItems
   }
}

export const mapDocToGroceryList = (doc: any) => {
   const data = doc.data()
   return new GroceryList({
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
   return new GroceryListItem({
      id: doc.id,
      name: data.name,
      quantity: data.quantity,
      unit: data.unit,
      checked: data.checked
   })
}