/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = []

export const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            return action.payload
        },
        appendBlog: (state, action) => {
            const newState = state
            newState.push(action.payload)
            newState.sort((b, a) => a.likes - b.likes)
            return newState
        },
        removeBlog: (state, action) => {
            const newState = state.filter(blog => blog.id !== action.payload)
            return newState
        },
        updateBlog: (state, action) => {
            const newState = state.map(blog => blog.id === action.payload.id ? action.payload : blog)
            return newState.sort((b, a) => a.likes - b.likes)
        }
    }
})

export const { setBlogs, appendBlog, removeBlog, updateBlog } = blogsSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        blogs.sort((b, a) => a.likes - b.likes)
        dispatch(setBlogs(blogs))
        dispatch(setNotification('Welcome to blogs website!', 10))
        //console.log('Initialized blogs!')
    }
}

export const putBlog = (updatedBlog) => {
    return async dispatch => {
        const { id, ...dataToUpdate } = updatedBlog
        await blogsService.blogUpdate(id, dataToUpdate)
        dispatch(updateBlog(updatedBlog))
        dispatch(setNotification(`${updatedBlog.title} updated!`, 5))
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        //console.log('At blogsReducer, createBlog, argument received:', newBlog, '\ntitle:', newBlog.title)
        if (!(newBlog.title || newBlog.author || newBlog.url)) {
            dispatch(setNotification('Please, inform title, author and url!'))
            return
        }

        //console.log('Adding new blog...')
        const response = await blogsService.create(newBlog)
        //console.log('Response after saving new Blog:', response)
        dispatch(appendBlog(response))
        dispatch(setNotification(`Added blog "${newBlog.title}" from ${newBlog.author}!`))
    }
}

export const deleteBlog = (toDelete) => {
    return async dispatch => {
        const response = await blogsService.blogDelete(toDelete.id)
        //console.log('Response on handleDeleteBlog', response)

        if (response.status === 204) {
            dispatch(removeBlog(toDelete.id))
            dispatch(setNotification(`${toDelete.title} deleted!`))
        } else if (response.status === 401) {
            dispatch(setNotification('Unauthorized: you can\'t remove other users\' blog!'))
        } else {
            dispatch(setNotification(response.message))
        }
    }
}

export const submitComment = (id, comment) => {
    return async dispatch => {
        try {
            console.log('blog id for comment:', id, '\ncomment:', comment)
            const response = await blogsService.commentBlog(id, comment)
            console.log('response for submitting comment:', response)
            dispatch(updateBlog(response.data))
            dispatch(setNotification(`New comment added to blog ${response.data.title}`))

        } catch (error) {
            dispatch(setNotification(error.message))
        }
    }
}

export default blogsSlice.reducer