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

const Queue = require('./Queue');
const Stack = require('./Stack'); 

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

  // 1. Start from any vertex, put the frst vertex in queue
  // 2. dequeu (and mark the dequed vertex as visited) 
  // and put all the adjacent vertex (which are not visited yet) of the current vertex to queue
  // 3. repeat step 2 while queue is not empty
  bfsSearch(startingVertex) {
    console.log('BFS search -> ')
    const queue = new Queue();
    const visitedVertex = [];
    if(!this.adjacencyList[startingVertex])
      return;
    queue.enqueue(startingVertex);
    while(!queue.isEmpty()) {
      const currentVertex = queue.dequeue();
      console.log(`${currentVertex}, `);
      
      [...this.adjacencyList[currentVertex]].forEach((vertex) => {
        if(visitedVertex.includes(vertex))
          return;
        queue.enqueue(vertex);
      });
      visitedVertex.push(currentVertex);
      
    }
  }

  // 1. Start from any vertex and push frst vertex to stack
  // 2. pop from stack, call it current vertex, if current vertex has adjacent which is not visited
  // print & push current vertex to stack and use the frst adjacent vertex as current vertx
  // if current vertex adjacent is visited, check if curr vertex has another adjacent which is not visited
  // when no adjacent found, pop from stack
  // 3. repeat step 2 until stack not empty
  dfsSearch(startingVertex) {
    console.log('DFS search -> ')
    const visitedVertex = [];
    if(!this.adjacencyList[startingVertex])
      return;
    let me = this;
    const dfs = function(currentVertex, me) {
      if(!currentVertex)
        return;
      visitedVertex.push(currentVertex);
      console.log(currentVertex);

      const newCurrent = me.adjacencyList[currentVertex][0];
      let i = 0;
      for(let item of me.adjacencyList[currentVertex]) {
        if(visitedVertex.includes(item)) {
          i++;
          continue;
        } else {
          dfs(item, me)
        } 
      }   
      
    }
    dfs(startingVertex, me);
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
//graph.removeEdge('A', 'B');
graph.display();

console.log('----------------removing vertex -------------')
//graph.removeVertex('B');
graph.display();

graph.bfsSearch('A');
graph.dfsSearch('A');
// Usage
// 1. Google maps
// 2. Fb/Insta to identify friends - users are vertices and connection is edge

//////////////////////////////////////////// yet to implement //////////////////////////////////
// 1. DFS, BFS
// 2. Prims / Kruskals algo