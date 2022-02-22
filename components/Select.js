import React,  { useState } from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Picker,
  TextInput,
  SafeAreaView,
  Modal,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const Select = ({ options, onChangeSelect, text, value}) => {
 
  const [ txt, setTxt ] = useState(text);
  const [modalVisible,setModalVisible] = useState(false);

  function renderOption(item) {
    return (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => {
          onChangeSelect(item.name);
          setTxt(item.name);
          setModalVisible(false);
        }}>
        <Text style={styles.optionTxt}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.txt} numberOfLines={1}>
          {value}
        </Text>
        <Icon name="caretdown" size={18} color={'#061013'} />
      </TouchableOpacity>
      <Modal

        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={{backgroundColor:"#00755c", height:'100%'}}>
          <View style={styles.headerModal}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="caretleft" size={18} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{text}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={options}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => renderOption(item)}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    marginHorizontal: 20,
    borderRadius: 0,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width:350,
    marginLeft: 12,
    marginTop:10,
    marginBottom:20
  },
  txt: {
    color: 'white',
    fontSize: 16,
    marginRight: 36,
    width:200,
  },
  headerModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 3,
    marginTop:15
  },
  modalTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft:25
  },
  modalCancel: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 10,
    color:'white'
  },
  optionTxt: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  label:{
    color:'#555',
    fontSize: 16,
    paddingLeft:20,
  }
});
export default Select;
