import {React, useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Platform, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FlatList } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from '@react-navigation/native';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../config';
import {getDatabase, onValue, ref,update} from 'firebase/database';


import  StoryCardScreen  from './StoryCard';

SplashScreen.preventAutoHideAsync();


//Mudar o nome da tela
export default function FeedScreen() {

const[light_theme, setlight_theme] = useState(true); 



const fecthUser = async () =>  {   
  let theme;
  const datab = getDatabase();    
  
  var userId = auth.currentUser.uid;     
  
  const userUidRef = ref(datab, '/users/' + userId);
  
  onValue(userUidRef, (snapshot) => {
     const data = snapshot.val();
     theme = data.current_theme;
  });
   
   theme === 'light' ? setlight_theme(true) : setlight_theme(false);
   console.log(light_theme);
}

useEffect(() =>{
loadFontsAsync();
fecthUser();
})




  if (fontsLoaded) {
    SplashScreen.hideAsync();
    return (
      <View style={light_theme? styles.containerLight: styles.container}>
        <SafeAreaView style={styles.droidSafeArea}/>
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image source={require("../assets/logo.png")}
            style={styles.iconImage}></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
              <Text style={light_theme ? styles.appTitleTextLight : styles.appTitleText}>App Narração de Histórias</Text>
            </View>
        </View> 
        <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={stories}
              renderItem={this.renderItem}
            />
          </View>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  cardContainer: {
    flex: 0.93
  }
});