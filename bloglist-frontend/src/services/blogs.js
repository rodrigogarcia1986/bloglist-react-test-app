/* eslint-disable linebreak-style */
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  //token = newToken
}

const getAll = () => {
  const response = axios.get(baseUrl)
    .then((response) => response.data)
  return response
}

const create = async (newBlog) => {

  const config = {
    headers: { Authorization: token },
  }

  //console.log('blogSent:', newBlog, '\nToken sent:', token)
  //console.log('config sent:', config)

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data

}

const blogDelete = async (id) => {

  const config = {
    headers: { Authorization: token },
  }

  console.log('Id sent from frontend:', id, typeof id)

  try {
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    console.log('Sucessful response:', response)
    return response
  } catch (error) {
    if (error.response && error.response.status === 401) {
      //const errorMessage = error.response.data.error;
      console.log('Error message:', error.response)
      return error.response
    } else {
      console.error('Other error:', error)
      return error
    }
  }
}

const blogUpdate = async (id, dataToUpdate) => {

  const config = {
    headers: { Authorization: token },
  }

  try {
    const response = await axios.put(`${baseUrl}/${id}`, dataToUpdate, config)
    //console.log('Sucessful update:', response)
    return response
  } catch (error) {
    if (error.response && error.response.status !== 204) {
      //const errorMessage = error.response.data.error;
      console.log('Error message:', error.response)
      return error.response
    } else {
      console.error('Other error:', error)
      return error
    }
  }
}

const commentBlog = (id, comment) => {

  try {
    const response = axios.post(`${baseUrl}/${id}`, { comment })
    return response
  } catch (error) {
    return error.message
  }

}


export default { getAll, create, setToken, blogDelete, blogUpdate, commentBlog }
