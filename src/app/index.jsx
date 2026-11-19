
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const API=`https://www.themealdb.com/api/json/v1/1/categories.php`;


export default function App(){

  const [categories,Setcategories]=useState([]);

  useEffect(()=>{
    fetch(API)
    .then((res)=>res.json())
    .then((data)=>{
      Setcategories(data.categories);
    })
    .catch((err)=>{
      console.log(err);
    });

  },[]);

  return(
    <View style={{ flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
    }}>
      <Text style={{ fontSize: 25, marginBottom: 15 }}>
        Meal Categories

      </Text>

      <FlatList
      data={categories}
      keyExtractor={(item)=>item.idCategory}

       ListEmptyComponent={
          <ActivityIndicator size="large" />
        }


        renderItem={({item})=>
         <View style={{flexDirection:'row',
                       alignItems:'center',
                       paddingVertical: 12,
                       borderBottomWidth: 1,
                       borderBottomColor: '#852929',
                       gap: 14}}> 
              <Image
                   source={{ uri: item.strCategoryThumb }}
                   style={{ width: 80, height: 80,borderRadius: 8 }}
             />

          <Text style={{
            flex:1,
            fontSize: 20,
            // padding: 15,
            // borderBottomWidth: 1,
            borderColor: '#852929',
            textAlignVertical:'center'
          }}>

           

            {item.strCategory}

          </Text>
          </View>
        }


      />



    </View>

  );
}

