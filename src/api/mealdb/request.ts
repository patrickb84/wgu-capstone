import axios from 'axios'
import { IRequestOptions } from 'types/RequestOptions'

export default async function request(config: IRequestOptions) {
	try {
		const response = await axios.request(config)
		return response.data
	} catch (error) {
		throw new MealDBException(error, { config })
	}
}

class MealDBException extends Error {
	data?: any
	constructor(error: any, data: any) {
		super(error.message)
		this.name = 'MealApiError'
		this.data = data

		this.toLog(error, data)
		console.error(error, { data })
	}

	toLog(error: any, data: any) {
		console.error(error, { data })
	}
}
