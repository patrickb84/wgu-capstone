import { useContext } from "react";
import { RecipeDataContext } from "../provider";

export default function useRecipeData() {
   return useContext(RecipeDataContext)
}