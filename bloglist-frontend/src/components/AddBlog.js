import { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlog = ({ handleAddBlog, handleBlogTitleChange, handleBlogAuthorChange, handleBlogUrlChange, newBlogTitle, newBlogAuthor, newBlogUrl }) => {

  const [isVisible, setVisible] = useState(false)

  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>create</button>
      </div>
      <br />
      <div style={showWhenVisible}>
        <h3>Create new blog!</h3>
        <br />
        <form onSubmit={handleAddBlog}>
          <label>title</label> <input id="title" type="text" value={newBlogTitle} onChange={handleBlogTitleChange} />
          <br />
          <label>author</label> <input id="author" type="text" value={newBlogAuthor} onChange={handleBlogAuthorChange} />
          <br />
          <label>url</label> <input id="url" type="text" value={newBlogUrl} onChange={handleBlogUrlChange} />
          <br />
          <button id="create" type="submit">create!</button>
          <br />
        </form >
      </div>
    </>
  )
}

AddBlog.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
  handleBlogTitleChange: PropTypes.func.isRequired,
  handleBlogAuthorChange: PropTypes.func.isRequired,
  handleBlogUrlChange: PropTypes.func.isRequired,
  newBlogTitle: PropTypes.string.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired,
}

export default AddBlog