import * as React from 'react'
import recipesApi from '../api'

export interface IButtonRandomRecipeProps {
   onClick: (recipe: any) => void
}

export function ButtonRandomRecipe(props: IButtonRandomRecipeProps) {
   const [recipe, setRecipe] = React.useState<any>(null)
   const [loading, setLoading] = React.useState<boolean>(false)

   const handleClick = () => {
      setLoading(true)
      recipesApi
         .fetchRandomRecipe()
         .then(recipe => {
            setRecipe(recipe)
            props.onClick(recipe)
         })
         .finally(() => setLoading(false))
   }

   React.useEffect(() => {
      if (recipe) {
         console.log(recipe)
      }
   }, [recipe])

   return (
      <>
         <button
            className="btn btn-danger"
            disabled={loading}
            onClick={handleClick}>
            Recipe #
         </button>
      </>
   )
}
