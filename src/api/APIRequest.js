import axios from 'axios'

export class APIRequest {
  runRequest = async options => {
    try {
      const response = await axios.request(options)
      const { data } = response
      // console.log(data)
      return data
    } catch (error) {
      console.error(error)
    }
  }
}

class APIRequestException extends Error {
  constructor(message) {
    super(message)
    this.name = 'APIRequestException'
  }
}
