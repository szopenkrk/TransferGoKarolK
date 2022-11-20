import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'

const App = () => {
  const [numberFrom, onChangeNumberFrom] = React.useState("");
  const [numberTo, onChangeNumberTo] = React.useState("");
  const [amount, onChangeAmount] = React.useState("0");

  const data = [
    {key:'1', value:'Mobiles', disabled:true},
    {key:'2', value:'Appliances'},
    {key:'3', value:'Cameras'},
    {key:'4', value:'Computers', disabled:true},
    {key:'5', value:'Vegetables'},
    {key:'6', value:'Diary Products'},
    {key:'7', value:'Drinks'},
  ];

  const callApi = async (from, to, amount) => {
    try {
      const response = await fetch(`https://my.transfergo.com/api/fx-rates?from=${from}&to=${to}&amount=${amount}`);
      const json = await response.json();
      console.log(json);
    }catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView>
      <View tyle={{ height: '100%', backgroundColor: 'powderblue'}}>
        <View style={styles.row}>
          <View style={styles.inputWrap}>
            <SelectList
              style={styles.input} 
              setSelected={(val) => onChangeNumberFrom(val)} 
              data={data} 
              save="value"
            />
          </View>
          <View style={styles.inputWrap}>
            <SelectList
              style={styles.input} 
              setSelected={(val) => onChangeNumberTo(val)} 
              data={data} 
              save="value"
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
    backgroundColor:'#1E6738',
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
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
