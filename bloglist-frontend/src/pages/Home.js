/* eslint-disable linebreak-style *//* eslint-disable indent *//* eslint-disable linebreak-style */
import AddBlog from '../components/AddBlog'
import Blog from '../components/Blog'
import FormLogin from '../components/FormLogin'

const Home = ({ user, blogs }) => {

    //console.log('user:', user)
    //console.log('blogs at home:', blogs)

    return (
        <div>
            {user ? null : <FormLogin />}
            <br />
            <div>
                <AddBlog />
            </div>
            <div>
                <ol>
                    {blogs.map((blog) => (
                        <Blog key={blog.id} blog={blog} />))}
                </ol>
            </div>
        </div>
    )
}

export default Home