import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductContext from './context';
import Login from './screens/Login';
import Home from './screens/Home';
import ItemDetail from './screens/ItemDetail';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <ProductContext>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#fff'
              },

            }}>

            <Stack.Screen options={{
              headerShown: false,
            }} name="Login" component={Login} />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Home" component={Home} />
            <Stack.Screen options={{
              headerShown: true, title: 'Detail'
            }} name="ItemDetail" component={ItemDetail} />

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
