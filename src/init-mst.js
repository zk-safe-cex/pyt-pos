// import library for smt
// Create a file from the tree and store it somewhere
const { IncrementalMerkleSumTree } = require("ts-merkle-sum-tree");
const { poseidon } = require("circomlibjs");
const fs = require("fs");

function initMST(entries, pathToTree, treeHeight) {
  // Create tree and insert 10 leaves
  let tree = new IncrementalMerkleSumTree(poseidon, treeHeight); // Binary tree with height = treeHeight and poseidon hash function

  // add the entries to the tree
  for (let i = 0; i < entries.length; i++) {
    tree.insert(BigInt(entries[i].userID), BigInt(entries[i].balance));
  }

  fs.writeFileSync(
    pathToTree,
    JSON.stringify(tree, (_, v) => (typeof v === "bigint" ? v.toString() : v))
  );
}

module.exports = initMST;
