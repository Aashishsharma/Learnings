/* Queues */

// priority queue vs queue - only enqueue operation is different
// enqueue based on priority lower no. higher priority

/* Queues! */
// functions: enqueue, dequeue, size, print


const LinkedListWithTail = require('./LinkedList');

class Queue {
  constructor() {
    this.list = new LinkedListWithTail()
  }

  enqueue(val) {
    // note here we can do prepend, and in dequeue we can do removeFromEnd, but removeFromEnd is O(n)
    // so we do the opposite
    this.list.append(val);
  }

  dequeue() {
    return this.list.removeFromFront();
  }

  peek() {
    return this.list.head.value;
  }

  isEmpty() {
    return this.list.isEmpty()
  }

  size() {
    return this.list.size()
  }

  print() {
    this.list.print();
  }
}
// const queue = new Queue();
// queue.enqueue(10);
// queue.enqueue(20);
// queue.enqueue(30);

// queue.print();

// queue.dequeue();
// queue.print();

// console.log('Queue peek ', queue.peek())

module.exports = Queue;

// Queue usage
