import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import FormField from 'components/FormField'
import { differenceInDays, format } from 'date-fns'
import MealPlan, { IMealPlan } from '../../types/MealPlan'
import { useUser } from 'hooks/UserProvider'
import { useEffect } from 'react'
import { dateFromYYYYMMDD } from 'utils/time.utils'
import { useActivePlan } from 'hooks/MealPlanProvider'

interface IModalProps {
	show: boolean
	onHide: () => void
	userPlan?: MealPlan
}

interface IFormValues {
	planStartDate: string
	planEndDate: string
	planName: string
	planDescription?: string | undefined
}

const MealPlanModal = (props: IModalProps) => {
	const user = useUser()
	const { show, onHide } = props
	const { activatePlan } = useActivePlan()

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
		const plan: Partial<IMealPlan> = {
			...data,
			planStartDate: dateFromYYYYMMDD(data.planStartDate),
			planEndDate: dateFromYYYYMMDD(data.planEndDate),
			userId: user.id
		}

		try {
			if (props.userPlan && props.userPlan.id) {
				submitUpdate(plan, props.userPlan.id)
			} else {
				await submitCreate(plan, user.id)
			}
		} catch (error) {
			console.error('🚀 ~ onSubmit ~ error', error)
		}
		props.onHide()
	}

	const submitCreate = async (plan: Partial<IMealPlan>, userId: string) => {
		try {
			const docRefId = await MealPlan.add(plan, userId)

			if (!docRefId) throw new Error('No docRef returned from add')
			else activatePlan(docRefId)

			MealPlan.populateNewMealPlan(plan.planStartDate as Date, plan.planEndDate as Date, docRefId, userId)
		} catch (error) {
			console.error('🚀 ~ onSubmit ~ error', error)
		}
	}

	const submitUpdate = async (plan: Partial<IMealPlan>, planId: string) => {
		await MealPlan.update(plan, planId)
	}

	useEffect(() => {
		if (props.userPlan) {
			const { planStartDate, planEndDate, planName, planDescription } = props.userPlan
			setValue('planStartDate', format(planStartDate, 'yyyy-MM-dd'))
			setValue('planEndDate', format(planEndDate, 'yyyy-MM-dd'))
			setValue('planName', planName)
			setValue('planDescription', planDescription)
		}
	}, [props.userPlan, setValue])

	useEffect(() => {
		if (!show) {
			reset()
		}
	}, [show, reset])

	return (
		<Modal show={show} onHide={onHide} size="lg" scrollable={true}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Modal.Header className="border-0 text-center" closeButton>
					<Modal.Title className="text-center font-display">Create a new meal plan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container>
						<FormField
							label="Plan Name"
							placeholder="I.e. Tacos everyday."
							error={errors.planName}
							registered={register('planName', { required: 'Plan name is required' })}
							type="text"
						/>

						<FormField
							label="Plan Description (optional)"
							registered={register('planDescription')}
							type="textarea"
						/>

						<Row>
							<Col>
								<FormField
									label="Start Date"
									registered={register('planStartDate', {
										required: 'Start date is required'
									})}
									error={errors.planStartDate}
									type="date"
								/>
							</Col>
							<Col>
								<FormField
									error={errors.planEndDate}
									label="End Date"
									registered={register('planEndDate', {
										required: 'End date is required',
										validate: {
											correctDates: v =>
												differenceInDays(new Date(v), new Date(watch('planStartDate'))) > 0 ||
												'End date must be after start date'
										}
									})}
									type="date"
								/>
							</Col>
						</Row>
					</Container>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onHide}>
						Close
					</Button>
					<Button variant="primary" type="submit">
						Save Changes
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default MealPlanModal
