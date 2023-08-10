/* eslint-disable indent */
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  return (
    <>
      <Link to={`/blogs/${blog.id}`}><li>{blog.title}</li></Link>
    </>
  )
}



export default Blog
