const API_BASE = '/api/items'

async function handleResponse(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.detail || `Request failed (${response.status})`)
  }
  if (response.status === 204) return null
  return response.json()
}

export async function getItems(search = '') {
  const params = new URLSearchParams()

  if (search.trim()) {
    params.append('search', search.trim())
  }

  const response = await fetch(
    `${API_BASE}?${params.toString()}`
  )

  return handleResponse(response)
}

export async function getItem(id) {
  const response = await fetch(`${API_BASE}/${id}`)
  return handleResponse(response)
}

export async function createItem(data) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function updateItem(id, data) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function deleteItem(id) {
  const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
  return handleResponse(response)
}
