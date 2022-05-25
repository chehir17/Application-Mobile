import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View,ToastAndroid } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import axios from 'axios';
import Toast from 'react-native-toast-message';

/// async storage to take user data in phone memory
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation}) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [isPending, setIsPending] = useState(false);

  const showToast = () =>{
    ToastAndroid.show('Password or Email is Incorrect !!',
    ToastAndroid.SHORT);
  }

  const onLoginPressed = async() => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return;
    }else{
      setIsPending(true)

      fetch('http://192.168.27.20/newgen/blog/public/api/user-login',{
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
        }),
    }).then(res => res.json())
    .then(resData =>{
      if(resData.status == 200 && resData.data[0].role == "qualite"){
        setIsPending(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
        storeData(resData.data);
    }
    else{
      showToast();
    }
      console.log('hhhhhhhhhhhhhhhh');
      console.log(resData);
    }
    ) .catch((error) => {
      console.error(error);
    });
    
   
    
  
  }
  
  }
  
  const storeData = async (value) => {
     try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('userData', jsonValue)
          console.log('hani hneeeeeeeeeeeeeeeeeeeeeeeeeeeeee'+jsonValue);
        } catch (e) {
          console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrr'+e);
        }
  }


  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Kablem Tunisia</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      {!isPending &&<Button mode="contained" type="submit" onPress={onLoginPressed}>
        Login
      </Button>}
      {isPending &&<Button mode="contained" type="submit" onPress={onLoginPressed}>
        Loding...
      </Button>}
      {/** */}
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        </View>
        <View>
        <Text style={styles.link} >Contact administration </Text>
        </View>
    

       {/**<TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity> */} 
    
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
