import * as React from 'react'; 
import { Button, View, Text, StyleSheet, Platform, Image, Pressable, Picker, TextInput,SafeAreaView, PermissionsAndroid, Alert} from 'react-native';
import {openSettings} from 'react-native-permissions';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import { jsonToCSV } from 'react-native-csv'
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends React.Component{

  constructor(props){
    super(props); 
    this.state={

      }
      this._Redirect = this._Redirect.bind(this);
    }

    _Redirect = async () =>{
      const value = await AsyncStorage.getItem('@SIGMA')
      console.log(value)
      if(value === null){
        Alert.alert(
          "Atenção",
          "Você não possui dados salvos!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }else{
        this.props.navigation.navigate('DownloadArquivo', value)
      }
    }
  

  // Método nativo do react, utilizado para carregar ou preencher elementos antes de renderizar a página. 
  componentDidMount = async () =>{
    try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const Read = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        const escrever = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
}catch{
  alert("ERROR")
}
  }
 


  render() {
    return (
      <View style={styles.container}>
            <Image
          style={styles.Image}
          source={require('../img/LogoSigma.png')}
        />
  
        <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('InfosFazenda')}>
       <Text style={styles.text}>Cadastrar pontos</Text>
     </Pressable> 
  
  
     <Pressable style={styles.button} onPress={() => this._Redirect()}>
       <Text style={styles.text}>Carregar dados salvos</Text>
     </Pressable> 
     
     </View>
    );
  }
}
 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 10,
      backgroundColor: '#47b377',
      padding: 8,
    },
    Image:{
      marginLeft:'25%',
      marginTop:-100,
      marginBottom:90,
      paddingBottom: 80,
    },
     button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#0f4571',
      marginTop:10
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color:'white',
    },
  
  });
 export default Home;