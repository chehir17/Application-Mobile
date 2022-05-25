import React,{useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    SafeAreaView
} from 'react-native';
import {dummyData, COLORS , SIZES , FONTS ,icons,images} from "../constants"
import {HeaderBar} from "../components"
//import { Button } from 'react-native-paper';
import Button from '../components/Button';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const Notif = ({ navigation }) => {
  
    useEffect(() => {
        registerForPushNotificationsAsync();
      }, [])
      const [state,setState] = useState()

     const _handleNotification = notification =>{
        setState({notification: notification});
      }

    async function registerForPushNotificationsAsync(){
    // on demande la permissions
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    // si la permission n'est pas accordée on fait
    if (status !== "granted") {
      alert("No notification permissions !")
      return;
    }
    // on recupere le token qu'on affiche dans la console
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    _notificationSubscription = Notifications.addPushTokenListener(_handleNotification());

  }
    return (
         <SafeAreaView 
         style={{
             flex:1, 
             backgroundColor:COLORS.lightGray1
         }}>

            <HeaderBar 
            right={true}
            />
         <Button style={{
          width:250,
          textAlign:"center",
          marginLeft:70,
      }} mode="contained" type="submit" >Send notification
        <Image 
                        source={images.sendNotif}
                        resizeMode="cover"
                        style={{
                            marginTop:5,
                            width:30,
                            height:30,
                        }}
                        />
        </Button>
        <View>
          <Text></Text>
        </View>

{/* Boody Notification */}

         <Text style={{textAlign:"center"}}>Hello from notifications</Text>

         </SafeAreaView>
         
    )
                    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default Notif;