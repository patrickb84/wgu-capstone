import axios from "axios"

const runRequest = async options => {
  try {
    const response = await axios.request(options)
    return response
  } catch (error) {
    console.error(error)
    return null
  }
}

export { runRequest }
