const express = require('express')
const app = express()

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoute = require('./userRoute')

dotenv.config()


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Db connection successfull'))
    .catch((err) => {
        console.log('Can\'t\' connect to db')
        console.log(err)
    })


app.use(express.json())
app.use('/api/user',userRoute)


app.listen(5000, () => {
    console.log('Server is listening on port 5000')
})