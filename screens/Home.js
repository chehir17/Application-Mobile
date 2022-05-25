import React,{useEffect,useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
    TouchableOpacityBase,
    LogBox
} from 'react-native';

import {dummyData, COLORS , SIZES , FONTS ,icons , images} from "../constants"

import {PriceAlert} from "../components"
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({ navigation}) => {

    const [trending, setTrending] = React.useState(dummyData.trendingCurrencies)
    const [jsondata,setjsondata] = useState([]);
    const [totAction,setTotAction] = useState([]);

    
    const getData = async () => {
        const jsonValue = await AsyncStorage.getItem('userData');
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'+jsonValue);
       return jsonValue != null ?  JSON.parse(jsonValue) : null;
    }
    const getTotAction = () =>{
        fetch('http://192.168.27.20/newgen/blog/public/api/totaction')
        .then((response) => response.json())
        .then((json) => setTotAction(json))
        .catch((error) => console.error(error))
        //.finally(() => setLoading(false));
         
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
        getTotAction();
        getaction(jsondata);
          }, []);
  


    React.useEffect(() => {
           LogBox.ignoreLogs(['VirtualizedLists should never be nested']) 
    },[] )

    function renderHeader(){

        const renderItem = ({item, index }) => (
            <TouchableOpacity
            style={{
                width:170,
                paddingVertical:SIZES.padding,
                paddingHorizontal:SIZES.padding,
                marginLeft: index == 0 ? SIZES.padding : 0 ,
                marginRight:SIZES.radius,
                borderRadius:10,
                backgroundColor:COLORS.white,   
                height:180, 
            }}
            onPress={() => navigation.navigate("CryptoDetail")}
            >
                {/* Currency */}

                <View style={{flexDirection: 'row'}}>
                    <View>
                        <Image 
                        source={item.image}
                        resizeMode="cover"
                        style={{
                            marginTop:5,
                            width:35,
                            height:35
                        }}
                        />
                    </View>
                    <View style={{
                        marginLeft:SIZES.base}}>
                            <Text style={{...FONTS.h2}}>{item.currency}
                            </Text>
                            <Text style={{
                                color:COLORS.gray,
                                ...FONTS.body3
                            }}>{item.code}</Text>
                        </View>
                </View>
                
                {/* Value */}
                <View style={{marginTop: SIZES.radius}}>
                    <Text style={{...FONTS.h2 }}>{item.amount}</Text>
                    <Text style={{ color: item.type == "I" ? COLORS.green : COLORS.red, ...FONTS.h3}}>
                        {item.changes}
                    </Text>

                </View>

            </TouchableOpacity>
        )
        return(
            <View
            style={{
                width:"100%",
                height:290,
                ...styles.shadow
            }}
            >
             <ImageBackground
             source={images.banner}
             resizeMode="cover"
             style={{
                 flex:1,
                 alignItems:'center'
             }}
             >
                 {/* Header Bar */}
                 <View
                 style={{
                     marginTop: SIZES.padding * 2,
                     width:"100%",
                     alignItems:"flex-end",
                     paddingHorizontal:SIZES.padding
                 }}
                 >
                 <TouchableOpacity
                 style={{
                     width:35,
                     height:35,
                     alignItems:'center',
                     justifyContent:'center'
                 }}
                 onPress={() => navigation.navigate("Notifications", {})}
                 >
                     <Image 
                     source={icons.notification_white}
                     resizeMode="contain"
                     style={{ flex: 1 }}
                     />
                 </TouchableOpacity>
                 </View>

                 {/* home header */}
                 <View
                 style={{
                     alignItems:'center',
                     justifyContent:'center'
                 }}
                 >
                     <Text
                     style={{
                         color: COLORS.white,
                        ...FONTS.h3}}>Bonjour Mr. {jsondata.first_name}</Text>
                        <Text
                        style={{
                            marginTop: SIZES.base, color:COLORS.white, ...FONTS.h1}}
                            >KABLEM APP</Text>
                        <Text style={{
                            color: COLORS.white, ...FONTS.body5}}
                            >Agent {jsondata.role}</Text>
                 </View>
                 {/*  News */}
                <View
                style={{
                    position:'absolute',
                    bottom: "-30%"
                }}>
                 <Text
                 style={{
                     marginLeft: SIZES.padding,
                     color: COLORS.white,
                     ...FONTS.h2
                 }}>News
                 </Text>
                 <FlatList
                    contentContainerStyle={{marginTop:SIZES.base}}
                    data={trending}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                 />
                </View>
             </ImageBackground>
            </View>
        )
    }

    function renderAlert(){
        return (
            <PriceAlert />
        )

    }

    function renderNotice(){
        return (
           <View
           style={{
               marginTop: SIZES.padding,
               marginHorizontal:SIZES.padding,
               padding:20,
               borderRadius:SIZES.radius,
               backgroundColor:COLORS.secondary,
               ...styles.shadow
           }}
           >
               <Text style={{color:COLORS.white,...FONTS.h3}}>Societe Kablem</Text>
               <Text style={{
                   marginTop:SIZES.base,color:COLORS.white,...FONTS.body4,lineHeight:18
               }}>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500</Text>
                <TouchableOpacity style={{margin:SIZES.base}}
                onPress={() => console.log("learn More")}>
                    <Text style={{textDecorationLine:'underline',color:COLORS.green,...FONTS.h3}}>Visite Site web</Text>

                </TouchableOpacity>
           </View>
        )

    }

    return (
        <ScrollView>
            <View style={{flex: 1 , paddingBottom:130 }}>
                {renderHeader()}
                {renderAlert()}
                {renderNotice()}
            </View>
        </ScrollView>
 
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

export default Home;