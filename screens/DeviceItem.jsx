import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function DeviceItem({ title, updatedAt, onPress }) {

    const dateDiffControl = (dateInput) => {
        const diff = new Date(new Date().toISOString()) - new Date(dateInput);
        const diffHour = Math.floor(diff / 86400e3);
        return diffHour;
    }

    return (





        <View style={{ ...styles.productItemContainer, backgroundColor: dateDiffControl(updatedAt) > 1 ? 'rgba(210,48,47,255)' : '#1365f2' }}>
            <Pressable onPress={onPress}>
                <View style={styles.productItemInnerContainer}>

                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.title}>{title}</Text>
                </View>
            </Pressable>

        </View>



    )
}

//color=
const styles = StyleSheet.create({
    productItemContainer: {
        flex: 1,
        margin: 5,
        borderRadius: 3,

    },
    pressableView: {
        flex: 1
    },
    productItemInnerContainer: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'left',

    },
    title: {
        fontWeight: 300,
        fontSize: 15,
        color: '#fff'
    }
})