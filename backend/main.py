import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from collections import defaultdict

app = FastAPI()

# Allow frontend origins — set ALLOWED_ORIGINS env var in production
_raw = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000")
origins = [o.strip() for o in _raw.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: Optional[str] = None
    data: Optional[dict] = None
    position: Optional[dict] = None


class Edge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None


class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """Check if the graph is a DAG using Kahn's algorithm (topological sort)."""
    node_ids = {n.id for n in nodes}
    adj = defaultdict(list)
    in_degree = defaultdict(int)

    for nid in node_ids:
        in_degree[nid] = 0

    for e in edges:
        adj[e.source].append(e.target)
        in_degree[e.target] += 1

    queue = [nid for nid in node_ids if in_degree[nid] == 0]
    visited = 0

    while queue:
        current = queue.pop(0)
        visited += 1
        for neighbor in adj[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': dag}
