const API_URL = "http://localhost:8000";

export async function fetchRestaurant(id) {
  const response = await fetch(`${API_URL}/restaurants/${id}`);
  if (!response.ok) throw new Error("Error fetching restaurants");
  return response.json();
}
export async function fetchRestaurants() {
  const response = await fetch(`${API_URL}/restaurants`);
  if (!response.ok) throw new Error("Error fetching restaurants");
  return response.json();
}

export async function addRestaurant({ restaurant }) {
  const response = await fetch(`${API_URL}/restaurants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(restaurant),
  });
  if (!response.ok) throw new Error("Error adding restaurant");
  return response.json();
}

export async function updateRestaurant({ id, restaurant }) {
  const response = await fetch(`${API_URL}/restaurants/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(restaurant),
  });
  if (!response.ok) throw new Error("Error updating restaurant");
  return response.json();
}

export async function deleteRestaurant(id) {
  const response = await fetch(`${API_URL}/restaurants/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting restaurant");
  return response.json();
}
