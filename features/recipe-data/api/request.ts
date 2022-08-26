import axios from 'axios'
import { RequestConfig } from '@/types/RequestConfig'

export default async function request(config: RequestConfig) {
   try {
      const response = await axios.request(config)
      return response.data
   } catch (error) {
      throw new MealApiError(error, { config })
   }
}

class MealApiError extends Error {
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
