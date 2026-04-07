const express = require('express')
const mongoose = require('mongoose')
const blogRouter = require('./routes/blogs')
const usersRouter = require('./routes/users')
const loginRouter = require('./routes/login') 
const middleware = require('./utils/middleware') 

const app = express()
const mongoUrl = process.env.MONGODB_URI

console.log('Connecting to MongoDB Atlas...')
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err.message))

app.use(express.json())
app.use(middleware.tokenExtractor) 
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter) 


const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})