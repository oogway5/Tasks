const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogs')

router.get('/', blogController.getAllBlogs)
router.post('/', blogController.createBlog)

module.exports = router