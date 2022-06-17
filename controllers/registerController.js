const router = require("express").Router()

const User = require("./../models/User")
const Post = require("./../models/Post")

const bcrypt = require("bcryptjs")

router.post("/user", async (req, res) => {
    try {
        const user = await new User({...req.body}).save()
        user.password = undefined

        res.send(user)
    } catch(err) {
        res.status(401).send({ error: "Error creating a new user..." })
    }
})

router.post("/post", async (req, res) => {
    try {
        const { title, content, email, password } = req.body

        let user = await User.findOne({email: email}).select("+password")

        if (!user) return res.status(401).send({ error: "User does not exist!" })
        if (!await bcrypt.compare(password, user.password)) return res.status(401).send({ error: "Invalid password!" })

        const post = await new Post({
            title: title,
            content: content,
            author: user._id
        })

        post.save()
            .then(async post => {
                await User.findOneAndUpdate(user.id, {$push: {posts: post}})
            })

        res.send(post)
    } catch(err) {
        res.status(401).send({ error: "Error creating a new post..." })
    }
})

module.exports = app => app.use("/register", router)