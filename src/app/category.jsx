
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, Text, View } from 'react-native';


export default function categoryscreen() {
    const { name } = useLocalSearchParams();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    const API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${(name)}`;

    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => {
                setMeals(data.meals || []);

            })

            .catch((err) => {
                console.log(err);
            })

            .finally(() => {
                setLoading(false);
            })

    })


    return (
        <View style={{
            flex: 1,
            padding: 20,
            backgroundColor: '#fff'
        }}>

            <Text style={{
                fontSize: 25,
                marginBottom: 15
            }}>
                {name}   Meals
            </Text>

            {loading ? (
                <ActivityIndicator size="large" />)
                : (
                    <FlatList
                        data={meals}
                        keyExtractor={(item) => item.idMeal}
                        ListEmptyComponent={
                            <Text>No meal found </Text>
                        }

                        renderItem={({ item }) => (
                            <Pressable  
                            onPress={()=>{
                                router.push({
                                    pathname:'/mealpage',
                                    params:{
                                        name:item.idMeal
                                    }
                                });
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingVertical: 12,
                                gap: 14,
                                borderBottomWidth: 1,
                                borderBottomColor: '#ddd'
                            }}>
                                <Image
                                    source={{ uri: item.strMealThumb }}
                                    style={{
                                        width: 90,
                                        height: 90,
                                        borderRadius: 8
                                    }}
                                />

                                <Text style={{ fontSize: 18, flex: 1 }}>
                                    {item.strMeal}
                                </Text>
                            </View>
                            </Pressable>

                        )}



                    />
                )}

        </View>


    )
} 