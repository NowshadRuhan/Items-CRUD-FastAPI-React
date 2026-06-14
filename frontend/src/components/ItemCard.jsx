function formatDate(iso) {
  return new Date(iso).toLocaleString()
}

export default function ItemCard({ item, onEdit, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Delete "${item.title}"?`)) {
      onDelete(item.id)
    }
  }

  return (
    <article className="item-card">
      <div className="item-card-body">
        <h3>{item.title}</h3>
        {item.description && <p>{item.description}</p>}
        <small>
          Created: {formatDate(item.created_at)} · Updated:{' '}
          {formatDate(item.updated_at)}
        </small>
      </div>
      <div className="item-card-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onEdit(item)}>
          Edit
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  )
}
