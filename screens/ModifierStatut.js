import React, { useState } from 'react'
import {SafeAreaView, TouchableOpacity, StyleSheet, View,ToastAndroid,Picker } from 'react-native'
import { Text, ProgressBar, Colors } from 'react-native-paper'
import Header from '../components/Header'
import {HeaderBar} from "../components"
import BackButton from '../components/BackButton'

import Button from '../components/Button'
import { theme } from '../core/theme'
import axios from 'axios';
import Toast from 'react-native-toast-message';

/// async storage to take user data in phone memory
import AsyncStorage from '@react-native-async-storage/async-storage';

//card
import { Card } from 'react-native-elements';






export default function ModifierStatut({ navigation,route}) {
 
  const { planactionId } = route.params;

//  const [email, setEmail] = useState({ value: '', error: '' })
 
  const [selectedValue, setSelectedValue] = useState("open");
  const [selectedValue1, setSelectedValue1] = useState("25");
  const [isPending, setIsPending] = useState(false);

  /*const onLoginPressed = async() => {
    //const emailError = emailValidator(email.value)
   // const passwordError = passwordValidator(password.value)
  }*/
   async function showToast(){
    ToastAndroid.show('Statut Modifier Avec Succés',
    ToastAndroid.SHORT);
  }
  async function showToast1(){
    ToastAndroid.show('Erreur de Modification',
    ToastAndroid.SHORT);
  }

  const modifierstatut = async () => {
    const data1 ={
      sts1:selectedValue,
      prg1 :selectedValue1,
    }
    console.log(data1);
    setIsPending(true)
     await fetch( `http://192.168.27.20/newgen/blog/public/api/status/`+ planactionId.id_planaction, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
          sts1:selectedValue,
          prg1 :selectedValue1,
        },
        console.log(data1),
        )
        
      }).then((response) => {
        setIsPending(false);
        response.json().then((response) => {
          console.log(response);
          navigation.navigate("Home");
          showToast();
        })
      }).catch(err => {
        console.error(err)
        showToast1();
      }) 
      console.log('heeeeeeeeeeeeeeeeeee')
    
  }
  

  return (
    <SafeAreaView style={styles.container}>

      <View>
      <HeaderBar 
            right={false}
      />
       </View>
     {/*<Text>{planactionId.status}</Text>* */}  

       <View style={styles.container}>
       <Card title="">
           <Header>Modifier le statut de l'Action N°{planactionId.id_planaction}</Header>
       <Text style={{
          fontWeight: 'bold',
          color:'#560CCE',
          fontSize:16 
      }}>Statut :</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 70, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Open" value="Open" />
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Done" value="Done" />
      </Picker>
    <Text 
    style={{
        fontWeight: 'bold',
        color:'#560CCE',
        fontSize:16 
    }}
    >Progress :</Text>
      <Picker
        selectedValue={selectedValue1}
        style={{ height: 70, width: 200  }}
        onValueChange={(itemValue1, itemIndex) => setSelectedValue1(itemValue1)}
      >
        <Picker.Item label="25" value="25" />
        <Picker.Item label="50" value="50" />
        <Picker.Item label="75" value="75" />
        <Picker.Item label="100" value="100" />
      </Picker>
    {! isPending && <Button style={{
          width:200,
          textAlign:"center",
          marginLeft:50,
      }} mode="contained" type="submit" onPress={modifierstatut}>Enregister</Button>}
        { isPending && <Button style={{
          width:200,
          textAlign:"center",
          marginLeft:50,
      }} mode="contained">Loding...</Button>}
              </Card>
            </View>
        </SafeAreaView>
      
    )
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
      },
      
})
