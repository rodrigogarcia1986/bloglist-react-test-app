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
import { Container, Nav, Title } from './styles'
import Footer from './components/Footer'

const Menu = (user) => {
  return (
    <div>
      <p>
        <Link to='/'>Home</Link> | <Link to='/users'>See registered users</Link> | {user.length === 0 ? null : <Logout user={user.user} />}
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

  const blogs = useSelector(state => state.blogs)
  let user = useSelector(state => state.user)
  user = user.user
  //console.log('initialized blogs:', blogs)
  //console.log('initialized user:', user)

  return (
    <>
      <Container>
        <div>
          <Nav>
            <Menu user={user} />
          </Nav>
        </div>
      </Container>
      <Container>
        <div>
          <Notification />
        </div>
      </Container>
      <div>
        <Container>
          <div>
            <Title>Blogs</Title>
            <Routes>
              <Route path='/users' element={<Users />} />
              <Route path='*' element={<Home user={user} blogs={blogs} />} />
              <Route path="/users/:id" element={<UserDetail user={user} blogs={blogs} />} />
              <Route path="/blogs/:id" element={<BlogDetail blogs={blogs} />} />
            </Routes>
          </div>
          <Footer />
        </Container>
      </div >
    </>
  )
}

export default App
