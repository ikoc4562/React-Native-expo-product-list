import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native'
import { Context } from '../context'
import { useContext } from 'react';

export default function Detail() {

    const { dataLists } = useContext(Context)
    const [loading, setLoading] = useState(false);

    const route = useRoute()

    const { productId } = route.params;
    
    const getData = dataLists.filter((res) => {
        return res.id == productId
    })

    if (loading) {
        return (
            <ActivityIndicator style={styles.loader} color={'yellow'} size="large" />
        )
    }
    return (


        <View style={styles.container}>
            <Text style={styles.testStyle}>{getData[0].id}</Text>
            <Text style={styles.testStyle}>{getData[0].name}</Text>
            <Text style={styles.testStyle}>{getData[0].devEui}</Text>
            <Text style={styles.testStyle}>{getData[0].isVirtual?'Yes':'No'}</Text>
            <Text style={styles.testStyle}>{getData[0].realIotDeviceId}</Text>
        </View>

    )
}
const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: 30,
        paddingHorizontal: 15,
        borderWidth: 1,
        margin: 10,
        borderColor: '#88da9e'
    },
    testStyle: {
        color: 'black',
        fontSize: 20,
        paddingBottom: 20
    }
});