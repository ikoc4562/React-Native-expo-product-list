import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Products from './screens/Products';
import Detail from './screens/Detail';
import Favorites from './screens/Favorites';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductContext from './context';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{
        title: "Product Lists",
      }} name="Products" component={Products} />
      <Tab.Screen options={{
        title: "Favorites",
      }} name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <ProductContext>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
          screenOptions={{
            headerStyle:{
              backgroundColor:'#fff'
            },
            contentStyle:{
              backgroundColor:'#220577dd'
            }
          }} >
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ProductContext>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
