import { View, Text, FlatList, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { Context } from '../context'
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import DeviceItem from './DeviceItem';
import {
    Provider,
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,

} from "@react-native-material/core";


export default function Devices() {

    const [noActive, setNoActive] = useState(0)
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({});
    const [devices, setDevices] = useState([{}]);
    const { formData, setDataLists, setInActiveLists } = useContext(Context)

    const dateDiff = (dateInput, id) => {

        const diff = new Date(new Date().toISOString()) - new Date(dateInput);
        const diffDay = Math.floor(diff / 86400e3);
        //console.log('Device id:'+id+'--->'+diffDay)
        if (diffDay >= 1) {
            setNoActive(prevCount => prevCount + 1)
            //console.log('Device id:'+id+'--->'+diffDay)

        };

    }

    async function fetchDevices() {
        const response = await axios.get("https://tinksi.fi:3001/api/v4/iot/devices", {
            auth: {
                username: formData.username,
                password: formData.password
            }
        });

        return response.data

    };

    const fetchDeviceUpdatedDate = async (deviceId, updatedAt) => {
        const response = await axios.get(

            `https://tinksi.fi:3001/api/v4/iot/devices/${deviceId}/device-events?page=0&per_page=1&sort=desc%3Aid`,
            {
                auth: {
                    username: formData.username,
                    password: formData.password
                }
            },
        );
        if (!response.data[0]) {
            return updatedAt
        } else {

            return response.data[0].date.length > 0 ? response.data[0].date : null;
        }
    };


    const fetchAllDevicesWithUpdatedDate = async () => {

        setLoading(false)

        const devices = await fetchDevices();

        const updatedDevicesPromises = devices.map(async (device) => {
            try {
                const updatedDate = await fetchDeviceUpdatedDate(device.id, device.updatedAt);
                dateDiff(updatedDate, device.id);

                return {
                    ...device,
                    updatedAt: updatedDate,
                };

            } catch (error) {
                return device;
            }
        });

        const updatedDevices = await Promise.all(updatedDevicesPromises);

        setDevices(updatedDevices);
        setDataLists(updatedDevices)
        setInActiveLists(updatedDevices.filter((res) => {
            return getDateDiff(res.updatedAt) > 1
          }))
        setLoading(true)
    };

    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    const getDateDiff = (dateInput) => {
        const diff = new Date(new Date().toISOString()) - new Date(dateInput);
        const diffHour = Math.floor(diff / 86400e3);
        return diffHour;
      }
    useEffect(() => {
        fetchAllDevicesWithUpdatedDate();
    }, [refresh])
  
    if (!loading) {
        return (
            <ActivityIndicator style={styles.loader} color={'red'} size="large" />
        )
    }

    const handleOnPress = (getid) => {
        setVisible(true)
        setData(devices.filter((res) => {
            return res.id == getid
        }))
    }

    return (
        <>
            <Provider>
                <SafeAreaView>
                    {devices.length>0?
                    <Button style={styles.refresh} title="Refresh" color="#fc8c03" onPress={handleRefresh} />:''}

                    <View style={{ margin: 10 }}>
                        <FlatList
                            data={devices}
                            renderItem={(item) => (<DeviceItem
                                title={item.item.name}
                                id={item.item.id}
                                updatedAt={item.item.updatedAt}
                                onPress={() => handleOnPress(item.item.id)}
                            />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
                </SafeAreaView>
                <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                    <DialogHeader title="Device Details" />
                    <DialogContent>

                        <>
                            <Text >Id: {data[0]?.id}</Text>
                            <Text >Name: {data[0]?.name}</Text>
                            <Text >DevEui: {data[0]?.devEui}</Text>
                            <Text>IsVirtual:{data[0]?.isVirtual ? 'Yes' : 'No'}</Text>
                            {data[0]?.isVirtual ? <Text>Real Device Id:{data[0]?.realIotDeviceId}</Text> : ''}
                        </>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            title="Ok"
                            compact
                            variant="text"
                            onPress={() => setVisible(false)}
                        />
                    </DialogActions>
                </Dialog>
            </Provider>
        </>
    )
}
const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    refresh: {
        margin: 20,
    },
});