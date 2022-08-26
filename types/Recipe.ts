import { RecipeIngredient } from "@/features/recipe-data/types/RecipeAdapter"

export interface Recipe {
   id: string
   name: string
   ingredients: RecipeIngredient[]
   area?: string
   category?: string
   tags?: string
   description?: string
   instructions?: string | string[]
   imageUrl?: string
   linkUrl?: string
   youtubeUrl?: string
}
