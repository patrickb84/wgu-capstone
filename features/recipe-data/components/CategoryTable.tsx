import { Table } from '../../../components/Table'
import recipesApi from '../api'
import { useRecipeData } from '../hooks'

export default function CategoryTable() {
   const { categories, lookupIngredient } = useRecipeData()

   return (
      <>
         <h1>Categories</h1>
         <Table columns={['id', 'label', 'description', 'image', 'actions']}>
            {categories.map(category => {
               const { id, label, description, image } = category
               return (
                  <tr key={id}>
                     <td>{id}</td>
                     <td>{label}</td>
                     <td className="text-sm">{description}</td>
                     <td>
                        <img src={image} alt={label} style={{ width: 50 }} />
                     </td>
                     <td>
                        <button
                           onClick={() => {
                              console.log(category)
                           }}>
                           check
                        </button>
                        <button
                           onClick={async () => {
                              const recipes = await recipesApi.filterByCategory(
                                 category.label
                              )
                              const details0 = await recipesApi.fetchRecipe(
                                 recipes[0].id
                              )
                              console.log('🚀 ~ onClick={ ~ details0', details0)
                              console.warn(
                                 details0.ingredients.map((i: any) =>
                                    lookupIngredient(i.name)
                                 )
                              )
                           }}>
                           lookup
                        </button>
                     </td>
                  </tr>
               )
            })}
         </Table>
      </>
   )
}
