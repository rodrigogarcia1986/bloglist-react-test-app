import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  }

  const newBlog = {
    title,
    author,
    url
  }

  console.log('blogSent:', newBlog, '\nToken sent:', token)

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const blogDelete = async (id) => {

  const config = {
    headers: { Authorization: token },
  }

  console.log('Id sent from frontend:', id, typeof (id))

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
    console.log('Sucessful update:', response)
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

export default { getAll, create, setToken, blogDelete, blogUpdate }