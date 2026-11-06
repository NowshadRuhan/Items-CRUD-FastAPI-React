import ItemCard from './ItemCard'

export default function ItemList({
  items,
  onEdit,
  onDelete,
  searchQuery
}) {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        {searchQuery.trim() ? (
          <p>No items found</p>
        ) : (
          <p>No items yet. Create your first item!</p>
        )}
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
