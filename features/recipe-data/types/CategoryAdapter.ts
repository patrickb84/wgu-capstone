import { Category } from '@/types/Category'

export class CategoryAdapter implements Category {
   id: number
   label: string
   description?: string
   image?: string

   constructor(apiCategory: ApiCategory) {
      this.id = parseInt(apiCategory.idCategory)
      this.label = apiCategory.strCategory
      this.description = apiCategory.strCategoryDescription
      this.image = apiCategory.strCategoryThumb
   }
}

export interface ApiCategory {
   idCategory: string
   strCategory: string
   strCategoryDescription: string
   strCategoryThumb: string
}
