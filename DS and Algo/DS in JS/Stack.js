/* Stacks! */
// functions: push, pop, peek, length


const LinkedListWithTail = require('./LinkedList');

class Stack {
  constructor() {
    this.list = new LinkedListWithTail()
  }

  push(val) {
    this.list.prepend(val);
  }

  pop() {
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
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

stack.print();

stack.pop();
stack.print();

console.log('Stack peek ', stack.peek())

// Stack usage
// 1. Browser history
// 2. Undo operation
// 3. Call stack in JS runtime