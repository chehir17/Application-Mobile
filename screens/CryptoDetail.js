import React,{useState,useEffect} from 'react';
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
import {HeaderBar} from "../components"
import { VictoryBar, VictoryChart, VictoryTheme,VictoryPie,VictoryAxis } from "victory-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



const CryptoDetail = ({ navigation }) => {
const [datadone,setDatadone] = useState([]);

const [dataNotdone,setdataNotdone] = useState([]);


const [byUser,setbyUser] = useState('');
const [byUser1,setbyUser1] = useState('');
const [byUser2,setbyUser2] = useState('');

const [jsondata,setjsondata] = useState([]);

      async function getaction(){
        let user = await AsyncStorage.getItem('userData');
        let JsonUser = JSON.parse(user);
        console.log(JsonUser);
        console.log(JsonUser[0].id_user);

       await fetch(`http://192.168.27.20/newgen/blog/public/api/byuser/`+ JsonUser[0].id_user)
        .then((response) => response.json())
        .then((json) => setbyUser(json))
        .catch((error) => console.error(error))
      
      await fetch(`http://192.168.27.20/newgen/blog/public/api/byuser1/`+ JsonUser[0].id_user)
      .then((response) => response.json())
      .then((json) => setbyUser1(json))
      .catch((error) => console.error(error))
    
    await fetch(`http://192.168.27.20/newgen/blog/public/api/byuser2/`+ JsonUser[0].id_user)
    .then((response) => response.json())
    .then((json) => setbyUser2(json))
    .catch((error) => console.error(error))
  }

    useEffect(()  => {
    
        getaction();
        //.finally(() => setLoading(false));
       fetch('http://192.168.27.20/newgen/blog/public/api/actionDone')
         .then((response) => response.json())
         .then((json) => setDatadone(json))
         .catch((error) => console.error(error))
         //.finally(() => setLoading(false));
          
         console.log(datadone);
         console.log();

         fetch('http://192.168.27.20/newgen/blog/public/api/actionOnRetard')
         .then((response) => response.json())
         .then((json) => setdataNotdone(json))
         .catch((error) => console.error(error))
         //.finally(() => setLoading(false));

         console.log(dataNotdone);
         console.log();
        



       }, []);

       const data1= [
        { x: "not Done"  + ' '+ Math.round(datadone[1]) + "%" , y:Math.round(datadone[1]) },
        { x: "done"  +' '+ Math.round(datadone[0])+ "%", y: Math.round(datadone[0]) },
      ];
      const data2= [
        { x: "not Done" +' '+ Math.round(dataNotdone[1])+ "%" , y:Math.round(dataNotdone[1]) },
        { x: "retard" +' '+ Math.round(dataNotdone[0])+ "%", y: Math.round(dataNotdone[0]) },
      ];
      console.log(byUser);
      const x = byUser;
     // const y = byUser[0];
     // const z = byUser[0];
      console.log(x + 'eeeeeeeeeee');
     // console.log(y);
     // console.log(z);
      const data = [
        {quarter: 'Action reatrd ', earnings: x},
        {quarter:'Action Done' , earnings: byUser1},
        {quarter: 'Actions cloturé', earnings: byUser2},
      ];
    console.log(data);

    return (
        
        
         <SafeAreaView 
         style={{
             flex:1, 
             backgroundColor:'#e0f7fa'
             
         }}>
            <HeaderBar 
            right={true}
            />  
            
          <ScrollView>
          <View style={styles.container}>
         <Text style={{fontSize:18,fontWeight:'700',color:'#0099cc'}}>Votre Pérformance</Text>
         <View style={styles.container}>
      
         <VictoryChart
        domainPadding={20}
      >
        <VictoryAxis
         
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
        />
        <VictoryBar
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
            </View>
        <Text
        style={{fontSize:18,fontWeight:'700',color:'#0099cc'}}
        >Taux de Cloture des actions</Text>
        <VictoryPie
        colorScale={["tomato", "cyan"]}
        data={data1}
        />
        <Text style={{fontSize:18,fontWeight:'700',color:'#0099cc'}}>Taux des actions en retard</Text>

       <VictoryPie
        colorScale={["tomato", "orange"]}
        data={data2}
    
        />
                </View>

            </ScrollView>
         </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5fcff",
      }
})

export default CryptoDetail;