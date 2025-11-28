export default function LectureControls({ search, setSearch, srcFilter, setSrcFilter, pageSize, setPageSize }) {
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search lectures"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />
      <select value={srcFilter} onChange={(e) => setSrcFilter(e.target.value)} className="select">
        <option value="all">All Sources</option>
        <option value="old">Old</option>
        <option value="new">New</option>
      </select>
      <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="select">
        <option value={25}>25 per page</option>
        <option value={50}>50 per page</option>
        <option value={100}>100 per page</option>
      </select>
    </div>
  )
}
