import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: 'Meal Categories' }}
      />

      <Stack.Screen
        name="category"
        options={{ title: 'Meals' }}
      />
      <Stack.Screen
      name="mealpage"
      options={{title:'Meals Details'}}
      />
    </Stack>
  );
}