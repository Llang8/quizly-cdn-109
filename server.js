const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')
const { User, Question, Quiz, Submission } = require('./src/models')
const setupRoutes = require('./src/routes')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')

dotenv.config()
connectDB()

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// require('./src/routes')(app)
setupRoutes(app)

app.get('/', async (req, res) => {
    // const user = await User.findById('641a04c42c88ea594ae9c63b')
    // const user = await User.find({ username: 'dsmithTHEGUY' })
    // const user = await User.findOne({ username: 'dsmithTHEGUY' })
    // console.log(user)
    /* const newUser = new User({
        email: 'psmith@gmail.com',
        password: 'wooo',
        username: 'Patricia Smith'
    })
    await newUser.save() */
    res.send('Hello WOrld')
})

app.listen(process.env.PORT, () => {
    console.log(`Quizly running on port ${process.env.PORT}`)
})