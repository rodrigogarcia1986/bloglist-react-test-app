/* eslint-disable linebreak-style *//* eslint-disable indent *//* eslint-disable linebreak-style */
import { useDispatch } from 'react-redux'
import { handleLogin, signUser } from '../reducers/userReducer'
import { useState } from 'react'
import { useField } from '../utils/helpers'

const FormLogin = () => {

    const dispatch = useDispatch()

    const { reset: resetUsername, ...username } = useField('text')
    const { reset: resetPassword, ...password } = useField('password')
    const { reset: resetEmail, ...email } = useField('email')

    const [isVisible, setVisible] = useState(false)
    const hideWhenVisible = { display: isVisible ? 'none' : '' }
    const showWhenVisible = { display: isVisible ? '' : 'none' }

    return (
        <>
            <h1>Log in to application</h1>
            <form style={hideWhenVisible}>
                <label>username</label>{' '}
                <input {...username} />
                <br />
                <label>password</label>{' '}
                <input {...password} />
                <br />
                <button id="login-button" type="button" onClick={() => dispatch(handleLogin(username.value, password.value))}>
                    login
                </button> | <button style={hideWhenVisible} type="button" onClick={() => setVisible(true)}>sign in</button>
            </form>
            <form style={showWhenVisible}>
                <label>username</label>{' '}
                <input {...username} />
                <br />
                <label> email </label>{' '}
                <input {...email} />
                <br />
                <label>password</label>{' '}
                <input {...password} />
                <br />
                <button id="sign-in-button" type="button" onClick={() => {
                    const newUser = {
                        username: username.value,
                        email: email.value,
                        password: password.value
                    }
                    resetUsername()
                    resetEmail()
                    resetPassword()
                    dispatch(signUser(newUser))
                }}>
                    sign-in
                </button> | <button style={showWhenVisible} type="button" onClick={() => setVisible(false)}>cancel</button>

            </form>
        </>
    )
}

export default FormLogin