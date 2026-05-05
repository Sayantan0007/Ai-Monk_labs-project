const BASE = "http://127.0.0.1:8000";

export const getTrees = async () => {
  const res = await fetch(`${BASE}/trees`);
  return res.json();
};

export const createTree = async (tree) => {
  return fetch(`${BASE}/trees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tree }),
  });
};

export const updateTree = async (id, tree) => {
  return fetch(`${BASE}/trees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tree }),
  });
};

export const exportTree = async (tree) => {
  const res = await fetch(`${BASE}/trees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tree }),
  });

  if (!res.ok) {
    throw new Error(`Failed to export tree: ${res.status}`);
  }

  return res.json();
};
