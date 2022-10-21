import { Tree, prettyPrint } from "./binary-tree.js";

function randomArray() {
  return Array.from({ length: 21 }, () => Math.floor(Math.random() * 50));
}

(() => {
  let tree = new Tree(randomArray());

  console.log(`Is tree balanced? ${tree.isBalanced(tree.root)}`);
  console.log(`LevelOrder: ${tree.levelOrder(tree.root)}`);

  tree.postOrder(tree.root);
  tree.preOrder(tree.root);
  tree.inOrder(tree.root);

  console.log(`PreOrder: ${tree.preOrderData}`);
  console.log(`PostOrder:  ${tree.postOrderData}`);
  console.log(`InOrder:  ${tree.inOrderData}`);

  tree.insert(150);
  tree.insert(250);
  tree.insert(4550);
  tree.insert(560);
  tree.insert(120);
  tree.insert(100);

  console.log(`Balanced:  ${tree.isBalanced(tree.root)}`);

  tree = tree.rebalance();

  console.log(`Balanced:  ${tree.isBalanced(tree.root)}`);

  tree.postOrder(tree.root);
  tree.preOrder(tree.root);
  tree.inOrder(tree.root);

  console.log(`PreOrder: ${tree.preOrderData}`);
  console.log(`PostOrder:  ${tree.postOrderData}`);
  console.log(`InOrder:  ${tree.inOrderData}`);
  console.log("\n");

  prettyPrint(tree.root);
})();
