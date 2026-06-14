# Items CRUD — FastAPI + React

A full-stack CRUD application for managing items. Built with **FastAPI** (Python) on the backend and **React + Vite** on the frontend, backed by **SQLite** for persistent storage.

![Python](https://img.shields.io/badge/Python-3.10+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-green)
![React](https://img.shields.io/badge/React-19-61dafb)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

- **Create** — Add new items with a title and optional description
- **Read** — List all items or fetch a single item by ID
- **Update / Edit** — Modify existing items
- **Delete** — Remove items with confirmation
- **REST API** — Auto-generated Swagger UI at `/docs`
- **React UI** — Clean interface for all CRUD operations
- **Single-port deployment** — FastAPI serves both API and built frontend

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Backend    | FastAPI, SQLAlchemy, Pydantic       |
| Frontend   | React 19, Vite                      |
| Database   | SQLite                              |
| Server     | Uvicorn                             |

## Project Structure

```
Items-CRUD-FastAPI-React/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI app entry point
│   │   ├── database.py       # SQLite connection & session
│   │   ├── models.py         # SQLAlchemy Item model
│   │   ├── schemas.py        # Pydantic request/response schemas
│   │   ├── crud.py           # Database CRUD operations
│   │   └── routers/
│   │       └── items.py      # REST API routes
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app component
│   │   ├── api/items.js      # API client
│   │   └── components/
│   │       ├── ItemList.jsx
│   │       ├── ItemForm.jsx
│   │       └── ItemCard.jsx
│   ├── vite.config.js
│   └── package.json
├── scripts/
│   └── run.sh                # Build frontend & start on port 80
└── README.md
```

## Data Model

| Field         | Type     | Description                    |
|---------------|----------|--------------------------------|
| `id`          | integer  | Primary key (auto-increment)   |
| `title`       | string   | Required, max 200 characters   |
| `description` | string   | Optional                       |
| `created_at`  | datetime | Set automatically on create    |
| `updated_at`  | datetime | Updated on every edit          |

## API Endpoints

Base URL: `/api/items`

| Method   | Endpoint            | Description       | Status Codes   |
|----------|---------------------|-------------------|----------------|
| `POST`   | `/api/items`        | Create a new item | 201, 422       |
| `GET`    | `/api/items`        | List all items    | 200            |
| `GET`    | `/api/items/{id}`   | Get item by ID    | 200, 404       |
| `PUT`    | `/api/items/{id}`   | Update an item    | 200, 404, 422  |
| `DELETE` | `/api/items/{id}`   | Delete an item    | 204, 404       |

### Example Requests

**Create an item:**

```bash
curl -X POST http://localhost:8080/api/items \
  -H "Content-Type: application/json" \
  -d '{"title": "My Item", "description": "Optional description"}'
```

**List all items:**

```bash
curl http://localhost:8080/api/items
```

**Update an item:**

```bash
curl -X PUT http://localhost:8080/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title", "description": "New description"}'
```

**Delete an item:**

```bash
curl -X DELETE http://localhost:8080/api/items/1
```

## Prerequisites

- **Python 3.10+**
- **Node.js 18+** and npm
- **pip** (Python package manager)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/NowshadRuhan/Items-CRUD-FastAPI-React.git
cd Items-CRUD-FastAPI-React
```

### 2. Backend setup

```bash
cd backend
pip install -r requirements.txt
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

## Running the Application

### Development mode (recommended for local work)

Run backend and frontend in separate terminals for hot reload:

**Terminal 1 — Backend:**

```bash
cd backend
uvicorn app.main:app --reload --host 127.0.0.1 --port 8080
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm run dev
```

| Service       | URL                              |
|---------------|----------------------------------|
| React UI      | http://localhost:5173            |
| REST API      | http://localhost:8080/api/items  |
| Swagger docs  | http://localhost:8080/docs       |

The Vite dev server proxies `/api` requests to the backend on port 8080.

### Production mode (single port)

Build the frontend and serve everything from FastAPI:

```bash
cd frontend && npm run build
cd ../backend
uvicorn app.main:app --host 0.0.0.0 --port 8080
```

Open http://localhost:8080 — FastAPI serves the React app at `/` and the API at `/api/*`.

### Port 80 deployment

```bash
chmod +x scripts/run.sh
./scripts/run.sh
```

> **Note:** Port 80 requires `sudo` on macOS and Linux. You will be prompted for your password.

## Frontend UI

The React app provides:

- **Item list** — View all items with created/updated timestamps
- **Create form** — Add new items via the "+ New Item" button
- **Edit form** — Click "Edit" on any item to modify it
- **Delete** — Click "Delete" with a confirmation prompt

## Environment Notes

- The SQLite database file (`backend/items.db`) is created automatically on first run.
- `frontend/dist/` is gitignored — run `npm run build` before production deployment.
- CORS is enabled for `localhost:5173` during development.

## License

MIT
