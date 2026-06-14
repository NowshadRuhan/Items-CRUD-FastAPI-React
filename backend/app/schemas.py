from datetime import datetime

from pydantic import BaseModel, Field


class ItemBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str | None = None


class ItemCreate(ItemBase):
    pass


class ItemUpdate(ItemBase):
    pass


class ItemResponse(ItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
