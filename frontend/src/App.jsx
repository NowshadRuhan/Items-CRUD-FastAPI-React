import { useCallback, useEffect, useState } from 'react'
import * as itemsApi from './api/items'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'
import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [view, setView] = useState('list')
  const [editingItem, setEditingItem] = useState(null)

  const loadItems = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await itemsApi.getItems()
      setItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  const handleCreate = () => {
    setEditingItem(null)
    setView('form')
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setView('form')
  }

  const handleCancel = () => {
    setEditingItem(null)
    setView('list')
  }

  const handleSubmit = async (data) => {
    if (editingItem) {
      await itemsApi.updateItem(editingItem.id, data)
    } else {
      await itemsApi.createItem(data)
    }
    setEditingItem(null)
    setView('list')
    await loadItems()
  }

  const handleDelete = async (id) => {
    try {
      await itemsApi.deleteItem(id)
      await loadItems()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Items Manager</h1>
          <p>Create, edit, update, and delete items</p>
        </div>
        {view === 'list' && (
          <button type="button" className="btn btn-primary" onClick={handleCreate}>
            + New Item
          </button>
        )}
      </header>

      <main className="app-main">
        {error && view === 'list' && <div className="error-banner">{error}</div>}

        {view === 'form' ? (
          <ItemForm item={editingItem} onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : loading ? (
          <div className="empty-state">Loading items...</div>
        ) : (
          <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>
    </div>
  )
}

export default App
