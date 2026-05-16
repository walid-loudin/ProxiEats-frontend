export const getNearbyMealsFromApiAsync = async () => {
  try {
    const response = await fetch(
      'http://localhost:5000/api/meals/nearby?lat=43.6481&lng=-79.3854&radiusMeters=1000',
    );
    const json = await response.json();
    
    return json.meals;
  } catch (error) {
    console.error(error);
  }
};