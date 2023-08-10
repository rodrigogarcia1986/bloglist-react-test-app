/* eslint-disable linebreak-style *//* eslint-disable indent */
import { deleteBlog, putBlog, initializeBlogs } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useField } from '../utils/helpers'
import Comments from '../utils/Comments'
import { useDispatch } from 'react-redux'


const BlogDetail = ({ blogs }) => {

    const dispatch = useDispatch()

    const [isLoading, setLoading] = useState(true)

    //setTimeout(() => setLoading(false), 1500)

    useEffect(() => {
        function startData() {
            dispatch(initializeBlogs())
                .then(() => setLoading(false))
        }
        startData()
    }, [])

    const id = useParams().id

    const blog = blogs.find(blog => blog.id === id)
    //console.log('blog and blogs:', blog, blogs)

    //console.log(blog)

    const [isVisible, setVisible] = useState(false)
    const [editionMode, setEditionMode] = useState(false)


    const hideWhenVisible = { display: isVisible ? 'none' : '' }
    const showWhenVisible = { display: isVisible ? '' : 'none' }

    const hideEditionMode = { display: editionMode ? 'none' : '' }
    const showEditionMode = { display: editionMode ? '' : 'none' }

    const { reset: resetTitle, ...title } = useField('text')
    const { reset: resetAuthor, ...author } = useField('text')
    const { reset: resetUrl, ...url } = useField('text')


    const handleUpdate = (blog) => {
        console.log('blog for update:', blog)
        console.log('title value:', title.value, '\nauthor:', author.value, '\nurl:', url.value)

        if (!title.value && !author.value) {
            dispatch(setNotification('Please, update at least one information!'))
            return
        }

        let { ...updatedBlog } = blog

        updatedBlog.title = title.value ? title.value : updatedBlog.title
        updatedBlog.author = author.value ? author.value : updatedBlog.author
        updatedBlog.url = url.value ? url.value : updatedBlog.url

        setEditionMode(false)
        dispatch(putBlog(updatedBlog))
        console.log('updated blog sent for update:', updatedBlog)
    }

    if (isLoading) {
        return (
            <h1>L O A D I N G . . .</h1>
        )
    }

    return (
        <div className="blog">
            <div className="blogTitle">
                <div>
                    <h3>Title: {blog.title}{' '}</h3>
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
                    <button type="button" onClick={() => dispatch(deleteBlog(blog))}>
                        delete
                    </button>{' '}|{' '}
                    <button style={hideEditionMode} type="button" onClick={() => setEditionMode(true)}>edit</button>
                </div>
            </div>
            <div style={showWhenVisible} className="blogDetail">
                <p>Author: {blog.author}</p>
                <p>URL: <a href={blog.url}>{blog.url}</a></p>
                <p>
                    Likes: {blog.likes}{' '}
                    <button
                        type="button"
                        onClick={() => {

                            const { ...dataToUpdate } = blog

                            dataToUpdate.likes += 1

                            console.log('likes update:', dataToUpdate)
                            dispatch(putBlog(dataToUpdate))
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
            <div style={showEditionMode} className="blogDetail">
                <label>new title  </label><input {...title} placeholder='insert new title' /><br />
                <label>new author </label><input {...author} placeholder='insert new author' /><br />
                <label>new url  </label><input {...url} placeholder='insert new url' /><br />
                <button type='button' onClick={() => {
                    handleUpdate(blog)
                    resetAuthor()
                    resetTitle()
                    resetUrl()
                }}>save!</button> {' '}|{' '}
                <button type='button' onClick={() => setEditionMode(false)}>cancel!</button>
            </div>
            <Comments blog={blog} />
        </div>
    )
}


export default BlogDetail