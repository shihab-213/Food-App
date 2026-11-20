import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';


function getIngridients(meal) {
    const list = [];
    for (let i = 0; i < 20; i++) {
        const ing = meal[`strIngredient${i}`]?.trim();
        const measure = meal[`strMeasure${i}`]?.trim();

        if (ing) {
            list.push({
                id: String(i),
                ing,
                measure: measure || '',
            });
        }
    }
    return list;
}


export default function MealPage() {
    const { name } = useLocalSearchParams();
    const mealId = Array.isArray(name) ? name[0] : name;
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!mealId) {
            setLoading(false);

            return;
        }

        const API = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(mealId)}`;
        fetch(API)
            .then((res) => res.json())
            .then((data) => {
                setDetails(data.meals || []);
            })

            .catch((err) => {
                console.log(err);
            })

            .finally(() => {
                setLoading(false);
            });
    }, [mealId]);


    return (


        <View style={{ alignItems: 'center' }}>
            <Text>
                Meal Details
            </Text>
            {loading ? (<ActivityIndicator size='large' />)
                : (
                    <FlatList
                        data={details}
                        keyExtractor={(item) => item.idMeal}
                        renderItem={({ item }) => {
                            const ingridents=getIngridients(item);
                            return(
                            <View style={{ alignItems: 'center' }}>
                                <Image source={{ uri: item.strMealThumb }}
                                    style={{ width: 300, height: 300 }}
                                     />

                                <Text style={{ fontWeight: 'bold' }}>{item.strMeal}</Text>
                                <Text>Origin: {item.strCountry}</Text>

                                <Text>{item.strInstructions}</Text>
                                <Text>Recipe......</Text>
                                {ingridents.map((raw)=>(
                                <View key={raw.id} style={{alignSelf: 'stretch'}} >
                                   <Text style={{alignItems:'flex-start'}}>~{raw.ing} {raw.measure}</Text> 
                                  {/* {raw.measure ?(
                                    <Text>{raw.measure}</Text>)
                                    : null}
                                   */}
                                </View>
                                ))}
                               





                            </View>
                            )




                        }}
                    />
                )}

        </View>
    )
}