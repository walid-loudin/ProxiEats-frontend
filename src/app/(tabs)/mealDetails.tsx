import { getNearbyMealDetailsFromApiAsync } from '@/src/apis/httpRequests';
import { MealDetail } from '@/src/types/MealDetail';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, Button} from 'react-native';
import { useEffect, useState } from 'react';
import { styles } from '../../styles/globalStyles';
import { useRouter } from "expo-router";



export default function MealDetails() {
const { id } = useLocalSearchParams();
const mealId = parseInt(id as string, 10);
const [isLoading, setLoading] = useState(true);
const [meals, setMeals] = useState<MealDetail | null>(null);
const router = useRouter();

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
      <Button title="Go Back" onPress={() =>
                router.navigate({
                  pathname: "..",
                })
              } />
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
      )}</View></View>
  );
}