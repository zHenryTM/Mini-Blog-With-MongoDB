const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

require("./controllers/registerController")(app)
require("./controllers/listController")(app)

app.listen(3000, () => console.log("server started on port 3000."))