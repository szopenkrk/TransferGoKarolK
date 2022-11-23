import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DropDownPicker from 'react-native-dropdown-picker';
import currencies from './currencies.json';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [numberFrom, onChangeNumberFrom] = React.useState("");
  const [numberTo, onChangeNumberTo] = React.useState("");
  const [amount, onChangeAmount] = React.useState("0");
  const [open, setOpen] = useState(false);
  const curr = currencies.map(a => { return {key: a.cc, value: a.cc}});

  const callApi = async (from, to, amount) => {
    try {
      const response = await fetch(`https://my.transfergo.com/api/fx-rates?from=${from}&to=${to}&amount=${amount}`);
      const json = await response.json();
      console.log(json);
    }catch (error) {
      console.error(error);
    }
  }
  console.log('ASD', currencies.map(a => { return {key: a.cc, value: a.cc}}));
  const [items, setItems] = useState(curr);
  return (
    <>
      <SafeAreaView>
        <View tyle={{ height: '100%',}}>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <SelectList
                style={styles.input, {zIndex: 100}} 
                maxHeight='200'
                data={currencies.map(a => { return {key: a.cc, value: a.cc}})}
                dropDownDirection="TOP"
                theme="LIGHT"
                listMode="SCROLLVIEW"
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
              />
            </View>
            <Icon.Button name="swap_horiz" backgroundColor="#3b5998"></Icon.Button>
            <View style={styles.inputWrap}>
            <DropDownPicker
              open={open}
              items={items}
              theme="DARK"
              listMode="FLATLIST"
              setItems={setItems}
              setOpen={setOpen}
            />
            </View>
          </View>
          <View style={styles.row, {marginTop: 80}}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeAmount}
                value={amount}
                placeholder="0"
                keyboardType="numeric"
              />
          </View>
          <View>
          <TouchableOpacity 
            style={styles.convertButton} 
            title="Convert" 
            onPress={()=> callApi('USD', 'PLN', '100')}
          >
            <Text style={styles.convertText}>Convert</Text>
          </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputWrap: {
    margin: 10,
    flex: 1,
    height: 80,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  row: {
    height: 80,
    flex: 1,
    flexDirection: "row"
  },
  convertButton: {
    backgroundColor:'#32CD32',
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  convertText: {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }
  
});

export default App;
