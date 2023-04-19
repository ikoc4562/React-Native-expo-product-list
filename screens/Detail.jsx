import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { createContext, useState ,useEffect } from "react";
import { useRoute } from '@react-navigation/native'
import ProductDetail from '../components/ProductDetail';

export default function Detail() {

  const[loading, setLoading]=useState(false);
  const [productDetail, setProductDetail]= useState([])

  const route= useRoute()

  const {productId}=route.params;

  useEffect(()=>{

    setLoading(true)
    async function getDataByid(){
      const response= await fetch(`https://dummyjson.com/products/${productId}`);
      const result= await response.json();

      if(result){
        setTimeout(()=>{
          setLoading(false)
      }, 1000)
        setProductDetail(result)
      }
    }

    getDataByid()
  }, []);

  if (loading) {
    return (
      <ActivityIndicator style={styles.loader} color={'yellow'} size="large" />
    )
  }
  return (
    <View>
    
      <ProductDetail productDetail={productDetail}/>
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