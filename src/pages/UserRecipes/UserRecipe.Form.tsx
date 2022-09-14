import { Button, Col, Container, Form, FormGroup, Modal, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormField from 'components/FormField'
import { useUser } from 'hooks/UserProvider'
import React, { createRef, useEffect, useRef, useState } from 'react'
import { IUserRecipe, UserRecipe, UserRecipeIngredient } from 'types/UserRecipe'
import { ImageUploader } from 'components/ImageUploader'
import { deleteObject, getStorage, ref, StorageReference } from 'firebase/storage'
import { ComboBoxSelector } from 'components/ComboBox'
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
	// const [userIngredients, setUserIngredients] = useState<UserRecipeIngredient[]>(
	// 	userRecipe?.ingredients || []
	// )
	const [imageUrl, setImageUrl] = useState<string | undefined>(userRecipe?.imageUrl)
	const [imageRef, setImageRef] = useState<StorageReference | undefined>()
	const [imageFilename, setImageFilename] = useState<string | undefined>(userRecipe?.imageFilename)

	const fileInputRef = createRef<HTMLInputElement>()

	const { areas, categories, ingredients: $ingredients } = useRecipeData()

	const areaOptions = areas.map(area => area.strArea || null).filter(e => e) as string[]
	const categoryOptions = categories
		.map(category => category.strCategory || null)
		.filter(e => e) as string[]
	const ingredientOptions = $ingredients
		.map(ingredient => ingredient.strIngredient || null)
		.filter(e => e) as string[]

	const fbStorage = getStorage()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setValue,
		reset
	} = useForm<IFormValues>()

	function removeUndefined(obj: any) {
		return Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
	}

	const onSubmit: SubmitHandler<IFormValues> = async data => {
		if (!user) return
		let plan: Partial<IUserRecipe> = {
			...data,
			// ingredients: userIngredients,
			imageUrl: imageUrl,
			imageFilename: imageFilename
		}
		removeUndefined(plan)

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
			// setUserIngredients(ingredients)
			setValue('ingredients', ingredients)
			setValue('area', area)
			setValue('category', category)
			// setInstructions(instructions || '')
			setValue('instructions', instructions || '')
			// setImageUrl(userRecipe.imageUrl)
			// setImageRef(userRecipe.imageRef)
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
		if (imageRef) {
			try {
				await deleteObject(imageRef)
			} catch (error) {
				console.error(error)
			}
		}
		setImageRef(undefined)
		setImageUrl(undefined)
		setImageFilename(undefined)
		reset()
		onHide()
	}

	return (
		<Modal show={show} onHide={handleCancel} fullscreen scrollable={true}>
			<Modal.Header closeButton>
				<Modal.Title>{userRecipe ? 'Edit' : 'Create'} Recipe</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<ImageUploader
							{...{ setImageRef, setImageUrl, imageRef, imageUrl, setImageFilename }}
							inputRef={fileInputRef}
						/>

						<FormField
							label="Recipe Name"
							placeholder="Something delicious"
							registered={register('name', { required: 'Recipe name is required' })}
							error={errors.name}
						/>
						<Row>
							<Col xs={12} lg={6}>
								<FormGroup className="mb-3">
									<ListSelect
										options={ingredientOptions}
										// setSelected={setUserIngredients}
										setSelected={value => setValue('ingredients', value)}
										// selected={userIngredients}
										selected={watch('ingredients') || []}
										placeholder="Add ingredients"
										label="Ingredients"
									/>
								</FormGroup>
							</Col>
							<Col xs={12} lg={6}>
								<FormField
									label="Instructions"
									type="textarea"
									placeholder="Instructions"
									registered={register('instructions', {
										required: 'Instructions are required'
									})}
									rows={8}
									error={errors.instructions}
								/>
							</Col>
						</Row>

						<Row>
							<Col>
								<FormGroup className="mb-3">
									<ComboBoxSelector
										label="Area"
										placeholder="What part of the world?"
										options={areaOptions}
										onChange={value => setValue('area', value)}
										// $inputValue={watch('area') || ''}
										// setInputValue={value => setValue('area', value)}
									/>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup className="mb-3">
									<ComboBoxSelector
										label="Category"
										placeholder="What kind of recipe?"
										options={categoryOptions}
										onChange={value => setValue('category', value)}
										// $inputValue={watch('category') || ''}
										// setInputValue={value => setValue('category', value)}
									/>
								</FormGroup>
							</Col>
						</Row>
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
