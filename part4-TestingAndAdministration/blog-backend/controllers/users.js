const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Gets all users from database
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(u => u.toJSON()))   
})

// Adds new user to database 
usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if(!body.password){
        return response.status(400).json({error: "Missing password"})
    }
    if(body.password.length < 3){
        return response.status(400).json({error: "Password is too short"})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    try{
        const savedUser = await user.save()
        response.json(savedUser)
    } catch(exception){
        next(exception)
    }
})

module.exports = usersRouter