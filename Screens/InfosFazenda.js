import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, Pressable, Picker, TextInput,SafeAreaView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob'
class InfosFazenda extends React.Component {

  constructor(props){
    super(props); 
    this.state={
        fazenda:"",
        cliente:"",
        talhao:"",
        qtdpontos:"",
        increment:false,
        tipoSoloFixo:false,
        fileExist:'',
      }
      this._onChangeText    = this._onChangeText.bind(this);
      this._onChangeChecked = this._onChangeChecked.bind(this);
      this._SaveInfos       = this._SaveInfos.bind(this);
    }
   
    _onChangeText = (value, e) =>{
        this.setState({...this.state,[e]: value}, ()=>{console.log(this.state)})
    }   

    _onChangeChecked = (value, e) =>{
        this.setState({...this.state,[e]: !this.state[e]}, ()=>{console.log(this.state)})
    }

    _SaveInfos = () =>{
      var RNFS = require('react-native-fs');
      let existe = false
      var path = RNFS.DownloadDirectoryPath+'/'+this.state.talhao+'.csv';
      RNFetchBlob.fs.exists(path)
      .then((exist) => {
      if(exist === true){
      Alert.alert(
                "Atenção",
                "Já existe um arquivo com este nome no seu diretório. Altere o nome do talhão ou exclua o arquivo existente.",
                [
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              );
      }else{
        let ListNumbers =[];
        if(this.state.fazenda === ""){
          alert("Informe a Fazenda a ser cadastrada!")
        }
        else if(this.state.cliente === ""){
          alert("Informe o Cliente a ser cadastrado!")
        }
        else if(this.state.talhao === ""){
          alert("Informe o Talhão a ser cadastrado!")
        }
        else if(this.state.qtdpontos === ""){
          alert("Informe o a Quantidade de Pontos a ser cadastrada!")
        }else {
          for (var i = 1; i <= this.state.qtdpontos; i++) {
            ListNumbers.push(i)
         }
         
         return(  
            this.props.navigation.navigate('InfosPontos',{state: this.state, ListPontos: ListNumbers})
         )
         }
        }
      })
    }


  render() {
    return (
     <View style={styles.second}>
   <SafeAreaView style={styles.safeview}>
       
   <Text style={styles.text}>Fazenda</Text>
       <TextInput
       style={styles.input}
        value={this.state.fazenda}

        onChangeText={(e)=>{this._onChangeText(e,"fazenda")}}
      />

   <Text style={styles.text}>Cliente</Text>
       <TextInput
       style={styles.input}
        value={this.state.cliente}
        onChangeText={(e)=>{this._onChangeText(e, "cliente")}}
      />


<Text style={styles.text}>Talhão</Text>
       <TextInput
       style={styles.input}
        value={this.state.talhao}
        onChangeText={(e)=>{this._onChangeText(e, "talhao")}}
      />

<Text style={styles.text}>Quantidade de pontos</Text>
       <TextInput
       style={styles.input}
        value={this.state.qtdpontos}
        onChangeText={(e)=>{this._onChangeText(e,"qtdpontos")}}
        keyboardType="numeric"
      />

      <View style={styles.checkboxContainer}>
        <Pressable
        style={[styles.checkboxBase, this.state.increment && styles.checkboxChecked]}
        onPress={(e)=>{this._onChangeChecked(e, 'increment')}}>
        {this.state.increment && <Ionicons style={styles.icon} name="check" size={20} color="white" />}
      </Pressable>
      <Text style={styles.text}>Coleta sequencial</Text>
      </View>
      
      <View style={styles.checkboxContainer}>

        <Pressable
        style={[styles.checkboxBase, this.state.tipoSoloFixo && styles.checkboxChecked]}
        onPress={(e)=>{this._onChangeChecked(e, 'tipoSoloFixo')}}>
        {this.state.tipoSoloFixo && <Ionicons style={styles.icon} name="check" size={20} color="white" />}
      </Pressable>
      <Text style={styles.text}>Tipo de solo fixo</Text>
      </View>

   </SafeAreaView>
         <Pressable style={styles.buttonDetails} onPress={() =>this._SaveInfos()}>
        <Text style={styles.text}>Continuar</Text>
      </Pressable>
  
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingTop: 0,
      backgroundColor: '#00c16c',
      padding: 8,
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    Image:{
      marginLeft:'25%',
      marginTop:-100,
      marginBottom:10,
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
      marginTop:60
    },
    text: {
      fontSize: 18,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    second:{
       flex: 1,
      justifyContent: 'center',
      paddingTop: 0,
      backgroundColor: '#00755c',
      padding: 8,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color:'white',
      fontSize:18,
      
  
    },
    safeview:{
      marginBottom:280,
    },
    buttonDetails:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#0f4571',
      marginTop:-200,
    },
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
      backgroundColor: 'transparent', // makes the area around and inside the checkbox red
      borderColor: 'black',   // does nothing
      borderStyle: 'dotted' , // does nothing
      marginRight: 8
  
    },
    checkboxBase: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'black',
      backgroundColor: 'transparent',
      marginRight: 8
    },
  
    checkboxChecked: {
      backgroundColor: 'black',
    },
  });

 export default InfosFazenda;