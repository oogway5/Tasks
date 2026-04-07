const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogs')
const middleware = require('../utils/middleware') 

router.get('/', blogController.getAllBlogs)
router.patch('/:id/like', blogController.likeBlog)
router.post('/', middleware.userExtractor, blogController.createBlog)
router.delete('/:id', middleware.userExtractor, blogController.deleteBlog)

module.exports = router