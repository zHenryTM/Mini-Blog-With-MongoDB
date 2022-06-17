const router = require("express").Router()

const User = require("./../models/User")
const Post = require("./../models/Post")

router.get("/user", async (req, res) => {
    try {
        const user = await User.find().populate("posts")
        user.password = undefined

        res.send(user)
    } catch(err) {
        res.status(401).send({ error: "Error showing users..." })
    }
})

router.get("/post", async (req, res) => {
    try {
        const post = await Post.find().populate("author")

        res.send(post)
    } catch(err) {
        res.status(401).send({ error: "Error showing posts..." })
    }
})

module.exports = app => app.use("/list", router)