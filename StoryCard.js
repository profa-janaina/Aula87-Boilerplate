import React, { Component, useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../config';
import {getDatabase, onValue, ref,update} from 'firebase/database';


SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

//Mudar o nome da tela
export default function StoryCardScreen({story, navigation}) {
const[fontsLoaded,setFontsLoaded] = useState(false);
const[light_theme, setlight_theme] = useState(true); 

const loadFontsAsync = async () => {
  await Font.loadAsync(customFonts);
  setFontsLoaded(true);
}

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
}

useEffect(() =>{
loadFontsAsync();
fecthUser();
})

  if (fontsLoaded) {
    SplashScreen.hideAsync();
    return (
      <TouchableOpacity 
        style={styles.container}
        onPress={() => navigation.navigate("Tela de Histórias" , {
          story: story
          
        })}>
        
        <View style={light_theme ? styles.cardContainerLight : styles.cardContainer}>
            <Image source={require("../assets/story_image_1.png")}
            style={styles.storyImage}></Image>
          
          <View style={styles.titleContainer}>
              <Text style={light_theme ? styles.storyTitleTextLight : styles.storyTitleText}>{story.title}</Text>
              <Text style={light_theme ? styles.storyAuthorTextLight : styles.storyAuthorText}>{story.author}</Text>
              <Text style={light_theme ? styles.descriptionTextLight : styles.descriptionText}>{story.description}</Text>
              
          </View>
          
        <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={light_theme ? 'black' : 'white'} />
                <Text style={light_theme ? styles.likeTextLight : styles.likeText}>12k</Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
    
    );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    cardContainer: {
      margin: RFValue(13),
      backgroundColor: "#2f345d",
      borderRadius: RFValue(20)
    },
    cardContainerLight: {
      margin: RFValue(13),
      backgroundColor: 'white',
      borderRadius: RFValue(20),
      shadowColor: 'rgb(0, 0, 0)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: RFValue(0.5),
      shadowRadius: RFValue(5),
      elevation: RFValue(2),
    },
    storyImage: {
      resizeMode: "contain",
      width: "95%",
      alignSelf: "center",
      height: RFValue(250)
    },
    titleContainer: {
      paddingLeft: RFValue(20),
      justifyContent: "center"
    },
    storyTitleText: {
      fontSize: RFValue(25),
      fontFamily: "Bubblegum-Sans",
      color: "white"
    },
    storyTitleTextLight: {
      fontFamily: 'Bubblegum-Sans',
      fontSize: RFValue(25),
      color: 'black',
    },
    storyAuthorText: {
      fontSize: RFValue(18),
      fontFamily: "Bubblegum-Sans",
      color: "white"
    },
    storyAuthorTextLight: {
      fontFamily: 'Bubblegum-Sans',
      fontSize: RFValue(18),
      color: 'black',
    },
    descriptionText: {
      fontFamily: "Bubblegum-Sans",
      fontSize: 13,
      color: "white",
      paddingTop: RFValue(10)
    },
    descriptionTextLight: {
      fontFamily: 'Bubblegum-Sans',
      fontSize: RFValue(13),
      color: 'black',
    },
    actionContainer: {
      justifyContent: "center",
      alignItems: "center",
      padding: RFValue(10)
    },
    likeButton: {
      width: RFValue(160),
      height: RFValue(40),
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      backgroundColor: "#eb3948",
      borderRadius: RFValue(30)
    },
    likeText: {
      color: "white",
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(25),
      marginLeft: RFValue(5)
    },
    likeTextLight: {
      fontFamily: 'Bubblegum-Sans',
      fontSize: 25,
      marginLeft: 25,
      marginTop: 6,
    },
  });
