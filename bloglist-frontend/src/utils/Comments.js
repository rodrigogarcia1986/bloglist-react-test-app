/* eslint-disable indent *//* eslint-disable no-unused-vars *//* eslint-disable linebreak-style */
import { useDispatch } from 'react-redux'
import { useField } from './helpers'
import { submitComment } from '../reducers/blogsReducer'

const Comments = (blog) => {

    const dispatch = useDispatch()

    const { reset: resetComment, ...comment } = useField('text')

    // console.log('blog id at comments component:', blog.blog.comments)

    const comments = blog.blog.comments

    console.log('comments at comments:', comments)

    return (
        <>
            <ul>
                {comments.length === 0 ? <li>no comments yet! Be the first!</li>
                    : comments.length === 1 ? <li>{comments[0]}</li> : comments.map((text, index) => <li key={index}>{text}</li>)}
            </ul>
            <h3>Add comments!</h3>
            <form>
                <label>comment: </label>
                <input {...comment} placeholder='awesome blog!!!' />
                <button type='button' onClick={() => {
                    console.log('comment.value at comments:', comment.value)
                    dispatch(submitComment(blog.blog.id, comment.value))
                    resetComment()
                }}>submit now</button>
            </form>
        </>
    )
}

export default Comments