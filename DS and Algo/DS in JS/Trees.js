class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

class BinarySearchTree {
	constructor() {
		this.root = null;
	}

	add(data) {
		const node = this.root; 
		if (this.root === null) {
			this = new Node(data);
		} else {
			return searchTree(node) {

			}
		}
	}
}