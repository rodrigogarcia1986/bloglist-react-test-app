/* eslint-disable linebreak-style *//* eslint-disable linebreak-style *//* eslint-disable indent *//* eslint-disable linebreak-style */
import { Link } from 'react-router-dom'

const UserDetail = ({ user, blogs }) => {

    console.log('userDetail:', user)

    //const blogs = useSelector(state => state.blogs)
    const userBlogs = blogs.filter(blog => blog.user.username === user.username)
    console.log('blogs', userBlogs)



    return (
        <div>
            <h2>{user.username}</h2>
            <h4>Added blogs</h4>
            <ul>
                {userBlogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
            </ul>
        </div>
    )
}

export default UserDetail