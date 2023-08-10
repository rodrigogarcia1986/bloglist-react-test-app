/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import usersService from '../services/users'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const initialState = {
    user: {},
    users: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const newState = { ...state, user: action.payload }
            //console.log('newState at set User reducer:', newState)
            return newState
        },
        setUsers: (state, action) => {
            const newState = { ...state, users: action.payload }
            console.log('newState at set Users reducer:', newState)

            return newState
        }
    }
})


export const { setUser, setUsers } = userSlice.actions

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('blogsAppLoggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log('user at initialize user:', user)
            dispatch(setUser(user))
            blogsService.setToken(user.token)
            dispatch(setNotification(`Welcome, ${user.username}!`))
        } else {
            dispatch(setUser(''))
        }
    }
}

export const initializeUsers = () => {
    return async dispatch => {
        const response = await usersService.listUsers()
        //console.log('response at initialize users reducer:', response)
        dispatch(setUsers(response))
    }
}

export const handleLogin = (username, password, isNew) => {

    return async dispatch => {

        try {
            const user = await loginService.login({ username, password })
            console.log(`Logging in with ${username} and ${password}`)
            window.localStorage.setItem('blogsAppLoggedUser', JSON.stringify(user))

            blogsService.setToken(user.token)

            dispatch(setUser(user))

            if (isNew) {
                dispatch(setNotification(`New user ${user.username} successfuly signed up!`))
            } else {
                dispatch(setNotification(`${user.name} sucessfully logged in!`))
            }
        } catch (error) {
            console.log(error.message)
            dispatch(setNotification(error.message))
        }
    }
}

export const signUser = (user) => {
    return async dispatch => {
        const isNew = true
        const response = await usersService.createUser(user)
        console.log('response at sign user:', response)
        if (response.status === 201) {
            dispatch(handleLogin(user.username, user.password, isNew))
        } else {
            dispatch(setNotification('Não foi possível adicionar'))
        }
    }
}



export default userSlice.reducer