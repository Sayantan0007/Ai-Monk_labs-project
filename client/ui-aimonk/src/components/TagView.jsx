import { useState } from "react";

export default function TagView({ node, onChange }) {
  const [collapsed, setCollapsed] = useState(false);
  const [editing, setEditing] = useState(false);

  const updateNode = (updated) => {
    onChange(updated);
  };

  // Add Child Logic
  const handleAddChild = () => {
    if (node.data) {
      updateNode({
        ...node,
        children: [{ name: "New Child", data: "Data" }],
        data: undefined,
      });
    } else {
      updateNode({
        ...node,
        children: [
          ...(node.children || []),
          { name: "New Child", data: "Data" },
        ],
      });
    }
  };

  // Update Data
  const handleDataChange = (val) => {
    updateNode({ ...node, data: val });
  };

  const handleNameChange = (value) => {
    updateNode({ ...node, name: value || "Untitled" });
  };

  // Update Child
  const handleChildChange = (index, child) => {
    const updatedChildren = [...node.children];
    updatedChildren[index] = child;
    updateNode({ ...node, children: updatedChildren });
  };

  return (
    <div className="border-2 border-blue-400 rounded-md m-2">
      {/* HEADER */}
      <div className="bg-blue-400 text-white flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="bg-gray-200 text-black px-2 rounded"
          >
            {collapsed ? ">" : "v"}
          </button>

          {editing ? (
            <input
              autoFocus
              defaultValue={node.name}
              className="text-black px-1"
              onBlur={(e) => {
                handleNameChange(e.target.value);
                setEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleNameChange(e.target.value);
                  setEditing(false);
                }
              }}
            />
          ) : (
            <span className="cursor-pointer" onClick={() => setEditing(true)}>
              {node.name}
            </span>
          )}
        </div>

        <button
          onClick={handleAddChild}
          className="bg-gray-200 text-black px-2 py-1 rounded"
        >
          Add Child
        </button>
      </div>

      {/* BODY */}
      {!collapsed && (
        <div className="p-2 ml-4">
          {/* Data */}
          {!node.children && (
            <div className="mb-2">
              <span className="mr-2">Data</span>
              <input
                value={node.data ?? ""}
                onChange={(e) => handleDataChange(e.target.value)}
                className="border px-2 py-1"
              />
            </div>
          )}

          {/* Children */}
          {node.children &&
            node.children.map((child, index) => (
              <TagView
                key={index}
                node={child}
                onChange={(updated) => handleChildChange(index, updated)}
              />
            ))}
        </div>
      )}
    </div>
  );
}
