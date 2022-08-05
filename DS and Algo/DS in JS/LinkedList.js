/* LinkedList */

// Linked List data structure
// 1. Node which is an class, which has data and pointer to next node
// 2. Linked list - class which has a head - pointing to beginning of linked list and size

//methods
// note below methods take value as arg and not the node
// 1. isEmpty, prepend, append,

class Node {
  constructor(value) {
    this.value = value;
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0
  }

  isEmpty() {
    return this.size === 0
  }

  getSize() {
    return this.size
  }

  // O(1)
  prepend(value) {
    const node = new Node(value);
    if(this.isEmpty()) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  // O(n), to make it O(1) keep reference of the tail node, similar to that of head
  append(value) {
    const node = new Node(value);
    if(this.isEmpty()) {
      this.head = node;
    } else {
      let pointer = this.head;
      while(pointer.next) {
        pointer = pointer.next;
      }
      pointer.next = node;
    }
    this.size++;
  }

  insert(value, index) {
    if(index < 0 || index > this.size) {
      console.log('Invalid index val');
      return;
    }
    if(index === 0) {
      this.prepend(value); 
      return;
    } 
    if(index === this.size) {
      this.append(value);
      return;
    }
    let currentNode = this.head;
    const node = new Node(value);
    for(let i=0; i<index-1; i++) {
      currentNode = currentNode.next;
    }
    node.next = currentNode.next;
    currentNode.next = node;
    this.size++;
  }

  // note remove can also take node value, in this case, we need to check each node value while traversing
  remove(index) {
    if(index < 0 || index > this.size) {
      console.log('invalid index');
      return;
    }
    let removedNode;
    if(index === 0) {
      removedNode = this.head;
      this.head = this.head.next;
      this.size--;
      return removedNode.value;
    }
    let currentNode = this.head;
    for(let i=0; i<index-1; i++) {
      currentNode = currentNode.next;
    }
    removedNode = currentNode.next;
    currentNode.next = removedNode.next
    this.size--;
    return removedNode.value

  }

  // -1 if val not found or index pos of node where val found
  search(value) {
    let currentNode = this.head;
    let pos = 0;
    while(currentNode) {
      if(currentNode.value === value) {
        return pos;
      }
      pos++;
      currentNode = currentNode.next;
    }
    return -1;

  }
  print() {
    let currentNode = this.head
    while(currentNode) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }

}

var myLL = new LinkedList();
myLL.append(123);
myLL.prepend(222);
myLL.insert(333, 1)
myLL.insert(444, 1)
//myLL.remove(1);
myLL.print();
console.log(myLL.search(333))

/////////////////////////////////// ALGORITHMS //////////////////////////////////////////////

//1. Reverse a linkedList

