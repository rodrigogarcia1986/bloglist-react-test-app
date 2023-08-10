/* eslint-disable linebreak-style *//* eslint-disable indent *//* eslint-disable linebreak-style */
import Notification from './components/Notification'
import { Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import Home from './pages/Home'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import UserDetail from './pages/UserDetail'
import BlogDetail from './pages/BlogDetail'
import Logout from './utils/Logout'

const Menu = (user) => {
  return (
    <div>
      <p>
        <Link to='/users'>See registered users</Link> | <Link to='/'>Home</Link> | {user.length === 0 ? null : <Logout user={user.user} />}
      </p>
    </div>
  )
}

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  //user for testing
  //"username": "Alice" ,
  //"password": "456cde*G"

  // username: 'rodericus',
  // email: 'rodrigo.manoel@alumni.usp.br',
  // password: '123abc'

  const blogs = useSelector(state => state.blogs)
  let user = useSelector(state => state.user)
  user = user.user
  //console.log('initialized blogs:', blogs)
  //console.log('initialized user:', user)

  return (
    <div>
      <Menu user={user} />
      <Notification />
      <h2>Blogs</h2>
      <Routes>
        <Route path='/users' element={<Users />} />
        <Route path='*' element={<Home user={user} blogs={blogs} />} />
        <Route path="/users/:id" element={<UserDetail user={user} blogs={blogs} />} />
        <Route path="/blogs/:id" element={<BlogDetail blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default App
