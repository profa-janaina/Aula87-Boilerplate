import {React, useState, useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Platform, StatusBar, TextInput, Button, Alert } from 'react-native';
import * as Font from "expo-font";
import * as SplashScreen from 'expo-splash-screen';
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from 'react-native-virtualized-view'

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../config';
import {getDatabase, onValue, ref,update} from 'firebase/database';

SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

//CUIDADO COM O NOME DA TELA
export default function CreateStoryScreen() {
  const[fontsLoaded,setFontsLoaded] = useState(false);
  const[previewImage, setPreviewImage] = useState('image_1')
  const[ dropdownHeight, setDropDownHeight] = useState(40)
  const [open, setOpen] = useState(false);
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
  let  preview_images = {
    image_1: require('../assets/story_image_1.png'),
    image_2: require('../assets/story_image_2.png'),
    image_3: require('../assets/story_image_3.png'),
    image_4: require('../assets/story_image_4.png'),
    image_5: require('../assets/story_image_5.png'),
}

  return (
    <View style={light_theme ? styles.containerLight : styles.container}>
      <SafeAreaView style={styles.droidSafeArea}/>
      <View style={styles.appTitle}>
        <View style={styles.appIcon}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.iconImage}
          ></Image>
        </View>
        <View style={styles.appTitleTextContainer}>
          <Text style={light_theme ? styles.appTitleTextLight : styles.appTitleText}>Nova História</Text>  
        </View>
      </View>

      <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source={preview_images[previewImage]}
                style={styles.previewImage}
              ></Image>
              <View style={{ height: RFValue(dropdownHeight) }}>
                <DropDownPicker
                  open={open}
                  setOpen={setOpen}
                  items={[
                    { label: "Image 1", value: "image_1" },
                    { label: "Image 2", value: "image_2" },
                    { label: "Image 3", value: "image_3" },
                    { label: "Image 4", value: "image_4" },
                    { label: "Image 5", value: "image_5" }
                  ]}
                  defaultValue={previewImage}
                  
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10
                  }}
                  onOpen={() => {
                     setDropDownHeight(300);
                  }}
                  onClose={() => {
                    setDropDownHeight(40);
                  }}
                  style={{ 
                    backgroundColor: "transparent", 
                    borderWidth: 1,
                    borderColor: 'white', }}

                  textStyle={{
                      color: dropdownHeight == 300 ? 'black' : 'white',
                      fontFamily: 'Bubblegum-Sans',
                      marginTop: RFValue(5),
                  }}

                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  dropDownStyle={light_theme ? "#eee" : "#2f345d"}
                  labelStyle={light_theme ? styles.dropdownLabelLight : styles.dropdownLabel}
                  arrowStyle={light_theme ? styles.dropdownLabelLight : styles.dropdownLabel}
                  onSelectItem={ (item) => setPreviewImage(item.value)
                  }
                />
              </View>

              <TextInput
                style={light_theme ? styles.inputFontLight : styles.inputFont}
                onChangeText={title => ({ title })}
                placeholder={"Título"}
                placeholderTextColor={light_theme ? "black" : "white"}
              />

              <TextInput
                style={[
                  light_theme ? styles.inputFontLight : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={author => ({ author })}
                placeholder={"Autor"}
                placeholderTextColor={light_theme ? "black" : "white"}
              />

              
              <TextInput
                style={[
                  light_theme ? styles.inputFontLight : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={description => ({ description })}
                placeholder={"Descrição"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={light_theme ? "black" : "white"}
              />
              <TextInput
                style={[
                  light_theme ? styles.inputFontLight : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={story => ({ story })}
                placeholder={"História"}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor={light_theme ? "black" : "white"}
              />

              <TextInput
                style={[
                  light_theme ? styles.inputFontLight : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig
                ]}
                onChangeText={moral => ({ moral })}
                placeholder={"Moral da História"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor={light_theme ? "black" : "white"}
              />    
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
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
  fieldsContainer: {
    flex: 0.85
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
    fontFamily: "Bubblegum-Sans"
  },
  dropdownLabel: {
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  dropdownLabelLight: {
    color: "black",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontExtra: {
    marginTop: RFValue(15)
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5)
  }
});