const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// Returns all the blogs in database
blogRouter.get('/', (request, response) => {
    Blog.find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
// Adding a blog to database
blogRouter.post('/', (request, response) => {
const blog = new Blog(request.body)

    blog.save()
        .then(result => {
        response.status(201).json(result)
        })
})

// Deletes a blog in database
blogRouter.delete('/:id', async (request, response) => {
  try{
    await Blog.findByIdAndRemove(request.params.id)    
    response.status(204).end()
  } catch(exception){
    next(exception)
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