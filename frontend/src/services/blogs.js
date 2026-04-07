import axios from 'axios'

const getToken = () => {
  const savedUser = localStorage.getItem('loggedBlogUser')
  if (!savedUser) return null
  return JSON.parse(savedUser).token
}

const getAll = async (params = {}) => {
  const response = await axios.get('/api/blogs', { params })
  return response.data
}

const create = async (newBlog) => {
  const token = getToken()

  const response = await axios.post('/api/blogs', newBlog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

const likeBlog = async (id) => {
  const response = await axios.patch(`/api/blogs/${id}/like`)
  return response.data
}

const deleteBlog = async (id) => {
  const token = getToken()

  await axios.delete(`/api/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return true
}

export default { getAll, create, likeBlog, deleteBlog }