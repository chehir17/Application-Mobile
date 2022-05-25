import React,{useEffect,useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    SafeAreaView,
    FlatList,
    StatusBar,
    shadowColor,
    Dimensions,
    Easing,
    SafeAreaViewBase,
    shadowOpacity,
    Alert, Modal,Pressable

} from 'react-native';
import {HeaderBar} from "../components";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressBar, Colors } from 'react-native-paper'

//const { width,height } = Dimensions.get('screen');


const ActionRetard = ({ navigation,planactionId }) => {
 
    const BG_IMG ="https://ipnuts.fr/wp-content/uploads/2018/10/car-3075497_1920-700x500.jpg";
    const SPACING = 20;
    const AVATAR_SIZE = 70;
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const ITEM_SIZE = AVATAR_SIZE + SPACING * 3 ;
    // get user id
    const [data, setData] = React.useState([]);
    const [jsondata,setjsondata] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(()  => {     
        getfetch();
      }, []);

    async function getfetch(){
        let user = await AsyncStorage.getItem('userData')
        let JsonUser = JSON.parse(user);
        console.log(JsonUser);
        console.log(JsonUser[0].id_user);

        await fetch(`http://192.168.27.20/newgen/blog/public/api/indexmobile/` + JsonUser[0].id_user)
        .then((response) => response.json())   
        .then((json) => setData(json))
        .catch((error) => console.error(error))

       // console.log(data1[0].id_user );
    }
  
        
    return (
    <>

            <Image 
            source={{uri:BG_IMG}}
            style={StyleSheet.absoluteFillObject}
            blurRadius={10}
            />
            <HeaderBar 
            right={true}
            /> 


              <Animated.FlatList 
              data={data}
              onScroll={Animated.event(
                  [{ nativeEvent : {contentOffset:{y:scrollY}}}],
                  { useNativeDriver :true}
              )}
              keyExtractor={item =>item.id_planaction.toString()}
              contentContainerStyle={{
                  padding:SPACING,
                  paddingTop: StatusBar.currentHeight || 42

              }}
              renderItem={({item,index}) =>{
                  const inputRange = [
                      -1,
                      0,
                      ITEM_SIZE * index,
                      ITEM_SIZE * (index + 2)
                  ]
                  const OpacityInputRange = [
                    -1,
                    0,
                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + .5)
                ]
                  const scale = scrollY.interpolate({
                      inputRange,
                      outputRange:[1,1,1,0]
                  })
                  const opacity = scrollY.interpolate({
                    inputRange:OpacityInputRange,
                    outputRange:[1,1,1,0]
                })
    

                    return(
                        <>
                 
                    <TouchableOpacity
                    onPress={() => navigation.navigate("ModifierStatut", {
                        planactionId:item })}  
                    >
                    <Animated.View style={{
                        flexDirection:"row",
                        padding: SPACING,
                        marginBottom:SPACING,
                        backgroundColor:'rgba(255,255,255,0.8)',
                        borderRadius:16,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 10
                        },
                        shadowOpacity: .3,
                        shadowRadius: 20,
                        opacity,
                        transform: [{scale}]
                        }}>
                        <View>
                            <Text style={{fontSize:18,fontWeight:'700'}} >ID plan d'action :{item.id_planaction}</Text>
                            <Text style={{fontSize:18,fontWeight:'700'}} >Responsable :{item.first_name} {item.last_name}</Text>
                            <Text style={{fontSize:16,fontWeight:'700',color:'#0099cc'}}>Status : {item.status}</Text>
                            <Text>Progress:</Text><ProgressBar progress={item.progress/100} color={"#0099cc"}/>
                            <Text style={{fontSize:15,opacity:0.5}}>Date Cloture: {item.date_cloture}</Text>
                            <Text style={{fontSize:15,fontWeight:'500'}}>Actions :{item.action}</Text>
                        </View>
                    </Animated.View>
                    </TouchableOpacity>
                    
                        </>
                    )
                
                
              }
            }
           
              
              />

          
           
</>
    )
  
   
}

const styles = StyleSheet.create({
   
  });
export default ActionRetard;