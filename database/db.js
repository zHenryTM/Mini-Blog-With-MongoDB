const mongoose = require("mongoose")

async function startDB() {
    try {
        await mongoose.connect("mongodb://localhost/mini-blog-app")
        console.log("Connected to database!")
    } catch(err) {
        console.log("Error connecting to database." + err)
    }
}

startDB()

module.exports = mongoose