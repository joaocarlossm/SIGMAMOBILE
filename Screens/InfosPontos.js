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



class InfosPontos extends React.Component {

  constructor(props){
    super(props); 
    this.state={
        ponto:"1",
        tipoSolo:"Selecione o tipo de solo",
        ListaPontos:[],
        arquivo:[],
        progress:false,
      }
      this._onChangeText    = this._onChangeText.bind(this);
      this._onChangeSelect  = this._onChangeSelect.bind(this);
      this._SavePoint       = this._SavePoint.bind(this);
      this._GenarateCSV     = this._GenarateCSV.bind(this);
      
    }

    _GenarateCSV = () =>{
      const results = jsonToCSV(this.state.arquivo);
      var RNFS = require('react-native-fs');
      var path = RNFS.DownloadDirectoryPath+'/'+this.props.route.params.state.cliente+'.csv';
      RNFS.writeFile(path, results, 'utf8')
        .then((success) => {
          Download()
        })
        .catch((err) => {
          alert(err.message);
        });
}

    _onChangeSelect =(name) =>{
      this.setState({tipoSolo: [name]})
    }

    componentDidMount = () =>{
        this.setState({ListaPontos: this.props.route.params.ListPontos})

    }
   
    _onChangeText = (value, e) =>{
        this.setState({...this.state,[e]: value})
    }   
    _SavePoint = async () =>{
       let contem = this.state.ListaPontos.includes(parseInt(this.state.ponto))
       if(this.state.ponto === '0'){
        Alert.alert(
          "Atenção",
          "O ponto 0 não é um ponto válido.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
       }else if(this.state.ponto === ""){
  
        Alert.alert(
            "Atenção",
            "Informe o ponto a ser cadastrado!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
       }else if(this.state.tipoSolo === "Selecione o tipo de solo"){
        Alert.alert(
            "Atenção",
            "Informe o tipo de solo a ser cadastrado!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
       }else if(contem === true){
        let FilterPontos = this.state.ListaPontos.filter(opt=> opt !== parseInt(this.state.ponto))
        this.setState({ListaPontos: FilterPontos}, ()=> console.log(this.state.ListaPontos.length))
        showToastWithGravityAndOffset()
        if(this.props.route.params.state.increment === true){
            this.setState({ponto: String(parseInt(this.state.ponto) + 1)}, ()=>{console.log(this.state)})
        }else{
            console.log("INCREMENT: "+this.props.route.params.state.increment)
            this.setState({ponto: ""})
        }
        if(this.props.route.params.state.tipoSoloFixo === false){
          this.setState({tipoSolo: 'Selecione o tipo de solo'})
      }


        let Row = {"Cliente": ""+this.props.route.params.state.cliente+"", "Fazenda": ""+this.props.route.params.state.fazenda+"", "Talhão": ""+this.props.route.params.state.talhao+"", "Qtd_Pontos": ""+this.props.route.params.state.qtdpontos+"", "Ponto": ""+this.state.ponto+"", "Tipo de Solo": ""+this.state.tipoSolo+"" }
        this.state.arquivo.push(Row)
        await AsyncStorage.removeItem('@SIGMA');
        const jsonValue = JSON.stringify(this.state.arquivo)
        await AsyncStorage.setItem('@SIGMA', jsonValue)

        
       }else if(this.state.ponto <= this.props.route.params.ListPontos){
        Alert.alert(
            "Atenção",
            "Este ponto já esta cadastrado!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
       }else{
        Alert.alert(
            "Atenção",
            "Este ponto está fora da quantidade informada!",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
       }
    }

  render() {
    return (
     <View style={styles.second}>
      
 {this.state.ListaPontos.length > 0 ?
   <SafeAreaView style={styles.safeview}>
       
   <Text style={styles.text}>Ponto</Text>
       <TextInput
       style={styles.input}
        value={this.state.ponto}
        keyboardType="numeric"
        onChangeText={(e)=>{this._onChangeText(e,"ponto")}}
      />

 <Text style={styles.text}>Tipo de solo:</Text>
<Select options={List}
  onChangeSelect={(name)=>{this._onChangeSelect(name)}}
  text="Selecione o tipo de solo"
  value={this.state.tipoSolo}
  label="Tipo de solo"
  /> 
  
{this.state.ListaPontos.length > 5 ?
<Text style={styles.text}>Quantidade de pontos restantes: {this.state.ListaPontos.length}</Text>
: null}

{this.state.ListaPontos.length < 5 && this.state.ListaPontos.length > 0? <Text style={styles.text}>Pontos restantes: [{this.state.ListaPontos.map((opt,index) =>{ 
    if(index + 1 === this.state.ListaPontos.length){
        return opt+"]"
    }else{
        return opt+","
    }
    })}</Text>
:null
}


   </SafeAreaView>
    :
    <SafeAreaView style={styles.safeview}>
    <Text style={styles.arquivo}> Arquivo: {this.props.route.params.state.cliente}.csv</Text>
    </SafeAreaView>}


    {this.state.ListaPontos.length > 0 ?
         <Pressable style={styles.buttonDetails} onPress={() => this._SavePoint()}>
        <Text style={styles.text}>Continuar</Text>
      </Pressable>
      :
      <Pressable style={styles.buttonDetails} onPress={() => this._GenarateCSV()}>
        <Text style={styles.text}>Baixar Arquivo</Text>
      </Pressable>}
 
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

 export default InfosPontos;