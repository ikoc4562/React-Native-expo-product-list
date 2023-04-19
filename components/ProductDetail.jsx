import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

export default function ProductDetail({productDetail}) {
  return (
    <View style={styles.container}>
      <Text style={styles.testStyle}>{productDetail.title}</Text>
      <Text style={styles.testStyle}>{productDetail.description}</Text>  
      <Text style={styles.testStyle}>{productDetail.price}</Text>  
      <Text style={styles.testStyle}>{productDetail.rating}</Text>
      <Text style={styles.testStyle}>{productDetail.category}</Text>
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    padding:30,
    paddingHorizontal:15,
    borderWidth:1,
    margin:10,
    borderColor:'#88da9e'
  },
  testStyle:{
    color:'white',
    fontSize:20,
    paddingBottom:20
  }

})