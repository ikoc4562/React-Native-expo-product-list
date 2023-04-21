import React, { useContext } from "react";
import {
  AppBar,
  IconButton,
  Avatar,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Context } from '../context'
import { useNavigation } from '@react-navigation/native';

const Appbar = () => {
    const { user } = useContext(Context)
    const navigation = useNavigation();


  return (
    <AppBar
      title="IoT Hallinta"
      leading={props => (
        <IconButton
          icon={props => <Icon name="menu" {...props} />}
          {...props}
        />
      )}
      trailing={props =>
          <IconButton
            icon={<Avatar label={user.firstName +' '+user.lastName} size={28} />}
            onPress={() => navigation.navigate('Login')}
            {...props}
          />
       
      }
    />
  );
};

export default Appbar;