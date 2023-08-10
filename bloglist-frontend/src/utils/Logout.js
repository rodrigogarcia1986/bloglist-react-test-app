/* eslint-disable indent *//* eslint-disable linebreak-style */
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'

const Logout = ({ user }) => {

    const dispatch = useDispatch()
    //console.log('username:', user.username)

    return (
        <>
            {user.username} logged in!
            <button
                type="button"
                onClick={() => {
                    console.log('Logout button clicked!')
                    window.localStorage.removeItem('blogsAppLoggedUser')
                    window.localStorage.clear()
                    dispatch(setUser(''))
                }}
            >
                logout
            </button>
        </>
    )
}

export default Logout