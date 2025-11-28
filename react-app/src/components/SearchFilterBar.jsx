import { useMemo } from 'react'

export default function SearchFilterBar({ search, setSearch, phase, setPhase, priority, setPriority, phases }) {
  const phaseOptions = useMemo(() => [{ id: 0, name: 'All Phases' }, ...phases], [phases])
  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search topics"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />
      <select value={phase} onChange={(e) => setPhase(Number(e.target.value))} className="select">
        {phaseOptions.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="select">
        <option value="all">All Priorities</option>
        <option value="must">Must</option>
        <option value="important">Important</option>
        <option value="defer">Defer</option>
      </select>
    </div>
  )
}

