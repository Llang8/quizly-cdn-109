const { User } = require('../models')
const { GraphQLString } = require('graphql')
const { createJWT } = require('../util/auth')

const register = {
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args) {
        // Check if a user exists with inputted email
        const checkUser = await User.findOne({ email: args.email })

        console.log(checkUser)

        if (checkUser) {
            throw new Error('User with this email address already exists')
        }

        const newUser = new User({
            username: args.username,
            email: args.email,
            password: args.password
        })

        await newUser.save()

        return createJWT(newUser)
    }
}  

const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email })

        if (!user || user.password !== args.password) {
            throw new Error('Invalid Credentials')
        }

        return createJWT(user)
    }
}

module.exports = {
    register,
    login
} 