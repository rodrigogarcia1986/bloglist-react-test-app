/* eslint-disable indent *//* eslint-disable linebreak-style */
import { Link } from 'react-router-dom'
import { BlogText } from '../styles'

const Blog = ({ blog }) => {

  return (
    <>
      <BlogText>
        <Link to={`/blogs/${blog.id}`}><li>{blog.title}</li></Link>
      </BlogText>
    </>
  )
}



export default Blog
