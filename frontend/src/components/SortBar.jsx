export default function SortBar({ sortBy, setSortBy, order, setOrder }) {
  return (
    <div className="filters">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">No sort</option>
        <option value="likes">Likes</option>
      </select>

      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  )
}