import { useState } from "react";
import TagView from "./components/TagView";
import "./App.css";
import { exportTree } from "./api/api";
const initialTree = {
  name: "root",
  children: [
    {
      name: "child1",
      children: [
        { name: "child1-child1", data: "c1-c1 Hello" },
        { name: "child1-child2", data: "c1-c2 JS" },
      ],
    },
    { name: "child2", data: "c2 World" },
  ],
};

export default function App() {
  const [tree, setTree] = useState(initialTree);
  const [exported, setExported] = useState("");

  // Remove undefined fields
  const cleanTree = (node) => {
    const newNode = { name: node.name };

    if (node.data) newNode.data = node.data;

    if (node.children) {
      newNode.children = node.children.map(cleanTree);
    }

    return newNode;
  };

  const handleExport = async () => {
    const cleaned = cleanTree(tree);
    const json = JSON.stringify(cleaned, null, 2);

    setExported(json);

    try {
      await exportTree(cleaned);
    } catch (err) {
      console.error("Error saving tree:", err);
    }
  };

  return (
    <div className="p-4">
      <TagView node={tree} onChange={setTree} />

      <button
        onClick={handleExport}
        className="mt-4 bg-gray-300 px-4 py-2 rounded"
      >
        Export
      </button>

      {exported && <pre className="mt-4 bg-gray-100 p-2">{exported}</pre>}
    </div>
  );
}
