import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleDeleteBlog, handleBlogUpdate }) => {
  //console.log(blog)

  const [isVisible, setVisible] = useState(false)

  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  return (
    <>
      <div className="blog">
        <div className="blogTitle">
          <p>
            {blog.title}{' '}
            <button
              style={hideWhenVisible}
              type="button"
              onClick={() => {
                setVisible(true)
                console.log(isVisible)
              }}
            >
              view
            </button>{' '}
            |{' '}
            <button type="button" onClick={() => handleDeleteBlog(blog)}>
              delete
            </button>
          </p>
        </div>
        <div style={showWhenVisible} className="blogDetail">
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>
            {blog.likes}{' '}
            <button
              type="button"
              onClick={() => {
                const dataToUpdate = {
                  title: blog.title,
                  author: blog.author,
                  url: blog.url,
                  likes: blog.likes + 1,
                }
                //console.log("chegou aqui!")
                handleBlogUpdate(blog.id, dataToUpdate)
                //console.log("Passou da função!")
              }}
            >
              like
            </button>
          </p>
          <p>Blog created by {blog.user.username}</p>
          <button
            style={showWhenVisible}
            type="button"
            onClick={() => {
              setVisible(false)
              console.log(isVisible)
            }}
          >
            hide
          </button>
        </div>
      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  handleBlogUpdate: PropTypes.func.isRequired,
}

export default Blog
