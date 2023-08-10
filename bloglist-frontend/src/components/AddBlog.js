import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { useField } from '../utils/helpers'

const AddBlog = () => {

  const dispatch = useDispatch()

  const [isVisible, setVisible] = useState(false)

  const hideWhenVisible = { display: isVisible ? 'none' : '' }
  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>create</button>
      </div>
      <br />
      <div style={showWhenVisible}>
        <h3>Create new blog!</h3>
        <br />
        <form>
          <label>title</label>{' '}
          <input {...title} />
          <br />
          <label>author</label>{' '}
          <input
            {...author} />
          <br />
          <label>url</label>{' '}
          <input
            {...url} />
          <br />
          <button id="create" type="button" onClick={() => {
            const newBlog = { title: title.value, author: author.value, url: url.value }
            dispatch(createBlog(newBlog))
            resetTitle()
            resetAuthor()
            resetUrl()
          }}>
            create!
          </button>
          <br />
        </form>
      </div>
    </>
  )
}

export default AddBlog
