import { describe, expect, it } from "vitest";

import { Tree } from "./binary-tree";

describe("Creating a Binary Search Tree", () => {
  const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 98, 18]);
  it("Should create a Binary Tree", () => {
    expect(tree.root).toMatchObject({
      value: 8,
      leftPart: {
        value: 4,
        leftPart: {
          value: 1,
          leftPart: null,
          rightPart: {
            value: 3,
            leftPart: null,
            rightPart: null,
          },
        },
        rightPart: {
          value: 5,
          leftPart: null,
          rightPart: {
            value: 7,
            leftPart: null,
            rightPart: null,
          },
        },
      },
      rightPart: {
        value: 23,
        leftPart: {
          value: 9,
          leftPart: null,
          rightPart: {
            value: 18,
            leftPart: null,
            rightPart: null,
          },
        },
        rightPart: {
          value: 67,
          leftPart: null,
          rightPart: {
            value: 98,
            leftPart: null,
            rightPart: null,
          },
        },
      },
    });
  });
  it("Root value should be 8", () => {
    expect(tree.root.value).toBe(8);
  });

  describe("Methods of the Tree", () => {
    it("Should insert a new Node", () => {
      tree.insert(50);
      expect(tree.find(50)).toMatchObject({
        value: 50,
        leftPart: null,
        rightPart: null,
      });
    });

    it("Should delete a Node", () => {
      tree.delete(50);
      expect(tree.find(50)).toBe(null);
    });

    it("Should return an array in a levelOrder", () => {
      expect(tree.levelOrder(tree.root)).toEqual([
        8, 4, 23, 1, 5, 9, 67, 3, 7, 18, 98,
      ]);
    });

    describe("Preorder, InOrder, PostOrder", () => {
      it("should return an array in a pre order <value><left><right>", () => {
        tree.preOrder(tree.root);
        expect(tree.preOrderData).toEqual([
          8, 4, 1, 3, 5, 7, 23, 9, 18, 67, 98,
        ]);
      });

      it("should return an array in order <left><value><right>", () => {
        tree.inOrder(tree.root);
        expect(tree.inOrderData).toEqual([1, 3, 4, 5, 7, 8, 9, 18, 23, 67, 98]);
      });

      it("should return an array in a post order <left><right><value>", () => {
        tree.postOrder(tree.root);
        expect(tree.postOrderData).toEqual([
          3, 1, 7, 5, 4, 18, 9, 98, 67, 23, 8,
        ]);
      });
    });

    it("Should return the height of a tree", () => {
      expect(tree.height(tree.root)).toBe(4);
    });

    it("Should return depth of root's tree equal to 0", () => {
      expect(tree.depth(tree.root)).toBe(0);
    });

    it("depth of root's child should be equal to 1", () => {
      expect(tree.depth(tree.root.leftPart)).toBe(1);
    });

    it("depth of root's child child should be equal to 1", () => {
      expect(tree.depth(tree.root.leftPart.leftPart)).toBe(2);
    });

    describe("isBalance method", () => {
      it("tree should be balanced", () => {
        expect(tree.isBalanced(tree.root)).toBeTruthy();
      });

      it("tree should NOT be balanced", () => {
        tree.insert(130);
        tree.insert(160);
        tree.insert(1350);

        expect(tree.isBalanced(tree.root)).toBeFalsy();
      });
    });

    it("should rebalance the tree", () => {
      let newTree = tree.rebalance();
      expect(newTree.root.value).toBe(9);
    });
  });
});
