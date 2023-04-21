import { ScrollView, View } from 'react-native'
import React from 'react'
import { Context } from '../context'
import { useContext, useState } from 'react';
import DeviceItem from './DeviceItem';
import { useNavigation } from '@react-navigation/native';
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
} from "@react-native-material/core";

export default function Inactive() {

  const { dataLists} = useContext(Context)
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  
  const finalData = dataLists.map((res) => ({
    id: res.id,
    name: res.name,
    deEui: res.devEui,
    isVirtual: res.isVirtual ? 'True' : 'False',
    realIotDeviceId: res.realIotDeviceId,
    updatedAt: res.updatedAt
  }))

  const getDateDiff = (dateInput) => {
    const diff = new Date(new Date().toISOString()) - new Date(dateInput);
    const diffHour = Math.floor(diff / 86400e3);
    return diffHour;
  }

  const finalInactiveData = finalData.filter((res) => {
    return getDateDiff(res.updatedAt) > 1
  })


  //const navigation = useNavigation();
  const handleOnPress = (getid) => {
    setVisible(true)
    //navigation.navigate('ItemDetail',{
    //  productId: getid,
    //})
    setData(dataLists.filter((res) => {
      return res.id == getid
    }))
  }
  return (
    <>
      <Provider>
        <View style={{ margin: 10 }}>
          <ScrollView>
            {finalInactiveData?.map((item) => (

              <DeviceItem
                key={item.id}
                title={item.name}
                updatedAt={item.updatedAt}
                id={item.id}
                onPress={() => handleOnPress(item.id)}
              />

            ))
            }
          </ScrollView>
        </View>
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