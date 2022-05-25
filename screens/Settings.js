import React,{useEffect,useState} from 'react';
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
import {images,COLORS} from "../constants"
import {HeaderBar} from "../components";
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';




const Settings = ({ navigation }) => {
    const [jsondata,setjsondata] = useState([]);

    const getData = async () => {
        const jsonValue = await AsyncStorage.getItem('userData');
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'+jsonValue);
       return jsonValue != null ?  JSON.parse(jsonValue) : null;
    }

    useEffect(() => {
        async function getaction(){
            let user = await AsyncStorage.getItem('userData')
            let JsonUser = JSON.parse(user);
            console.log(JsonUser);
            console.log(JsonUser[0].id_user);
            setjsondata(JsonUser[0]);
 
         }
        getData();
        getaction(jsondata);
          }, []);
  

    async function onLogoutHandler(){
        try {
            await AsyncStorage.removeItem('userData');
            console.log('Data removed')
            navigation.navigate("StartScreen")
        }
        catch(exception) {
            console.log(exception)
        }
    
     }

    return (
        <>
          <HeaderBar 
            right={true}
            />
                 <Button style={{
          width:123,
          textAlign:"center",
          marginLeft:130,

      }}mode="contained"  onPress={() => onLogoutHandler()}>
        Logout
        <Image 
        source={images.Logout}
        resizeMode="cover"
        style={{
        width:25,
        height:25,
        padding:10,
        }}
                        />

      </Button>
         <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                <Text style={styles.name}>{jsondata.first_name} {jsondata.last_name}</Text>
                <Text style={styles.userInfo1}>{jsondata.email}</Text>
                </View>
                <Text style={styles.userInfo}>Matricule: {jsondata.matricul} </Text>
                <Text style={styles.userInfo}>Departement: {jsondata.nom_departement} </Text>
                <Text style={styles.userInfo}>Nature: {jsondata.nature} </Text>
                <Text style={styles.userInfo}>Role: {jsondata.role} </Text>
           
          </View>


      </View>
      </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:COLORS.lightGray1
    },
      headerContent:{
        padding:30,
        alignItems: 'center',
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
      },
      name:{
        fontSize:22,
        color:"#000000",
        fontWeight:'700',
        
      },
      userInfo1:{
        fontSize:18,
        color:"#778899",
        fontWeight:'700',
        alignItems: 'flex-start',
      },
      userInfo:{
        fontSize:18,
        color:"#778899",
        fontWeight:'700',
        alignItems: 'flex-start',
        marginLeft:30,
        padding:2,

      },
})

export default Settings;