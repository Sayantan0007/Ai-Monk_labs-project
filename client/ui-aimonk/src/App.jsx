import { useEffect, useState } from "react";
import TagView from "./components/TagView";
import "./App.css";
import { createTree, getTrees, updateTree } from "./api/api";

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

const cloneTree = (value) => JSON.parse(JSON.stringify(value));

export default function App() {
  const [tree, setTree] = useState(initialTree);
  const [treeId, setTreeId] = useState(null);
  const [savedTrees, setSavedTrees] = useState([]);
  const [exported, setExported] = useState("");
  const [status, setStatus] = useState("Loading saved trees...");

  useEffect(() => {
    const loadTrees = async () => {
      try {
        const trees = await getTrees();
        setSavedTrees(trees);

        if (trees.length > 0) {
          setTreeId(trees[0].id);
          setTree(cloneTree(trees[0].tree));
          setExported(JSON.stringify(trees[0].tree, null, 2));
          setStatus("Loaded saved trees.");
        } else {
          setStatus("No saved trees yet. Edit the sample tree and export it.");
        }
      } catch (err) {
        console.error("Error loading trees:", err);
        setStatus("Could not load saved trees. Using sample data.");
      }
    };

    loadTrees();
  }, []);

  // Remove undefined fields
  const cleanTree = (node) => {
    const newNode = { name: node.name };

    if (node.children) {
      newNode.children = node.children.map(cleanTree);
    } else if ("data" in node) {
      newNode.data = node.data ?? "";
    }

    return newNode;
  };

  const handleSelectTree = (savedTree) => {
    setTreeId(savedTree.id);
    setTree(cloneTree(savedTree.tree));
    setExported(JSON.stringify(savedTree.tree, null, 2));
    setStatus(`Loaded tree #${savedTree.id}.`);
  };

  const handleNewTree = () => {
    setTreeId(null);
    setTree(cloneTree(initialTree));
    setExported("");
    setStatus("Editing a new tree.");
  };

  const handleExport = async () => {
    const cleaned = cleanTree(tree);
    const json = JSON.stringify(cleaned, null, 2);

    setExported(json);

    try {
      const saved = treeId
        ? await updateTree(treeId, cleaned)
        : await createTree(cleaned);

      setTreeId(saved.id);
      setSavedTrees((currentTrees) => {
        const otherTrees = currentTrees.filter(
          (savedTree) => savedTree.id !== saved.id,
        );

        return [...otherTrees, saved];
      });
      setStatus(
        treeId
          ? `Updated tree #${saved.id} successfully.`
          : `Created tree #${saved.id} successfully.`,
      );
    } catch (err) {
      console.error("Error saving tree:", err);
      setStatus("Saving failed. Check the backend connection and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Saved Trees</h2>
            <button
              onClick={handleNewTree}
              className="rounded bg-slate-800 px-3 py-1 text-sm text-white"
            >
              New Tree
            </button>
          </div>

          <p className="mb-3 text-sm text-slate-600">{status}</p>

          <div className="space-y-2">
            {savedTrees.length === 0 ? (
              <p className="text-sm text-slate-500">No trees saved yet.</p>
            ) : (
              savedTrees
                .slice()
                .sort((a, b) => a.id - b.id)
                .map((savedTree) => (
                  <button
                    key={savedTree.id}
                    onClick={() => handleSelectTree(savedTree)}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${
                      treeId === savedTree.id
                        ? "border-blue-500 bg-blue-50 text-blue-900"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="font-medium">{savedTree.tree.name}</div>
                    <div className="text-xs text-slate-500">
                      Tree ID: {savedTree.id}
                    </div>
                  </button>
                ))
            )}
          </div>
        </aside>

        <main className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Nested Tag Tree Editor</h1>
            <span className="text-sm text-slate-500">
              {treeId ? `Editing tree #${treeId}` : "Unsaved tree"}
            </span>
          </div>

          <TagView node={tree} onChange={setTree} />

          <button
            onClick={handleExport}
            className="mt-4 rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            {treeId ? "Update Tree" : "Export & Save Tree"}
          </button>

          {exported && (
            <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-100 p-3 text-sm">
              {exported}
            </pre>
          )}
        </main>
      </div>
    </div>
  );
}
