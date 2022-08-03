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
      // TODO: Throw custom exception ?
    }
  }
}

class APIRequestException extends Error {
  constructor(message) {
    super(message)
    this.name = 'APIRequestException'
  }
}
