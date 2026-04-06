const Blog = require('../models/blog')
const User = require('../models/user')

const getAllBlogs = async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
}

const createBlog = async (request, response) => {
  const body = request.body

  const user = await User.findOne()
  
  if (!user) {
    return response.status(400).json({ error: 'Please create a user first!' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id 
  })

  try {
    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
}

module.exports = { getAllBlogs, createBlog }