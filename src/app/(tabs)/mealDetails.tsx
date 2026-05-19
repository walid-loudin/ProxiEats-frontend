import { getNearbyMealDetailsFromApiAsync } from '@/src/apis/httpRequests';
import { MealDetail } from '@/src/types/MealDetail';
import { useLocalSearchParams } from 'expo-router';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { useEffect, useState } from 'react';

export default function MealDetails() {
const { id } = useLocalSearchParams();
const mealId = parseInt(id as string, 10);
const [isLoading, setLoading] = useState(true);
const [meals, setMeals] = useState<MealDetail | null>(null);

  useEffect(() => {
    async function loadMeals() {
      try { 
      const data = await getNearbyMealDetailsFromApiAsync(mealId);
      setMeals(data);
    } catch (error) {
      console.error(error);
    }   finally {
      setLoading(false);
    }}
    loadMeals();

  }, [mealId]);
  return (

    <View style={styles.container}>           
    {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.text}>{meals?.name}</Text>
          <Text style={styles.text}>{meals?.price}</Text>
          <Text style={styles.text}>{meals?.restaurantName}</Text>
          <Text style={styles.text}>{meals?.restaurantAddress}</Text>
          <Text style={styles.text}>{meals?.calories}</Text>
          <Text style={styles.text}>{meals?.proteinGrams}</Text>
          <Text style={styles.text}>{meals?.fatGrams}</Text>
          <Text style={styles.text}>{meals?.carbsGrams}</Text>
        </View>
      )}</View>
  );
}



//Styles for the component
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
  columnStyle: {
    gap: 10,  
    justifyContent: 'space-between',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});