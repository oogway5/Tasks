const Blog = require('../models/blog')
const User = require('../models/user')

const getAllBlogs = async (request, response) => {
  const { search } = request.query 
  let query = {}

  if (search) {
    query.title = { $regex: search, $options: 'i' }
  }

  const blogs = await Blog.find(query).populate('user', { username: 1, name: 1 })
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

const likeBlog = async (request, response) => {
  const { id } = request.params

  try {
    const blog = await Blog.findById(id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    blog.likes = (blog.likes || 0) + 1
    
    const updatedBlog = await blog.save()
    
    await updatedBlog.populate('user', { username: 1, name: 1 })
    
    response.status(200).json(updatedBlog)

  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'malformatted id' })
    }
    response.status(500).json({ error: 'something went wrong' })
  }
}

module.exports = { getAllBlogs, createBlog, likeBlog } 