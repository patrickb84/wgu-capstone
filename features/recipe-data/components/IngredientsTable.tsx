import { Table } from '../../../components/Table'
import { useRecipeData } from '../hooks'

export default function IngredientsTable() {
   const { ingredients } = useRecipeData()

   return (
      <Table columns={['id', 'name', 'description']}>
         {ingredients.map(ingredient => (
            <tr key={ingredient.id}>
               <td>{ingredient.id}</td>
               <td>{ingredient.name}</td>
               <td>{ingredient.description?.slice(0, 100)}</td>
            </tr>
         ))}
      </Table>
   )
}
