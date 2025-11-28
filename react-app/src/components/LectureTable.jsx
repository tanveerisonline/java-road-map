import { useEffect, useState } from 'react'

export default function LectureTable({ items, page, setPage, pageSize }) {
  const total = items.length
  const pages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), pages)
  const start = (safePage - 1) * pageSize
  const end = Math.min(start + pageSize, total)
  const slice = items.slice(start, end)

  const [completed, setCompleted] = useState(() => {
    try {
      const raw = localStorage.getItem('lectureCompleted')
      const arr = raw ? JSON.parse(raw) : []
      return new Set(Array.isArray(arr) ? arr : [])
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('lectureCompleted', JSON.stringify(Array.from(completed)))
    } catch (e) { void e }
  }, [completed])

  const toggle = (no) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(no)) next.delete(no)
      else next.add(no)
      return next
    })
  }

  return (
    <div>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Source</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((l) => (
              <tr key={l.no}>
                <td>{l.no}</td>
                <td>{l.title}</td>
                <td>{(l.source || '').toLowerCase().startsWith('old') ? 'Old' : 'New'}</td>
                <td>
                  <input type="checkbox" checked={completed.has(l.no)} onChange={() => toggle(l.no)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="btn" onClick={() => setPage(1)} disabled={safePage === 1}>⏮ First</button>
        <button className="btn" onClick={() => setPage(safePage - 1)} disabled={safePage === 1}>◀ Prev</button>
        <span className="page-indicator">Page {safePage} / {pages} · Showing {start + 1}-{end} of {total}</span>
        <button className="btn" onClick={() => setPage(safePage + 1)} disabled={safePage === pages}>Next ▶</button>
        <button className="btn" onClick={() => setPage(pages)} disabled={safePage === pages}>Last ⏭</button>
      </div>
    </div>
  )
}
