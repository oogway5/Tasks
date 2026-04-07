export default function SearchBar({ search, setSearch, author, setAuthor }) {
  return (
    <div className="filters">
      <input
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <input
        placeholder="Filter by author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
    </div>
  )
}