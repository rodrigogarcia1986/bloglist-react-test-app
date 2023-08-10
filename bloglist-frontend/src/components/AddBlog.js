/* eslint-disable linebreak-style */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { useField } from '../utils/helpers'
import { Button } from '../styles'

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
        <Button onClick={() => setVisible(true)}>create</Button>
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
          <Button id="create" type="button" onClick={() => {
            const newBlog = { title: title.value, author: author.value, url: url.value }
            dispatch(createBlog(newBlog))
            resetTitle()
            resetAuthor()
            resetUrl()
          }}>
            save!
          </Button>
          <Button type="button" onClick={() => setVisible(false)}>cancel!</Button>
          <br />
        </form>
      </div>
    </>
  )
}

export default AddBlog
