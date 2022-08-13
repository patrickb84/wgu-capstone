import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore'
import { firestore } from '../firebase'
import mealDB from './mealDB'

const userPlan = {}

userPlan.fetchUserRecipes = async userId => {
  const ref = collection(firestore, 'userRecipes')
  const snapshot = await getDocs(query(ref, where('idUser', '==', userId)))
  const response = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  return await Promise.all(
    response.map(async ({ id, idMeal }) => {
      const recipe = await mealDB.fetchRecipe(idMeal)
      return { id, recipe }
    })
  )
}

userPlan.addRecipe = async (userId, idMeal) => {
  try {
    await addDoc(collection(firestore, 'userRecipes'), {
      idUser: userId,
      idMeal,
      dateCreated: Timestamp.now(),
    })
  } catch (error) {
    console.error(error)
  }
}

userPlan.removeRecipe = async userRecipeId => {
  try {
    await deleteDoc(doc(firestore, 'userRecipes', userRecipeId))
  } catch (error) {
    console.log(error)
  }
}
