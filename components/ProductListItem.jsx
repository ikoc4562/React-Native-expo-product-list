import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'


export default function ProductListItem({ title, onPress, bgColor }) {


  return (
    <View style={styles.productItemContainer}>
      <Pressable android_ripple={{color:"#cad346"}} style={{...styles.pressableView, backgroundColor:bgColor}}
      onPress={onPress}>
        <View style={styles.productItemInnerContainer}>

          <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{title}</Text>
        </View>

      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
  productItemContainer: {
    flex: 1,
    margin: 16,
    height: 160,
    borderRadius: 8
  },
  pressableView: {
    flex: 1
  },
  productItemInnerContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000'
  }
})