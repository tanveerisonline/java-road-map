import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { topics, phases, lectures } from './data/topics'
import SearchFilterBar from './components/SearchFilterBar'
import TopicTable from './components/TopicTable'
import LectureControls from './components/LectureControls'
import LectureTable from './components/LectureTable'

function App() {
  const [view, setView] = useState(() => {
    const v = localStorage.getItem('view')
    return v === 'topics' || v === 'lectures' ? v : 'lectures'
  })
  const [search, setSearch] = useState('')
  const [phase, setPhase] = useState(0)
  const [priority, setPriority] = useState('all')
  const [lecSearch, setLecSearch] = useState('')
  const [srcFilter, setSrcFilter] = useState('all')
  const [pageSize, setPageSize] = useState(50)
  const [page, setPage] = useState(() => {
    const raw = localStorage.getItem('lecturePage')
    const p = raw ? parseInt(raw, 10) : 1
    return Number.isFinite(p) && p > 0 ? p : 1
  })

  useEffect(() => {
    localStorage.setItem('view', view)
  }, [view])

  useEffect(() => {
    localStorage.setItem('lecturePage', String(page))
  }, [page])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    return topics.filter((t) => {
      const matchSearch = s ? (
        t.name.toLowerCase().includes(s) || String(t.folder).includes(s)
      ) : true
      const matchPhase = phase === 0 ? true : t.phase === phase
      const matchPriority = priority === 'all' ? true : t.priority === priority
      return matchSearch && matchPhase && matchPriority
    })
  }, [search, phase, priority])

  const grouped = useMemo(() => {
    const groups = new Map()
    filtered.forEach((t) => {
      const key = t.phase
      if (!groups.has(key)) groups.set(key, [])
      groups.get(key).push(t)
    })
    return Array.from(groups.entries()).sort((a, b) => a[0] - b[0])
  }, [filtered])

  const filteredLectures = useMemo(() => {
    const s = lecSearch.trim().toLowerCase()
    return lectures.filter((l) => {
      const matchSearch = s ? (
        l.title.toLowerCase().includes(s) || String(l.no).includes(s)
      ) : true
      const normalized = (l.source || '').toLowerCase().startsWith('old') ? 'old' : 'new'
      const matchSource = srcFilter === 'all' ? true : normalized === srcFilter
      return matchSearch && matchSource
    })
  }, [lecSearch, srcFilter])

  return (
    <div className="container">
      <div className="title">JAVA COURSE</div>
      <div className="subtitle">Complete Topic-by-Topic Study Guide</div>

      <div className="course-info">
        <strong>Instructor:</strong> Faisal Memon (EmbarkX)
        <br />
        <strong>Course:</strong> Java Programming For Beginners | Core Java Using IntelliJ
        <br />
        <strong>Duration:</strong> 63.5+ hours | 524 lectures | 45 sections
        <br />
        <strong>Java Version:</strong> Java 21 LTS
        <br />
        <strong>Created:</strong> November 27, 2025
      </div>

      <div className="tabs">
        <button className={`tab ${view === 'topics' ? 'active' : ''}`} onClick={() => setView('topics')}>Topics</button>
        <button className={`tab ${view === 'lectures' ? 'active' : ''}`} onClick={() => setView('lectures')}>Lectures</button>
      </div>

      {view === 'topics' && (
        <>
          <SearchFilterBar
            search={search}
            setSearch={setSearch}
            phase={phase}
            setPhase={setPhase}
            priority={priority}
            setPriority={setPriority}
            phases={phases}
          />

          {grouped.length === 0 && (
            <div className="empty">No topics match your search.</div>
          )}

          {grouped.map(([p, list]) => (
            <div key={p}>
              <div className="phase-header">
                {p === 1 ? '📚 PHASE 1: FOUNDATIONS (Topics 1-12)' : '🏗️ PHASE 2: OBJECT-ORIENTED PROGRAMMING (Topics 13-20)'}
              </div>
              <TopicTable topics={list} />
            </div>
          ))}
        </>
      )}

      {view === 'lectures' && (
        <>
          <LectureControls
            search={lecSearch}
            setSearch={setLecSearch}
            srcFilter={srcFilter}
            setSrcFilter={setSrcFilter}
            pageSize={pageSize}
            setPageSize={(n) => { setPageSize(n); setPage(1) }}
          />
          <LectureTable items={filteredLectures} page={page} setPage={setPage} pageSize={pageSize} />
        </>
      )}

      <div className="footer">
        <strong>Last Updated:</strong> November 27, 2025
        <br />
        <strong>Course Version:</strong> Java 21 LTS (April 2025 Update)
        <br />
        <strong>Total Study Time:</strong> 63.5+ hours
        <br />
        <strong>Total Lectures:</strong> 524 lectures
        <br />
        <br />
        <strong>
          <i>Good Luck with your Java Learning Journey! 🎉</i>
        </strong>
      </div>
    </div>
  )
}

export default App
