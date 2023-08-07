const helper = require('./tests_helper')
const bcrypt = require('bcrypt')
const Blog = require('../models/Blog')
const User = require('../models/User')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const { test } = require('node:test')
const api = supertest(app)

describe('test api/blogs', () => {
    beforeEach(async () => {

        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('get all blogs from api/blogs', async () => {

        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('verify if a unique verifier is named id', async () => {

        const blogs = await api.get('/api/blogs')
        //console.log("blogs length", blogs.body.length, "\ncontent", blogs.body[0])
        expect(blogs.body[0].id).toBeDefined()
    })

    test('POST creates a new blog post and length increases', async () => {

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)

        const blogs = await api.get('/api/blogs')

        //console.log(blogs.body)

        expect(blogs.body).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('is there likes property? set default to zero if there is not', async () => {

        const newBlog = {
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)


        const blogs = await api.get('/api/blogs')
        //console.log("with likes", blogs.body[blogs.body.length - 1])
        expect(blogs.body[blogs.body.length - 1].likes).toBeDefined()
    })

    test('if title or url are missing, respond with 400', async () => {

        let newBlog = {
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('delete specific blog by id', async () => {

        const blogs = await api.get('/api/blogs')

        const idtoBeDeleted = blogs.body[0].id

        await api
            .delete(`/api/blogs/${idtoBeDeleted}`)
            .expect(204)

        //console.log("After await deletion")
        const updatedBlogs = await api.get('/api/blogs')

        expect(updatedBlogs.body.length).toBe(helper.initialBlogs.length - 1)

    }, 10_000)

    test('update likes attribute', async () => {

        const blogs = await api.get('/api/blogs')

        const idtoBePatched = blogs.body[0].id

        const patchedBlog = {
            likes: 99
        }

        await api
            .put(`/api/blogs/${idtoBePatched}`)
            .send(patchedBlog)
            .expect(204)

        const newBlogs = await api.get('/api/blogs')

        console.log("Original:", blogs.body[0], "Patched:", newBlogs.body[0])

        expect(newBlogs.body[0].likes).toBe(99)

    })
})

describe('tests for api/users:  setting up database by deleting users and adding one', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: 'userForTest', passwordHash })

        await user.save()
    })

    test('invalid user: password\'s length lesser than 3', async () => {

        const newUser = {
            username: "roderick",
            name: "rodrigo",
            password: "12"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('invalid user: username length lesser than 3', async () => {

        const newUser = {
            username: "ro",
            name: "rodrigo",
            password: "123abc"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})