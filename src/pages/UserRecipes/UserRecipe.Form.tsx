import { Button, Container, Form, FormGroup, Modal } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormField from 'components/FormField'
import { useUser } from 'hooks/UserProvider'
import { useEffect, useState } from 'react'
import { IUserRecipe, UserRecipe, UserRecipeIngredient } from 'types/UserRecipe'
import { ImageUploader } from 'components/ImageUploader'
import { getStorage, ref, StorageReference } from 'firebase/storage'
import { useRecipeData } from 'hooks/RecipeDataProvider'
import { ListSelect } from 'components/ListSelect'

export interface IUserRepiceFormProps {
	show: boolean
	onHide: () => void
	userRecipe?: UserRecipe
}

interface IFormValues {
	name: string
	area?: string
	category?: string
	ingredients: UserRecipeIngredient[]
	instructions: string
}

export default function UserRepiceForm(props: IUserRepiceFormProps) {
	const user = useUser()
	const { show, onHide, userRecipe } = props
	const [imageUrl, setImageUrl] = useState<string | undefined>(userRecipe?.imageUrl)
	const [imageRef, setImageRef] = useState<StorageReference | undefined>()
	const [imageFilename, setImageFilename] = useState<string | undefined>(userRecipe?.imageFilename)

	const { ingredients: $ingredients } = useRecipeData()

	const ingredientOptions = $ingredients.map(ingredient => ingredient.strIngredient || null).filter(e => e) as string[]

	const fbStorage = getStorage()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		reset
	} = useForm<IFormValues>()

	const onSubmit: SubmitHandler<IFormValues> = async data => {
		if (!user) return
		let plan: Partial<IUserRecipe> = {
			...data,
			imageUrl: imageUrl,
			imageFilename: imageFilename
		}

		try {
			if (userRecipe && userRecipe.id) {
				await submitUpdate(plan, userRecipe.id)
			} else {
				await submitCreate(plan, user.id)
			}
		} catch (error) {
			console.error('🚀 ~ onSubmit ~ error', error)
		}
		onHide()
	}

	const submitCreate = async (partialData: Partial<IUserRecipe>, userId: string) => {
		try {
			const docRefId = await UserRecipe.add(partialData, userId)

			if (!docRefId) throw new Error('No docRef returned from add')
		} catch (error) {
			console.error('🚀 ~ submitCreate ~ error', error)
		}
	}

	const submitUpdate = async (partialData: Partial<IUserRecipe>, userRecipeId: string) => {
		await UserRecipe.update(partialData, userRecipeId)
	}

	useEffect(() => {
		if (userRecipe) {
			const { name, ingredients, area, category, instructions } = userRecipe
			console.log('🚀 ~ useEffect ~ userRecipe', userRecipe)
			setValue('name', name)
			setValue('ingredients', ingredients)
			setValue('area', area)
			setValue('category', category)
			setValue('instructions', instructions || '')
			if (userRecipe.imageFilename) {
				const imageRef = ref(fbStorage, userRecipe.imageFilename)
				setImageRef(imageRef)
			}
		} else {
			reset()
			// setUserIngredients([])
			setImageUrl(undefined)
		}
	}, [fbStorage, reset, setValue, userRecipe])

	useEffect(() => {
		if (!show) {
			reset()
		}
	}, [show, reset])

	const handleCancel = async () => {
		reset()
		onHide()
	}

	return (
		<Modal show={show} onHide={handleCancel} size="lg" scrollable={true}>
			<Modal.Header closeButton>
				<Modal.Title>{userRecipe ? 'Edit' : 'Create'} Recipe</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<ImageUploader {...{ setImageRef, setImageUrl, imageRef, imageUrl, setImageFilename }} />

						<FormField
							label="Recipe Name"
							placeholder="Something delicious"
							registered={register('name', { required: 'Recipe name is required' })}
							error={errors.name}
						/>
						<FormGroup className="mb-3">
							<ListSelect
								options={ingredientOptions}
								setSelected={value => setValue('ingredients', value)}
								selected={watch('ingredients') || []}
								placeholder="Add ingredients"
								label="Ingredients"
							/>
						</FormGroup>
						<FormField
							label="Instructions"
							type="textarea"
							placeholder="Write your instructions here. Separate each step with a new line."
							registered={register('instructions', {
								required: 'Instructions are required'
							})}
							rows={8}
							error={errors.instructions}
						/>
					</Form>
				</Container>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCancel}>
					Cancel
				</Button>

				<Button onClick={handleSubmit(onSubmit)}>Submit</Button>
			</Modal.Footer>
		</Modal>
	)
}
