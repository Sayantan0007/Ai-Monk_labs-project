const BASE = "http://127.0.0.1:8000";

const parseResponse = async (res, errorMessage) => {
  if (!res.ok) {
    throw new Error(`${errorMessage}: ${res.status}`);
  }

  return res.json();
};

export const getTrees = async () => {
  const res = await fetch(`${BASE}/trees`);
  return parseResponse(res, "Failed to fetch trees");
};

export const createTree = async (tree) => {
  const res = await fetch(`${BASE}/trees`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tree }),
  });

  return parseResponse(res, "Failed to create tree");
};

export const updateTree = async (id, tree) => {
  const res = await fetch(`${BASE}/trees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tree }),
  });

  return parseResponse(res, "Failed to update tree");
};
