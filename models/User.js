const mongoose = require("./../database/db")
const bcrypt = require("bcryptjs")

const Schema = mongoose.Schema

const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})

module.exports = mongoose.model("User", userSchema)