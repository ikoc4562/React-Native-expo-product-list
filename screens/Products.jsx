import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../context'
import ProductListItem from '../components/ProductListItem';
import { useNavigation } from '@react-navigation/native';

function createrandomColor(){
  let letters="0123456789ABCDEF";
  let color="#"

  for(let i=0; i<6;i++){
    color+=letters[Math.floor(Math.random()*16)]
  }
  return color;
}

export default function Products() {

  const { loading, products } = useContext(Context)

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} color={'red'} size="large" />
    )
  }
  const navigation= useNavigation();
  const handleOnPress=(getid)=>{
    navigation.navigate('Detail',{
      productId: getid,
    })
  }
  return (
    <View>
      <FlatList
      data={products}
      renderItem={(item)=>(<ProductListItem
        title={item.item.title}
        bgColor={createrandomColor()}
        onPress={()=>handleOnPress(item.item.id)}/>
      )}
      keyExtractor={(item)=>item.id}
      numColumns={2}
      />
     
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});