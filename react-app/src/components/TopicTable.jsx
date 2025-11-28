export default function TopicTable({ topics }) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Folder</th>
            <th>Topic</th>
            <th>Duration</th>
            <th>Lectures</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.folder}</td>
              <td>{t.name}</td>
              <td>{t.duration}</td>
              <td>{t.lectures}</td>
              <td>
                <span className={`priority ${t.priority}`}>{t.priority.toUpperCase()}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

