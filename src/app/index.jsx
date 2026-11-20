
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const API = `https://www.themealdb.com/api/json/v1/1/categories.php`;


export default function App() {

  const [categories, Setcategories] = useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        Setcategories(data.categories);
      })
      .catch((err) => {
        console.log(err);
      })

      .finally(()=>{
        setLoading(false);
      });

  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, marginBottom: 15 }}>
        Meal Categories

      </Text>
      { loading ?(
        <ActivityIndicator size="large" />
      )
    :(

      <FlatList
        data={categories}
        keyExtractor={(item) => item.idCategory}

       
          
        


        renderItem={({ item }) =>
           <Pressable
    onPress={() => {
      router.push({
        pathname: '/category',
        params: {
          name: item.strCategory
        }
      });
    }}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      // borderBottomWidth: 1,
      // borderBottomColor: '#852929',
      gap: 14
    }}
  >
          <View style={styles.row}>
            <Image
              source={{ uri: item.strCategoryThumb }}
              style={{ width: 80, height: 80, borderRadius: 8 }}
            />

            <Text style={{
              flex: 1,
              fontSize: 20,
              // padding: 15,
              // borderBottomWidth: 1,
              // borderColor: '#852929',
              textAlignVertical: 'center'
            }}>



              {item.strCategory}

            </Text>
          </View>
          </Pressable>
        }


      />
      )}



    </View>

  );
}

const styles = StyleSheet.create({
  container: {


    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#852929',
    borderRadius:4,
    gap: 14,
  },




});
