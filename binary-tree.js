class Node {
  constructor(data) {
    this.value = data;
    this.leftPart = null;
    this.rightPart = null;
  }
}

export class Tree {
  constructor(array) {
    this.array = removeDuplicates(mergeSort(array));
    this.root = this.buildTree(this.array, 0, this.array.length - 1);
    this.preOrderData = [];
    this.inOrderData = [];
    this.postOrderData = [];
  }

  buildTree(array, start, end) {
    //Base Case
    if (start > end) return null;

    //get the middle element and make it root
    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);

    //Recursively construct the left subtree and make it left child of root
    node.leftPart = this.buildTree(array, start, mid - 1);

    //Recursively construct the right subtree and make it right child of root
    node.rightPart = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value, root = this.root) {
    //If the tree is empty, return a new node
    if (root == null) {
      root = new Node(value);
      return root;
    }

    if (value < root.value) {
      root.leftPart = this.insert(value, root.leftPart);
    } else if (value > root.value) {
      root.rightPart = this.insert(value, root.rightPart);
    }

    return root;
  }

  delete(value, root = this.root) {
    //Base Case
    if (root == null) return root;

    if (value < root.value) {
      root.leftPart = this.delete(value, root.leftPart);
    } else if (value > root.value) {
      root.rightPart = this.delete(value, root.rightPart);
    }

    //if key is same as root's key, then This is the node to be deleted
    else {
      //node with only one child or no child
      if (root.leftPart == null) {
        return root.rightPart;
      } else if (root.rightPart == null) {
        return root.leftPart;
      }

      //node with two children: Get the inorder successor (smallest in the right subtree)
      root.value = this.minValue(root);
      //Delete the inorder successor
      root.rightPart = this.delete(root.value, root.rightPart);
    }

    return root;
  }

  minValue(root) {
    let minv = root.value;
    while (root.left != null) {
      minv = root.leftPart.value;
      root = root.leftPart;
    }

    return minv;
  }

  find(value, root = this.root) {
    //Base Cases: root is null or value is present at root
    if (root == null || root.value == value) return root;

    if (root.value < value) {
      return this.find(value, root.rightPart);
    }

    return this.find(value, root.leftPart);
  }

  levelOrder(root) {
    let queue = [];
    let result = [];

    if (root == null) return;

    queue.push(root);

    while (queue.length) {
      let current = queue.shift(root);
      result.push(current.value);
      if (current.leftPart != null) queue.push(current.leftPart);
      if (current.rightPart != null) queue.push(current.rightPart);
    }
    return result;
  }

  inOrder(root) {
    if (root != null) {
      this.inOrder(root.leftPart);
      this.inOrderData.push(root.value);
      this.inOrder(root.rightPart);
    }
  }

  preOrder(root) {
    if (root == null) return;

    this.preOrderData.push(root.value);
    this.preOrder(root.leftPart);
    this.preOrder(root.rightPart);
  }

  postOrder(root) {
    if (root == null) return;

    if (root.leftPart != null) {
      this.postOrder(root.leftPart);
    }

    if (root.rightPart != null) {
      this.postOrder(root.rightPart);
    }

    if (root.value !== undefined) {
      this.postOrderData.push(root.value);
    }
  }

  height(root) {
    if (root == null) return 0;

    let left = this.height(root.leftPart);
    let right = this.height(root.rightPart);

    return Math.max(left, right) + 1;
  }

  depth(node, root = this.root) {
    let depth = -1;

    if (node == null) return depth;

    if (
      root == node ||
      (depth = this.depth(node, root.leftPart)) >= 0 ||
      (depth = this.depth(node, root.rightPart)) >= 0
    ) {
      return depth + 1;
    }
    return depth;
  }

  isBalanced(root) {
    if (root == null) return false;

    let left = root.leftPart;
    let right = root.rightPart;

    if (Math.abs(this.height(left) - this.height(right)) > 1) {
      return false;
    } else {
      return true;
    }
  }

  rebalance() {
    if (this.isBalanced(this.root)) return this.root;

    let rebalancedTree = [];
    rebalancedTree = this.traverse(this.root, rebalancedTree);

    let balancedTree = new Tree(rebalancedTree);

    return balancedTree;
  }

  traverse(root, array) {
    if (array !== undefined) array.push(root.value);
    if (root.leftPart !== null) {
      this.traverse(root.leftPart, array);
    }

    if (root.rightPart !== null) {
      this.traverse(root.rightPart, array);
    }

    return array;
  }
}

function mergeSort(array) {
  if (array.length <= 1) return array;

  const newArr = [];

  const mid = Math.floor(array.length / 2);
  const leftArr = mergeSort(array.slice(0, mid));
  const rightArr = mergeSort(array.slice(mid));

  while (leftArr.length && rightArr.length) {
    if (leftArr[0] < rightArr[0]) {
      newArr.push(leftArr.shift());
    } else {
      newArr.push(rightArr.shift());
    }
  }

  return [...newArr, ...leftArr, ...rightArr];
}

function removeDuplicates(array) {
  return [...new Set(array)];
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.rightPart !== null) {
    prettyPrint(node.rightPart, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftPart !== null) {
    prettyPrint(node.leftPart, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 98, 18]);
