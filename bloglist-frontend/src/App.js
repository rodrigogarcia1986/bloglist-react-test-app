import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notifications, setNotifications] = useState(null)

  //user for testing
  //"username": "Alice" ,
  //"password": "456cde*G"


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogsAppLoggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    console.log('target', username, password)
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      console.log(`Logging in with ${username} and ${password}`)
      window.localStorage.setItem('blogsAppLoggedUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setNotifications(`${user.name} sucessfully logged in!`)
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
      console.log('Notification set on sucessfull login:', { notifications })
    } catch (error) {
      console.log(error.message)
      setNotifications(error.message)
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
      console.log('Notification set on unsucessfull login:', { notifications })

    }
  }

  const formLogin = () => {

    return (
      <>
        <h1>Log in to application</h1>
        <form onSubmit={handleLogin}>
          <label>username</label> <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          <br />
          <label>password</label> <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          <br />
          <button id="login-button" type="submit">login</button>
        </form>
      </>
    )
  }

  const handleBlogTitleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewBlogUrl(event.target.value)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    console.log('Adding new blog...')
    const response = await blogService.create(newBlogTitle, newBlogAuthor, newBlogUrl)
    console.log('Response after saving new Blog:', response)
    setBlogs(blogs.concat(response))
    setNotifications(`Added blog "${newBlogTitle}" from ${newBlogAuthor}!`)
    setTimeout(() => {
      setNotifications(null)
    }, 5000)
  }

  const handleDeleteBlog = async (toDelete) => {
    //event.preventDefault()
    const response = await blogService.blogDelete(toDelete.id)
    console.log('Response on handleDeleteBlog', response)

    if (response.status === 204) {
      const newBlogs = blogs.filter(blog => blog.id !== toDelete.id)
      setBlogs(newBlogs)
      setNotifications(`${toDelete.title} deleted!`)
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
    } else {

      setNotifications(response.data.error)
      setTimeout(() => {
        setNotifications(null)
      }, 5000)
    }
  }

  const handleBlogUpdate = async (id, dataToUpdate) => {
    console.log('Updating existing blog...')
    const response = await blogService.blogUpdate(id, dataToUpdate)
    console.log('Response after updating Blog:', response)
    const updatedBlogs = await blogService.getAll()
    const updatedBlog = updatedBlogs.find(blog => blog.id === id)
    console.log('updated blog', updatedBlog)
    setBlogs(updatedBlogs)
    setNotifications(`Blog updated! Likes: ${updatedBlog.likes}`)
    setTimeout(() => {
      setNotifications(null)
    }, 5000)
  }

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>

      <h2>Blogs</h2>

      <Notification notification={notifications} />

      {!user && formLogin()}
      {user &&
        <>
          <div>
            <p> {user.username} logged in! <button type="button" onClick={() => {
              console.log('Logout button clicked!')
              window.localStorage.removeItem('blogsAppLoggedUser')
              window.localStorage.clear()
              setUser('')
            }}>logout</button>
            </p>
            <br />
          </div><div>
            <AddBlog handleAddBlog={handleAddBlog}
              handleBlogTitleChange={handleBlogTitleChange}
              handleBlogAuthorChange={handleBlogAuthorChange}
              handleBlogUrlChange={handleBlogUrlChange}
              newBlogTitle={newBlogTitle}
              newBlogAuthor={newBlogAuthor}
              newBlogUrl={newBlogUrl}
            />
          </div>
        </>
      }

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
          handleDeleteBlog={handleDeleteBlog}
          handleBlogUpdate={handleBlogUpdate}
        />
      )}
    </div>
  )
}

export default App