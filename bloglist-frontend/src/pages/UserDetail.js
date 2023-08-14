/* eslint-disable linebreak-style *//* eslint-disable linebreak-style *//* eslint-disable indent *//* eslint-disable linebreak-style */
import { Link } from 'react-router-dom'
import { Title, BlogText } from '../styles'

const UserDetail = ({ user, blogs }) => {

    console.log('userDetail:', user)

    //const blogs = useSelector(state => state.blogs)
    const userBlogs = blogs.filter(blog => blog.user.username === user.username)
    console.log('blogs', userBlogs)



    return (
        <div>
            <Title>{user.username}</Title>
            <h4>Added blogs</h4>

            <ul>
                {userBlogs.map(blog => <BlogText key={blog.id}><li><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li></BlogText>)}
            </ul>
        </div>
    )
}

export default UserDetail