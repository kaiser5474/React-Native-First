import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Alert, Pressable, Modal, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '../components/Themed';
import {useTailwind} from 'tailwind-rn';

const listName = [
  {title: 'A', data: ['Amaya', 'Anabel', 'Alberto']},
  {title: 'B', data: ['Bartolome', 'Bryan', 'Braulio']},
  {title: 'C', data: ['Carlos', 'Camila', 'Cosme']},
  {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
  {title: 'J', data: ['Jarvis', 'Juan', 'James', 'Jillian', 'Jimmy']},
]

export default function TabThreeScreen() {

  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEditVisible, setModalEditVisible] = useState(false);

  useEffect(() => {
    setNames(listName);
  }, [])  

  const FlatListItemSeparator = (item: any, section: any) => {
    
    return (
      //Item Separator
      <View style={[
        styles.container,
        {
          flexDirection: "row",
          alignContent: "space-between",
        },
      ]}>
        <Text style={tailwind('flex-1 p-2 text-lg')}>{item} </Text>
        <View style={tailwind('mr-2')}>
          <FontAwesome.Button name="eye" style={tailwind('bg-yellow-300')} onPress={() => handlerWatch(item)} iconStyle={{marginRight: 0}} size={40}/>
        </View>
        <View style={tailwind('mr-2')}>
          <FontAwesome.Button name="edit" style={tailwind('bg-sky-600')} onPress={() => handlerEdit(item)} iconStyle={{marginRight: 0}} size={40}/>
        </View>
        <View style={tailwind('mr-2')}>
          <FontAwesome.Button name="trash" style={tailwind('bg-rose-600')} onPress={() => showConfirmDialog(section.title, item)} iconStyle={{marginRight: 0}} size={40}/>
        </View>
        </View>
      // 
    );
  };

  const handlerDelete = (title: any, item: any) => {
    const listName2:any = names.map((names: any) => {
      if(names.title === title){
        let namesActualizados = {title: names.title, data:[]};
        namesActualizados.data = names.data.filter((name: any)=>{
          if(name !== item){
            return name;
          }
        })
        return namesActualizados;
      }else{
        return names;
      }
    });
    Alert.alert('Contact Remove');
    setNames(listName2);    
  }
  const handlerEdit = (item: any) => {
    setNameEdit(item);
    onChangeName();
    setModalEditVisible(true);
  }  
  const handlerWatch = (item: any) => {
    setName(item);
    setModalVisible(true);
  }

  const showConfirmDialog = (title: String, item: any) => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this contact?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            handlerDelete(title, item);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const onChangeName = () => {
    const x:any = [
      {title: 'A', data: ['Amaya', 'Anabel', 'Alberto']},
      {title: 'B', data: ['Bartolo', 'Bryan', 'Braulio']},
      {title: 'C', data: ['Carlos', 'Camila', 'Cosme']},
      {title: 'D', data: ['Devin', 'Dan', 'Dominic']},
      {title: 'J', data: ['Jarvis', 'Juan', 'James', 'Jillian', 'Jimmy']},
    ]
    setNames(x);
  }

  const tailwind = useTailwind();
  return (    
    <>
      {/* Modal de Ver los datos del contacto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Contact Name: {name}</Text> */}
            <Text style={tailwind('font-bold text-lg')}>Contact Name: {name}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Fin Modal de Ver los datos del contacto */}

      {/* Modal to Edit Contact */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalEditVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Name Edit: </Text>
            <TextInput
              style={styles.input}
              onChangeText={setNameEdit}
              value={nameEdit}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalEditVisible(!modalEditVisible)}
            >
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalEditVisible(!modalEditVisible)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/*Fin Modal to Edit Contact */}

    <View style={styles.container}>
      <SectionList
        sections={names}
        renderItem={({item, section}) => FlatListItemSeparator(item, section) }
        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => item + index}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,    
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {    
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  container: {
    flex: 1,
    paddingTop: 5
   },
   sectionHeader: {
     paddingTop: 5,
     paddingLeft: 10,
     paddingRight: 10,
     paddingBottom: 5,
     fontSize: 20,
     fontWeight: 'bold',
     backgroundColor: '#89928a',
     marginTop: 10,
     color: '#fff',
   },
 
   button: {
    marginRight: 10
  },
  input: {
    height: 50,
    borderWidth: 1,
    padding: 5,
    fontSize: 25,
  },
});
