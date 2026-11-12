from datetime import datetime

from sqlalchemy.orm import Session

from . import models, schemas



def get_items(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    search: str = "",
    sort_by: str = "title",
    sort_order: str = "asc"
):
    query = db.query(models.Item)

    # Apply search filter
    if search.strip():
        query = query.filter(
            models.Item.title.ilike(f"%{search.strip()}%")
        )

    # Validate sorting parameters
    if sort_by not in ["title", "created_at"]:
        sort_by = "title"

    if sort_order not in ["asc", "desc"]:
        sort_order = "asc"

    # Select the database column
    sort_column = (
        models.Item.title
        if sort_by == "title"
        else models.Item.created_at
    )

    # Apply ascending or descending order
    if sort_order == "asc":
        query = query.order_by(sort_column.asc())
    else:
        query = query.order_by(sort_column.desc())

    return query.offset(skip).limit(limit).all()


def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(
        models.Item.id == item_id
    ).first()


def create_item(db: Session, item: schemas.ItemCreate):
    now = datetime.utcnow()
    db_item = models.Item(
        title=item.title,
        description=item.description,
        created_at=now,
        updated_at=now,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def update_item(db: Session, item_id: int, item: schemas.ItemUpdate):
    db_item = get_item(db, item_id)

    if not db_item:
        return None

    db_item.title = item.title
    db_item.description = item.description
    db_item.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(db_item)

    return db_item




def delete_item(db: Session, item_id: int):
    db_item = get_item(db, item_id)

    if not db_item:
        return False

    db.delete(db_item)
    db.commit()

    return True
