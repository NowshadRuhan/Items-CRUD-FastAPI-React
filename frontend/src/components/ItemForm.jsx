import { useEffect, useState } from 'react'

export default function ItemForm({ item, onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const isEditing = Boolean(item)

  useEffect(() => {
    if (item) {
      setTitle(item.title)
      setDescription(item.description || '')
    } else {
      setTitle('')
      setDescription('')
    }
    setError('')
  }, [item])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    try {
      await onSubmit({ title: title.trim(), description: description.trim() || null })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Item' : 'Create Item'}</h2>

      {error && <div className="error-banner">{error}</div>}

      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          maxLength={200}
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description (optional)"
          rows={4}
        />
      </label>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Update' : 'Create'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}
