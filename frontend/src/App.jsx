import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import Navbar from './components/Navbar'
import { AuthContext } from './context/AuthContext'
import BlogsPage from './pages/BlogsPage'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import SingleBlogPage from './pages/SingleBlogPage'
import CreateBlogPage from './pages/CreateBlogPage'

export default function App() {
  const { user, loadingAuth } = useContext(AuthContext)

  if (loadingAuth) return <div>Loading app...</div>

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/create"
          element={user ? <CreateBlogPage /> : <Navigate to="/login" replace />}
        />
        <Route path="/blogs/:id" element={<SingleBlogPage />} />
        <Route path="/" element={<BlogsPage />} />
      </Routes>
    </>
  )
}