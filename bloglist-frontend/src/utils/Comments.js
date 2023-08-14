/* eslint-disable indent *//* eslint-disable no-unused-vars *//* eslint-disable linebreak-style */
import { useDispatch } from 'react-redux'
import { useField } from './helpers'
import { submitComment } from '../reducers/blogsReducer'
import { BlogText, Button, Title } from '../styles'

const Comments = (blog) => {

    const dispatch = useDispatch()

    const { reset: resetComment, ...comment } = useField('text')

    // console.log('blog id at comments component:', blog.blog.comments)

    const comments = blog.blog.comments

    console.log('comments at comments:', comments)

    return (
        <>
            <Title>Comments</Title>

            {comments.length === 0 ? <BlogText>no comments yet! Be the first!</BlogText>
                : comments.length === 1 ? <BlogText>{comments[0]}</BlogText> : comments.map((text, index) => <BlogText key={index}>{text}</BlogText>)}

            <h3>Add comments!</h3>
            <form>
                <label>comment: </label>
                <input {...comment} placeholder='awesome blog!!!' />
                <Button type='button' onClick={() => {
                    console.log('comment.value at comments:', comment.value)
                    dispatch(submitComment(blog.blog.id, comment.value))
                    resetComment()
                }}>submit now</Button>
            </form>
        </>
    )
}

export default Comments