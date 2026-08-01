# 🚀 Pipeline Builder — VectorShift Frontend Assessment

A modern **visual node-based pipeline builder** built with **React**, **React Flow**, **Zustand**, and **FastAPI**. Users can drag and connect nodes on a canvas, configure node properties, and validate the resulting pipeline as a **Directed Acyclic Graph (DAG)** using a Python backend.

---

## 📸 Preview

> Add screenshots or GIFs here


| Deployed Link = https://pipeline-builder-puce.vercel.app/
| Video Demo = https://drive.google.com/file/d/1YsdqfaCsB-kRyEnelSSY6fNrzLR_1aOg/view?usp=sharing

---

## ✨ Features

### 🎯 Interactive Pipeline Editor
- Drag & drop nodes from a categorized toolbar
- Connect nodes using React Flow handles
- Delete nodes with a single click
- Live edge creation and validation
- Zoom, pan, MiniMap, and controls

### 🧩 Reusable Node Architecture
- Generic `BaseNode` component
- Declarative field configuration
- Shared field management using custom hooks
- Easily extensible for new node types

### 🎨 Modern UI
- Color-coded node types
- Glassmorphism UI
- Responsive layout
- Animated interactions
- Custom modal dialogs
- Dot-grid canvas background
- Beautiful toolbar organization

### 📝 Smart Text Node
- Auto-resizing textarea
- Dynamic node width
- Automatic variable detection
- Creates input handles from template variables

Example:

```text
Hello {{ name }}, your order {{ orderId }} is ready.
```

Automatically generates input handles for:

- `name`
- `orderId`

### 🔗 Backend Validation
- Sends pipeline JSON to FastAPI
- Counts nodes and edges
- Detects whether the graph is a DAG
- Returns validation results in a styled modal

---

# Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React 18 |
| Graph Engine | React Flow |
| State Management | Zustand |
| Styling | CSS Custom Properties |
| Backend | FastAPI |
| Validation | Pydantic |
| Graph Algorithm | Kahn's Algorithm |

---

# Project Structure

```text
pipeline_builder/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── src/
│   │
│   ├── nodes/
│   │   ├── BaseNode.js
│   │   ├── useNodeFields.js
│   │   ├── inputNode.js
│   │   ├── outputNode.js
│   │   ├── llmNode.js
│   │   ├── textNode.js
│   │   ├── apiNode.js
│   │   ├── filterNode.js
│   │   ├── timerNode.js
│   │   ├── temperatureNode.js
│   │   └── mergeNode.js
│   │
│   ├── App.js
│   ├── store.js
│   ├── ui.js
│   ├── toolbar.js
│   ├── draggableNode.js
│   ├── submit.js
│   └── index.css
│
└── README.md
```

---

# Available Node Types

| Category | Nodes |
|-----------|-------|
| Input / Output | Input, Output |
| AI | LLM |
| Processing | Text, API Call, Filter, Merge |
| Configuration | Timer, Temperature |

---

# Installation

## Prerequisites

- Node.js 16+
- Python 3.8+
- npm
- pip

---

## Clone Repository

```bash
git clone https://github.com/yourusername/pipeline_builder.git

cd pipeline_builder
```

---

# Backend Setup

```bash
cd backend

pip install fastapi uvicorn pydantic

uvicorn main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend runs at

```
http://localhost:3000
```

> **Note:** Both frontend and backend must be running simultaneously for pipeline validation.

---

# API

## POST `/pipelines/parse`

Validates the pipeline.

### Request

```json
{
  "nodes": [...],
  "edges": [...]
}
```

### Response

```json
{
  "num_nodes": 7,
  "num_edges": 6,
  "is_dag": true
}
```

---

# Assessment Breakdown

## Part 1 — Node Abstraction

The original starter nodes contained significant duplicated code.

A reusable abstraction was introduced through:

### `BaseNode.js`

Responsible for:

- Node header
- Icons
- Delete button
- Handle positioning
- Hover labels
- Dynamic form rendering

Supported field types:

- Text
- Number
- Select
- Textarea
- Checkbox
- Slider

### `useNodeFields.js`

Custom hook that:

- Initializes field state
- Synchronizes data with Zustand
- Reduces repetitive logic across nodes

Creating a new node now requires only a configuration object.

Example:

```jsx
const fields = [
  {
    name: "url",
    type: "text",
    label: "URL",
    defaultValue: ""
  },
  {
    name: "method",
    type: "select",
    options: ["GET", "POST"]
  }
];
```

Five new reusable nodes were implemented:

- API Call
- Filter
- Timer
- Temperature
- Merge

---

## Part 2 — UI & Styling

Implemented a complete design system using CSS custom properties.

Features include:

- Color-coded node themes
- Categorized toolbar
- Animated hover effects
- Glassmorphism controls
- Floating empty state
- Shimmer submit button
- Modern modal
- Custom scrollbars
- Responsive spacing
- Dot-grid workspace

---

## Part 3 — Dynamic Text Node

The Text node automatically:

- Expands vertically as content grows
- Resizes width based on the longest line
- Detects template variables

Regex used:

```regex
/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g
```

Input:

```text
Hello {{user}}, your order {{orderId}} is ready.
```

Produces:

- Input handle → `user`
- Input handle → `orderId`

Variable badges are also displayed below the textarea.

---

## Part 4 — Backend Integration

### Frontend

- Sends nodes and edges to FastAPI
- Displays loading state
- Shows validation modal
- Handles API errors gracefully

### Backend

Uses **Kahn's Algorithm** for DAG detection.

Steps:

1. Build adjacency list
2. Calculate indegree
3. Perform BFS topological sort
4. If all nodes are visited → graph is a DAG

Time Complexity:

```
O(V + E)
```

---

# Design Decisions

### Why Zustand?

- Lightweight
- Minimal boilerplate
- Ideal for centralized React state

### Why React Flow?

- Industry-standard graph editor
- Rich interaction support
- Excellent developer experience

### Why CSS Custom Properties?

- Zero runtime cost
- Easy theming
- Centralized design system
- Better maintainability

### Why Declarative Nodes?

Nodes are defined as configuration rather than custom implementations.

Benefits:

- Reusable
- Extensible
- Less duplication
- Easier maintenance

### Why Kahn's Algorithm?

- Linear time complexity
- Efficient cycle detection
- Well-suited for pipeline validation

---

# Future Improvements

- Undo / Redo
- Pipeline export/import
- Auto layout using Dagre
- Node search
- Keyboard shortcuts
- Edge labels
- Validation errors on individual nodes
- Multiple pipeline tabs
- Save pipelines to database
- Authentication
- Dark / Light themes

---

# Author

**Suyash Mishra**

- GitHub: https://github.com/yourusername
- Portfolio: https://portfolio-suyashh.vercel.app/

---

## License

This project was developed as part of the **VectorShift Frontend Assessment** and is intended for educational and demonstration purposes.
