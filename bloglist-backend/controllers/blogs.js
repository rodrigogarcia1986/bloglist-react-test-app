const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { error } = require('../utils/logger');

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogsRouter.get('/', async (req, res) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 })
    //return res.json(blogs.map(blog => blog.toJSON()))
    return res.json(blogs)
});

blogsRouter.post('/', async (req, res) => {


    console.log("req received", req.body, "\nreq.token:", req.token, "\nred.decodedToken:", req.decodedToken)

    const decodedToken = jwt.verify((req.token), process.env.SECRET)

    if (!req.token || !req.decodedToken) {
        //console.log("request", req)
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const { title, author, url } = req.body

    //const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)


    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    if (!title || !author || !url) {
        res.status(400).json({ error: "Title, author and url must be informed!" })
    }

    const existingBlog = await Blog.findOne({ title })

    if (existingBlog) {
        return res.status(400).json({ message: "There is already a blog with this title!" })
    }

    // console.log("CHEGOU ATÉ AQUI E TRAVOU")

    const user = await User.findById(req.decodedToken.id)
    console.log("User found on creating blog to add:", user)

    const blog = new Blog({
        title,
        author,
        url,
        user
    });

    const savedBlog = await blog.save()

    return res.status(201).json(savedBlog)

});

blogsRouter.delete('/:id', async (req, res) => {
    // const existingBlog = await Blog.findById(id)

    // if (existingBlog === null) {
    //     return res.status(400).json({ error: "There is no entry for the informed id" })
    // } else {

    //     await Blog.findByIdAndDelete(id)

    //     return res.status(204).send()
    // }

    console.log("req received", req.body, "\nreq.token:", req.token, "\nred.decodedToken:", req.decodedToken)

    if (!req.token || !req.decodedToken) {
        //return res.status(401).send('token missing or invalid')
        return res.status(401).json({ error: "Usuário não autenticado! Fazer login!" })
    }

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "ID must be informed" })
    }

    console.log("ID received on backend for deletion:", id)
    console.log('TOKEN received', req.token, "\nDecodedToken:", req.decodedToken)

    try {
        const blog = await Blog.findById(id)
        console.log("Blog found in database:", blog)
        if (blog.user.toString() === req.decodedToken.id.toString()) {
            await Blog.findByIdAndRemove(id)
            console.log("Blog deleted!")
            return res.status(204).send()
        } else {
            res.status(400).send()
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


blogsRouter.put('/:id', async (req, res) => {

    console.log("Data received for put/update:", req.params, req.body)

    const { title, author, url, likes } = req.body
    console.log("likes", likes)

    const { id } = req.params

    if (!id) {
        return res.status(400).json({ error: "ID must be informed" })
    }

    if (!title && !author && !url && !likes) {
        return res.status(404).json({ error: "Must inform at least one data to replace" })
    }

    let dataToUpdate = await Blog.findById(id)

    if (title) {
        dataToUpdate.title = title;
    }
    if (author) {
        dataToUpdate.author = author
    }
    if (url) {
        dataToUpdate.url = url
    }
    if (likes) {
        dataToUpdate.likes = likes
        console.log("updated likes?", dataToUpdate.likes, "whole doc", dataToUpdate)
    }

    await Blog.findByIdAndUpdate(id, dataToUpdate, { new: true })

    return res.status(204).send()
})

module.exports = blogsRouter;

