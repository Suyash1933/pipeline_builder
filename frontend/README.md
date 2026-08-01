# VectorShift Pipeline Builder

A visual drag-and-drop pipeline builder built with React and ReactFlow, backed by a Python/FastAPI server.

## Prerequisites

- **Node.js** v16+
- **Python** 3.8+
- **pip**

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs at [http://localhost:3000](http://localhost:3000).

### Backend

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

Runs at [http://localhost:8000](http://localhost:8000).

## Project Structure

```
frontend/
  src/
    nodes/
      BaseNode.js          # Reusable node abstraction component
      useNodeFields.js     # Hook for declarative field state management
      inputNode.js         # Input node
      outputNode.js        # Output node
      llmNode.js           # LLM node
      textNode.js          # Text node (dynamic sizing + variable handles)
      apiNode.js           # API Call node
      filterNode.js        # Filter node
      timerNode.js         # Timer node
      temperatureNode.js   # LLM Config node
      mergeNode.js         # Merge node
    App.js                 # Root layout
    ui.js                  # ReactFlow canvas
    toolbar.js             # Draggable node toolbar
    draggableNode.js       # Toolbar drag item
    store.js               # Zustand state (nodes, edges, CRUD)
    submit.js              # Submit button + backend integration
    index.css              # Full design system (CSS custom properties)
backend/
  main.py                  # FastAPI server with /pipelines/parse endpoint
```

## Features

### Part 1: Node Abstraction

All nodes are built on a shared `BaseNode` component that accepts a declarative config:

- **`fields`** array defines form inputs (supports `text`, `select`, `textarea`, `checkbox`, `number`, `slider`)
- **`inputs`/`outputs`** arrays define handle connections with auto-positioning
- **`children`** prop allows custom JSX for special cases
- **`useNodeFields`** hook manages field state from config, eliminating boilerplate

Nine node types are included:

| Node | Purpose | Field types used |
|---|---|---|
| Input | Data entry point | text, select |
| Output | Result endpoint | text, select |
| LLM | AI model | custom children |
| Text | Text template with variables | custom textarea |
| API Call | HTTP requests | text, select, textarea |
| Filter | Conditional data split | select, text, checkbox |
| Timer | Execution delay | number, select |
| LLM Config | AI generation params | slider, number |
| Merge | Combine multiple inputs | select, text |

### Part 2: Styling

A unified design system in `index.css` using CSS custom properties:

- Indigo primary color palette with neutral grays
- Consistent shadows, border radii, and transitions
- Styled toolbar with icon-labeled drag items
- Polished node cards with hover glow and focus rings
- Styled ReactFlow controls, minimap, handles, and edges
- Empty canvas hint when no nodes are placed

### Part 3: Text Node Logic

- **Dynamic sizing**: The Text node uses a `<textarea>` that auto-resizes height as content grows. Width scales with the longest line (220px min, 400px max).
- **Variable handles**: Typing `{{variableName}}` (valid JS identifier in double curly brackets) dynamically creates a target Handle on the left side. Variables are de-duplicated and shown as styled tags below the input.

### Part 4: Backend Integration

- **Frontend**: The Submit button reads nodes/edges from the Zustand store and sends them as JSON via `POST` to `/pipelines/parse`.
- **Backend**: The endpoint calculates `num_nodes`, `num_edges`, and `is_dag` (using Kahn's topological sort algorithm). CORS is configured for `localhost:3000`.
- **Alert**: On response, an alert displays node count, edge count, and DAG status.

### Additional Features

- **Delete nodes**: Click the X button on any node header, or select a node and press Delete/Backspace.
- **Delete edges**: Click on any edge (turns red on hover) to remove it, or select an edge and press Delete/Backspace.

## Usage

1. Drag nodes from the toolbar onto the canvas
2. Connect nodes by dragging from a right-side handle (output) to a left-side handle (input)
3. Configure node settings using the form fields
4. Click **Submit Pipeline** to analyze the pipeline
5. An alert shows: number of nodes, number of edges, and whether the pipeline is a DAG

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner.
