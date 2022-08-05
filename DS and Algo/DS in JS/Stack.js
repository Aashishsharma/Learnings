/* Stacks! */
// functions: push, pop, peek, length


// Creates a stack
class Stack {
  stackTop = 0;
  data = {};
  // Adds a value onto the end of the stack
  push = function(value) {
    this.data[this.stackTop] = value;
    this.stackTop++;
  }
  // Removes and returns the value at the end of the stack
  pop = function() {
    if (this.stackTop === 0) {
        return undefined;
    }
    this.stackTop--;
    var result = this.data[this.stackTop];
    delete this.data[this.stackTop];
    return result;
  }   
  size = function() {
    return this.stackTop;
  }
  // Returns the value at the end of the stack
  peek = function() {
    return this.data[this.stackTop-1];
  }
}
const myStack = new Stack();
myStack.push(1);
myStack.push('freeCodeCamp');
console.log(myStack.peek());
console.log(myStack.pop());
console.log(myStack.peek());

// Stack usage
// 1. Browser history
// 2. Undo operation
// 3. Call stack in JS runtime