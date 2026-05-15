export async function getNearbyMeals() {
  const response = await fetch("http://localhost:5000/api/meals/nearby?lat=43.6481&lng=-79.3854&radiusMeters=1000");
  if (!response.ok) {
    throw new Error("Failed to fetch nearby meals");
  }
  const data = await response.json();
console.log("Fetched nearby meals:", data);
  return data;
}