/* eslint-disable indent *//* eslint-disable linebreak-style */
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Button } from '../styles'

const Logout = ({ user }) => {

    const dispatch = useDispatch()
    //console.log('username:', user.username)

    return (
        <>
            {user.username} logged in!
            <Button
                type="button"
                onClick={() => {
                    console.log('Logout button clicked!')
                    window.localStorage.removeItem('blogsAppLoggedUser')
                    window.localStorage.clear()
                    dispatch(setUser(''))
                }}
            >
                logout
            </Button>
        </>
    )
}

export default Logout