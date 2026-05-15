import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { getNearbyMeals } from './meals.';
import { Meal } from './Meal';

export default function Index() {

const [meals, setMeals] = useState<Meal[]>([]);
  useEffect(() => {
    async function loadMeals() {
      const data = await getNearbyMeals();
      setMeals(data);
    }
    loadMeals();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <FlatList
        data={meals}
        renderItem={({ item }) => (
          <View style={styles.mealCard}>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Restaurant: {item.restaurantName}</Text>
            <Text style={styles.text}>Calories: {item.calories}</Text>
            <Text style={styles.text}>Protein: {item.proteinGrams}g</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  mealCard: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    width: '90%',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
