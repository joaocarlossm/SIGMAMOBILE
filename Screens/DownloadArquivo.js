import * as React from 'react';
import { Button, View, Text, StyleSheet, Image, Pressable, Picker, TextInput,SafeAreaView,ToastAndroid,  Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Select from '../components/Select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { jsonToCSV } from 'react-native-csv'

const List = [{id:'1',name:'TA'},{id:'2',name: 'TV'}, {id:'3', name:'CA'},{id:'4',name:'PE'},{id:5, name:'TC'},{id:6,name:'TP'}, {id:'7', name:'TB'}, {id:'8', name:'LG'},{id:'9', name:'AR'},{id:'10', name:'BR'},{id:'11', name:'TOA'}]
const values = [
    ['build', '2017-11-05T05:40:35.515Z'],
    ['deploy', '2017-11-05T05:42:04.810Z']
  ];
const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Ponto cadastrado com sucesso!!!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    ); 
  };

const Download = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Arquivo baixado com sucesso",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    ); 
  };



class DownloadArquivo extends React.Component {

  constructor(props){
    super(props); 
    this.state={
        ponto:"1",
        tipoSolo:"Selecione o tipo de solo",
        ListaPontos:[],
        arquivo:[],
        progress:false,
        cliente: ''
      }

      this._GenarateCSV     = this._GenarateCSV.bind(this);
      
    }

    _GenarateCSV = () =>{
      var obj = JSON.parse(this.props.route.params);
      const results = jsonToCSV(obj);
      var RNFS = require('react-native-fs');
      var path = RNFS.ExternalStorageDirectoryPath+'/'+this.state.cliente+'.csv';
      RNFS.writeFile(path, results, 'utf8')
        .then((success) => {
          Download()
        })
        .catch((err) => {
          alert(err.message);
        });
}

    componentDidMount = () =>{
      console.log('PROPS')
      var contact = JSON.parse(this.props.route.params);
      this.setState({cliente: contact[0]['Cliente']})
    }
   

  render() {
    return (
     <View style={styles.second}>
    
    <SafeAreaView style={styles.safeview}>
    <Text style={styles.arquivo}> Arquivo: {this.state.cliente}.csv</Text>
    </SafeAreaView>

      <Pressable style={styles.buttonDetails} onPress={() => this._GenarateCSV()}>
        <Text style={styles.text}>Baixar Arquivo</Text>
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
    marginTop:0,
    marginBottom:30,
  },
  text: {
    fontSize: 16,
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
    marginBottom:150,
  },
  buttonDetails:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0f4571',
    marginTop:-40
  },
  infosqtd:{
    marginTop:10,
    marginLeft:15,
    fontSize:15,
    fontWeight: 'bold',
  },
  arquivo: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    marginLeft:'20%',
    color: 'white',
  },
});

 export default DownloadArquivo;