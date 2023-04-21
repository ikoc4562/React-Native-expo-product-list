import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Devices from './Devices';
import Appbar from './Appbar';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Inactive from './Inactive';
import { Context } from '../context'
import { useContext } from 'react';
export default function Home() {

    const { dataLists, inActiveLists } = useContext(Context)

    const Tab = createBottomTabNavigator();
    return (
        <>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Appbar />
                <Tab.Navigator initialRouteName='Devices' screenOptions={{
                    tabBarStyle: { position: 'absolute', display:dataLists.length>0?'':'none' },
                }}>
                    <Tab.Screen options={{
                        title: "All Devices", headerShown: false,tabBarBadge:dataLists.length,tabBarBadgeStyle: {
                            maxWidth: 16,
                            maxHeight: 16,
                            fontSize: 9,
                            lineHeight: 14,
                            backgroundColor:'blue'
                       },
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon name="devices" size={24} color="blue">
                            </Icon>

                        )
                    }} name="Devices" component={Devices} />

                
                    <Tab.Screen options={{
                            headerShown: false, tabBarBadge:inActiveLists.length, tabBarBadgeStyle: {
                            maxWidth: 16,
                            maxHeight: 16,
                            fontSize: 9,
                            lineHeight: 14,
                            alignSelf: 'center',
                       },
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon name="timer-off" size={24} color="red" />
                        )
                    }} name="Inactive" component={Inactive} />

                </Tab.Navigator>
            </IconComponentProvider >
        </>
    );
}