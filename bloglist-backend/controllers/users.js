const userRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Blog = require('../models/Blog');


userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    console.log(users)

    return res.json(users)
})

userRouter.post('/', async (req, res) => {

    const { username, email, password } = req.body

    if (!username && !email && !password) {
        return res.status(400).json({ message: "All fields must be informed!" });
    } else if (password.length < 3) {
        return res.status(400).json({ message: "Password must be at least 3 characters long!" })
    }

    const salts = 10
    passwordHash = await bcrypt.hash(password, salts)

    const newUser = new User({
        username,
        email,
        passwordHash
    })

    const savedUser = await newUser.save()

    return res.status(201).json(savedUser)

})

userRouter.delete('/:id', async (req, res) => {

    const { id } = req.params

    await User.findByIdAndDelete(id)

    return res.status(204).send()
})


module.exports = userRouter;