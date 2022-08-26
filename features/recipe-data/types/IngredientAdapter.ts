import { Ingredient } from '@/types/Ingredient'

export class IngredientAdapter implements Ingredient {
   id: string
   name: string
   description: string | undefined
   type: string | undefined

   constructor(apiIngredient: ApiIngredient) {
      const { idIngredient, strIngredient, strDescription, strType } =
         apiIngredient

      this.id = idIngredient
      this.name = strIngredient
      this.description = strDescription
      this.type = strType
   }
}

export interface ApiIngredient {
   idIngredient: string
   strDescription: string
   strIngredient: string
   strType: string
}
