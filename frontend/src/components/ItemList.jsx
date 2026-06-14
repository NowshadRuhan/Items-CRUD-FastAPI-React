import ItemCard from './ItemCard'

export default function ItemList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No items yet. Create your first item!</p>
      </div>
    )
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
