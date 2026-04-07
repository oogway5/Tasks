import { useState } from 'react'

export default function BlogCard({ blog, onLike, onDelete, currentUser }) {
  const [expanded, setExpanded] = useState(false)

  const canDelete =
    currentUser && blog.user && blog.user.id === currentUser.id

  return (
    <div className="card blog-card">
      <div className="blog-top">
        <h3>{blog.title}</h3>
        <button className="btn btn-secondary" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide' : 'View'}
        </button>
      </div>

      {expanded && (
        <div className="blog-details">
          <p><strong>Author:</strong> {blog.author}</p>
          <p>
            <strong>URL:</strong>{' '}
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </p>
          <p><strong>Likes:</strong> {blog.likes}</p>
          <p>
            <strong>Creator:</strong> {blog.user?.name || blog.user?.username || 'Unknown'}
          </p>

          <div className="actions-row">
            <button className="btn" onClick={() => onLike(blog.id)}>
              Like
            </button>

            {canDelete && (
              <button className="btn btn-danger" onClick={() => onDelete(blog.id)}>
                Delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}