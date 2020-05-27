const config = require('../utils/config')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// Returns all the blogs in database
blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs.map(b => b.toJSON()))
})
  

const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    return authorization.substring(7)
  }
  return null
}

// Adding a blog to database
blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, config.SECRET)
  if(!token || !decodedToken.id){
    return response.status(401).send({error: 'token missing or invalid'})
  } 

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

// Deletes a blog in database
blogRouter.delete('/:id', async (request, response) => {
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, config.SECRET)
  if(!token || !decodedToken.id){
    return response.status(401).send({error: 'token missing or invalid'})
  } 

  const user = await User.findById(decodedToken.id)
  console.log("USER", user)

  const blog = await Blog.findOne({_id: request.params.id})
  console.log("BLOG", blog)

  if(user._id.toString() === blog.user.toString()){
    try{
      await Blog.findByIdAndRemove(request.params.id)    
      response.status(204).end()
    } catch(exception){
      next(exception)
    }
  } else{
    return response.status(401).send({error: "You do not have permission to delete this blog"})
  }

})

// Updates number of likes for specific blog
blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }
  console.log(blog)
  try{
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter