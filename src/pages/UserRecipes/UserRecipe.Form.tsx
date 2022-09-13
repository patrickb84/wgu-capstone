import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormField from 'components/FormField'
import { useUser } from 'hooks/UserProvider'
import { useEffect, useState } from 'react'
import { IUserRecipe, UserRecipe, UserRecipeIngredient } from 'types/UserRecipe'

export interface IUserRepiceFormProps {
	show: boolean
	onHide: () => void
	userRecipe?: UserRecipe
}

interface IFormValues {
	name: string
	area?: string
	category?: string
	instructions: string
}

// TODO: Add combobox for Area and Category, add Ingredients

export default function UserRepiceForm(props: IUserRepiceFormProps) {
	const user = useUser()
	const { show, onHide, userRecipe } = props
	const [ingredients, setIngredients] = useState<UserRecipeIngredient[]>([])

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
		const plan: Partial<IUserRecipe> = {
			...data,
			userId: user.id,
			ingredients
		}

		try {
			if (userRecipe && userRecipe.id) {
				submitUpdate(plan, userRecipe.id)
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
			setValue('name', name)
			setIngredients(ingredients)
			setValue('area', area)
			setValue('category', category)
			setValue('instructions', instructions || '')
		}
	}, [setValue, userRecipe])

	useEffect(() => {
		if (!show) {
			reset()
		}
	}, [show, reset])

	return (
		<Modal show={show} onHide={onHide} size="lg" scrollable={true}>
			<Modal.Header closeButton>
				<Modal.Title>{userRecipe ? 'Edit' : 'Create'} Recipe</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Row>
							<Col>
								<FormField
									label="Name"
									placeholder="Name"
									registered={register('name', { required: 'Recipe name is required' })}
									error={errors.name}
								/>
							</Col>
							<Col>
								<FormField
									label="Area"
									placeholder="Area"
									registered={register('area')}
									error={errors.area}
								/>
							</Col>
							<Col>
								<FormField
									label="Category"
									placeholder="Category"
									registered={register('category')}
									error={errors.category}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormField
									label="Instructions"
									type="textarea"
									placeholder="Instructions"
									registered={register('instructions')}
									error={errors.instructions}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button type="submit">Submit</Button>
							</Col>
						</Row>
					</Form>
				</Container>
			</Modal.Body>
		</Modal>
	)
}
