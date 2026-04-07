const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getAllBlogs = async (request, response) => {
  const { search, author, sortBy, order, page, limit } = request.query

  let query = {}

  if (search) {
    query.title = { $regex: search, $options: 'i' }
  }

  if (author) {
    query.author = { $regex: author, $options: 'i' }
  }

  let sortConfig = {}
  if (sortBy) {
    if (sortBy !== 'likes') {
      return response.status(400).json({ error: 'Unsupported sort field. Only "likes" is supported.' })
    }
    const sortOrder = order === 'desc' ? -1 : 1
    sortConfig[sortBy] = sortOrder
  }

  const pageNumber = parseInt(page) || 1
  const pageSize = parseInt(limit) || 10
  const skipIndex = (pageNumber - 1) * pageSize

  try {
    const totalMatchingBlogs = await Blog.countDocuments(query)
    const totalPages = Math.ceil(totalMatchingBlogs / pageSize)

    const blogs = await Blog.find(query)
      .sort(sortConfig)
      .skip(skipIndex)
      .limit(pageSize)
      .populate('user', { username: 1, name: 1 })

    response.json({
      data: blogs,
      metadata: {
        currentPage: pageNumber,
        pageSize: pageSize,
        totalItems: totalMatchingBlogs,
        totalPages: totalPages
      }
    })
  } catch (error) {
    response.status(500).json({ error: 'Something went wrong while fetching blogs' })
  }
}

const createBlog = async (request, response) => {
  const body = request.body
  const user = request.user 

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

const deleteBlog = async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    const user = request.user 

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'Permission denied: Only the creator can delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)

    user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)
    await user.save()

    response.status(204).end() 
  } catch (error) {
    if (error.name === 'CastError') {
      return response.status(400).json({ error: 'malformatted id' })
    }
    response.status(500).json({ error: 'something went wrong' })
  }
}

module.exports = { getAllBlogs, createBlog, likeBlog, deleteBlog }