/* eslint-disable linebreak-style *//* eslint-disable indent *//* eslint-disable linebreak-style */
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Users = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [])

    const state = useSelector(state => state.user)
    const { users } = state

    return (
        <>
            <h3>Users</h3>
            <table>
                <tbody>
                    <tr>
                        <th>username</th>
                        <th>blogs created</th>
                    </tr>

                    {users.map(user =>
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                            <td> {user.blogs.length}</td>
                        </tr>)}

                </tbody>
            </table>
        </>
    )

}

export default Users