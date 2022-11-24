import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import currencies from './currencies.json';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [numberFrom, setNumberFrom] = React.useState("");
  const [numberTo, setNumberTo] = React.useState("");
  const [amount, onChangeAmount] = React.useState("0");
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [convertedTo, setConvertedTo] = useState(""); 
  const [rate, setupRate] = useState("");
  const curr = currencies.map(a => { return {label: a.cc, value: a.cc}});
  const [items, setItems] = useState(curr);
  const [visibility, setVisibility] = useState(true);

  const callApi = async (from, to, amount) => {
    if(!numberFrom || !numberTo) {
      alert('Set values to convert')
      return true
    }
    setVisibility(false);
    try {
      const response = await fetch(`https://my.transfergo.com/api/fx-rates?from=${from}&to=${to}&amount=${amount}`);
      const json = await response.json();
      console.log(json);
      setConvertedTo(json.toAmount);
      setupRate(json.rate);
    }catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <SafeAreaView>
        <View >
          <View style={styles.row}>
            <View style={styles.inputWrap}>
            <DropDownPicker
                placeholder="Select"
                open={openFrom}
                value={numberFrom}
                items={items}
                listMode="FLATLIST"
                setValue={setNumberFrom}
                setOpen={setOpenFrom}
                zIndex={200}
              />
            </View>
            <View style={styles.swapbuttonrow}>
            <Icon.Button name="swap-horiz" size={30} color="#00BFFF" backgroundColor="#ffffff"/>
            </View>
            <View style={styles.inputWrap}>
              <DropDownPicker
                placeholder="Select"
                open={openTo}
                value={numberTo}
                items={items}
                listMode="FLATLIST"
                setValue={setNumberTo}
                setOpen={setOpenTo}
                zIndex={200}
              />
            </View>
          </View>
          {/* Hidden element after search data */}
          { visibility &&
          <>
          <View style={styles.row, {marginTop: 80, zIndex: -1}}>
              <TextInput
                style={styles.input}
                onChangeText={onChangeAmount}
                value={amount}
                placeholder="0"
                keyboardType="numeric"
              />
          </View>
          <View style={{zIndex: -1}}>
            <TouchableOpacity 
              zIndex="0"
              style={styles.convertButton} 
              title="Convert" 
              onPress={()=> callApi(numberFrom, numberTo, amount)}
            >
              <Text style={styles.convertText}>Convert</Text>
            </TouchableOpacity>
          </View>
          </>
          }
          {/* Results */}
          { rate && 
          <>
            <View style={styles.row, {marginTop: 70}}>
              <Text style={{width: '80%', padding: 10}}>{amount}{numberFrom} = {rate} {numberTo}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.inputWrap}>
              <TextInput
                  style={styles.input, {zIndex: -1} }
                  value={amount}
                  keyboardType="numeric"
                />

              </View>
              <View style={styles.inputWrap}>
              <TextInput
                  style={styles.input, {zIndex: -1}}
                  value={convertedTo}
                />
              </View>
            </View>
           
            {/* <View>
              <Text>All figures are live mid-market rates, which are for information purpose only. To see the rates from money transfer, please select sending money option. </Text>
            </View> */}
          </>
          }
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
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
    marginBottom: 10
  },
  row: {
    height: 80,
    flex: 1,
    flexDirection: "row"
  },
  swapbuttonrow:{
    height: 50,
    textAlign: 'center',
    marginTop: 10,
    backgroundColor: 'white'
  },
  convertButton: {
    backgroundColor:'#32CD32',
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderWidth: 1,
    borderColor: '#fff',
    zIndex: -1
  },
  convertText: {
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  iconStyle: {
    width: '100%', 
    height: 200,
    resizeMode : 'contain' 
  }
  
});

export default App;
