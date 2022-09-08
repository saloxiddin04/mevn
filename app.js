//imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads'))

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
}).then(() => console.log('Connected to database')).catch((err) => console.log(err))

app.use("/api/post", require("./routes/index"))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname+'/dist/'))
    app.get("*", (req, res) => {
        res.sendFile(__dirname + "/dist/index.html")
    })
}

app.listen(port, () => console.log(`server running at http://localhost:${port}`))

