import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Button } from "@react-native-material/core";
import axios from 'axios';
import { Snackbar } from "@react-native-material/core";
import { Context } from '../context'


export default function Login() {

    const [username, setUsername] = useState('marko@suomiconnect.fi');
    const [password, setPassword] = useState('111!!!mt007');
    const [error, setError] = useState('');


    const { setUser, setFormData, formdData } = useContext(Context)

    const navigation = useNavigation();


    const handleUser = (text) => {
        setUsername(text)
    }

    const handlePass = (text) => {
        setPassword(text)
    }

 
    const handleLogin = () => {

        async function login() {
            const getLogin = await axios.post('https://tinksi.fi:3001/api/v4/login', {}, {
                auth: {
                    username: username,
                    password: password
                }
            });
            const result = await getLogin.data;
            if (result) {
                setUser(result)
                setFormData({
                    username: username,
                    password: password
                })
                navigation.navigate('Home')
            } else {
                setError('Login fail!')
            }

        }

        login()

    }

    return (
        <View style={styles.container}>


            <Image style={styles.Image} source={require('../assets/logo.png')} />
            <Text style={styles.loginText}>Sign in</Text>

            <TextInput style={styles.input} placeholder='username' value={username} onChangeText={handleUser} />
            <TextInput style={styles.input} placeholder='password' value={password} onChangeText={handlePass} />

            <Button style={styles.loginBtn} title="Login" onPress={handleLogin} />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'

    },
    input: {

        alignItems: 'center',
        marginHorizontal: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
        padding: 10,
        margin: 10

    },
    loginBtn: {
        marginHorizontal: 20,
    },
    loginText: {
        fontSize: 30,
        fontWeight: 500
    },
    Image: {
        maxWidth: 250,
        width: 230,
        height: 95,
        alignSelf: 'center',
        marginBottom: 10.
    }
})