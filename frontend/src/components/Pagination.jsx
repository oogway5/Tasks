export default function Pagination({ metadata, page, setPage }) {
  if (!metadata) return null

  return (
    <div className="pagination">
      <button
        className="btn btn-secondary"
        disabled={page <= 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <span>
        Page {metadata.currentPage} of {metadata.totalPages}
      </span>

      <button
        className="btn btn-secondary"
        disabled={page >= metadata.totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  )
}