/* eslint-disable linebreak-style *//* eslint-disable indent *//* eslint-disable linebreak-style */
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BlogText, Container, Title } from '../styles'

const Users = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [])

    const state = useSelector(state => state.user)
    const { users } = state

    return (
        <>
            <Container>
                <Title>Users</Title>
                <table>
                    <tbody>
                        <tr>
                            <th><Title>username |</Title></th>
                            <th><Title>blogs created</Title></th>
                        </tr>

                        {users.map(user =>
                            <tr key={user.id}>
                                <td><Link to={`/users/${user.id}`}><BlogText>{user.username}</BlogText></Link></td>
                                <td> <BlogText>{user.blogs.length}</BlogText></td>
                            </tr>)}

                    </tbody>
                </table>
            </Container>
        </>
    )

}

export default Users