/* Graphs: Breadth-first search */
// BFS finds distance of each node from the target node
// 2 ways to represent the graph
// 1. Adjacency Matrix
var exBFSGraph = [
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 0, 0]
];

// 2. Adjacenct List
// instead of arrays, it can be - Map as key, val pair
// Map(Vertex<String>, edgeTo<LinkedList>)
const adjList = {
  'A': ['B', 'C', 'D'],
  'B': ['A', 'D'],
  'C': ['A'],
  'D': ['A', 'B']
}

///////////////////////////////////////////// GRAPH IMPL USING ADJACENCY LIST /////////////////////////////////

// method to watch out for - removeEdge / remove vertices

class Graph {
  constructor() {
    this.adjacencyList = {}
  }

  // vertex is just a string
  addVertex(vertex) {
    if(!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = new Set();
    }
  }

  addEdge(vertex1, vertex2) {
    // add vertices if not present
    if(!this.adjacencyList[vertex1]) {
      this.addVertex(vertex1)
    }
    if(!this.adjacencyList[vertex2]) {
      this.addVertex(vertex2)
    }

    // since this is undirected graph, add entry to both the vertex keys in adjacency list
    this.adjacencyList[vertex1].add(vertex2);
    this.adjacencyList[vertex2].add(vertex1) 
  }

  display() {
    // since AdjList is an obj, we use for in loop to iterate over it keys
    for(let vertex in this.adjacencyList) {
      console.log(vertex + ' -> ' + [...this.adjacencyList[vertex]])
    }
  }

  hasEdge(vertex1, vertex2) {
    if(this.adjacencyList[vertex1].has(vertex2) && this.adjacencyList[vertex2].has(vertex1)) 
      return true;
    return false;
  }

  removeEdge(vertex1, vertex2) {
    if(!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return; 
    } else {
      this.adjacencyList[vertex1].delete(vertex2);
      this.adjacencyList[vertex2].delete(vertex1);
    }
  }

  // before removing vertex, we will have to remove, all of it's edges from other vertices
  removeVertex(vertex) {
    if(!this.adjacencyList[vertex]) {
      return;
    } else {
      // remove entry of that vertx from all of the linked vertices
      [...this.adjacencyList[vertex]].forEach((adjacentVertex) => {
        this.removeEdge(vertex, adjacentVertex);
      });

      // remove the vertex, since adjacencyList is an obj
      delete this.adjacencyList[vertex];
    }
  }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');

graph.addEdge('A', 'B');
graph.addEdge('B', 'C');

graph.display();

console.log(graph.hasEdge('A', 'C'));

console.log('----------------removing edge -------------')
graph.removeEdge('A', 'B');
graph.display();

console.log('----------------removing vertex -------------')
graph.removeVertex('B');
graph.display();
// Usage
// 1. Google maps
// 2. Fb/Insta to identify friends - users are vertices and connection is edge

//////////////////////////////////////////// yet to implement //////////////////////////////////
// 1. DFS, BFS
// 2. Prims / Kruskals algo