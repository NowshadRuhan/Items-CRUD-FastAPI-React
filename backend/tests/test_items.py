
# 1. Test item creation

def test_create_item(client):
    response = client.post(
        "/api/items",
        json={
            "title": "Laptop",
            "description": "Dell Laptop"
        }
    )

    assert response.status_code == 201

    data = response.json()

    assert data["title"] == "Laptop"
    assert data["description"] == "Dell Laptop"
    assert data["id"] is not None


# 2. Test fetching all items

def test_get_all_items(client):

    client.post(
        "/api/items",
        json={"title": "Laptop"}
    )

    client.post(
        "/api/items",
        json={"title": "Mouse"}
    )

    response = client.get("/api/items")

    assert response.status_code == 200

    data = response.json()

    assert len(data) == 2
    assert data[0]["title"] == "Laptop"
    assert data[1]["title"] == "Mouse"


# 3. Test fetching a single item

def test_get_single_item(client):

    create_response = client.post(
        "/api/items",
        json={"title": "Keyboard"}
    )

    item_id = create_response.json()["id"]

    response = client.get(
        f"/api/items/{item_id}"
    )

    assert response.status_code == 200
    assert response.json()["title"] == "Keyboard"


# 4. Test updating an item

def test_update_item(client):

    create_response = client.post(
        "/api/items",
        json={"title": "Old Laptop"}
    )

    item_id = create_response.json()["id"]

    response = client.put(
        f"/api/items/{item_id}",
        json={
            "title": "New Laptop",
            "description": "Updated description"
        }
    )

    assert response.status_code == 200
    assert response.json()["title"] == "New Laptop"
    assert response.json()["description"] == "Updated description"


# 5. Test deleting an item

def test_delete_item(client):

    create_response = client.post(
        "/api/items",
        json={"title": "Tablet"}
    )

    item_id = create_response.json()["id"]

    response = client.delete(
        f"/api/items/{item_id}"
    )

    assert response.status_code == 204

    # Verify that the item no longer exists
    get_response = client.get(
        f"/api/items/{item_id}"
    )

    assert get_response.status_code == 404


# 6. Test invalid input

def test_create_item_invalid_input(client):

    response = client.post(
        "/api/items",
        json={
            "title": "",
            "description": "Invalid item"
        }
    )

    assert response.status_code == 422


# 7. Test fetching a non-existent item

def test_get_nonexistent_item(client):

    response = client.get("/api/items/9999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"

