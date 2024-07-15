require('dotenv').config()
const notFound = require('./notFound')
const connectToDB = require('./connect')
const router = require('./routes/routes')
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use('/v1/users', router)
app.use(notFound)


const port = process.env.PORT || 3000


const startServerAndDB = async () => {
    try {
        await connectToDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server running on port ${port}......`))
    } catch (error) {
        console.log(error)
    }
}

startServerAndDB()