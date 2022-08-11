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
console.log(bfs(exBFSGraph, 1));

// Usage
// 1. Google maps
// 2. Fb/Insta to identify friends - users are vertices and connection is edge