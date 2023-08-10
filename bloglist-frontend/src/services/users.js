/* eslint-disable indent *//* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/users'

const listUsers = async () => {
    const response = await axios.get(baseUrl)
    console.log('response at listUsers:', response.data)
    return response.data
}

const createUser = async (newUser) => {
    const response = await axios.post(baseUrl, newUser)
    return response
}

export default {
    listUsers,
    createUser
}