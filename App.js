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
  const curr = currencies.map(a => { return {label: a.cc, value: a.cc,  icon: () => <Image source={{ uri: `asset:/ic_flag_${a.cc}` }} style={styles.iconStyle} />}});
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
        <View style={styles.container}>
          <View style={[styles.row, {flexWrap: 'nowrap'}]}>
            <View style={styles.inputWrap}>
            <Text style={{height: 10, color: 'black', fontWeight: 'bold', fontSize: 10, marginBottom: 5, marginLeft: 10}}>FROM</Text>
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
            <Text style={{height: 10, color: 'black', fontWeight: 'bold', fontSize: 10, marginBottom: 5, marginLeft: 10}}>TO</Text>
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
          { visibility &&
          <>
           <View style={[{marginTop: 90, zIndex: -1, width: '90%'}]}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 10, marginBottom: -10, marginLeft: 0}}>AMOUNT</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeAmount}
                value={amount}
                keyboardType="numeric"
              />
          </View>
          <View style={[{width: '100%', zIndex: -1}]}>
            <TouchableOpacity 
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
          <View style={[styles.row, {flexWrap: 'nowrap', marginTop: 100, flex: 3, zIndex: -1}]}>
              <View style={styles.inputWrap}>
                <Text style={styles.inputCalculation}>{amount}{numberFrom}</Text>
              </View>
              <View style={styles.inputWrap}>
                <Text style={styles.inputCalculation}>{convertedTo}{numberTo}</Text>
              </View>
            </View>
            <View style={{minHeight: 60, textAlign: 'left', zIndex: -1}}>
              <Text style={{width: '80%', padding: 0, marginBottom: 10, textAlign: 'left', left: 0, alignItems: 'flex-start', zIndex: -1}}>{amount}{numberFrom} = {rate} {numberTo}</Text>
            </View>
            <View style={styles.row, {marginTop: 30, zIndex: -1}}>
              <Text>All figures are live mid-market rates, which are for information purpose only. To see the rates from money transfer, please select sending money option. </Text>
            </View>
          </>
          }
        </View>
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 16,
    padding: 16,
    borderWidth: 3,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  row: {
    flex: 1,
    flexDirection: "row"
  },
  rowWithSummary: {
    height: 80,
    flex: 1,
    marginTop: 100,
    flexDirection: 'row',
    alignContent: 'flex-start',

  },
  input: {
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 40,
    width: '100%',
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
  },
  inputCalculation: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 2,
    flexDirection: 'row',
    height: 40,
    width: '48%',
  },
  inputWrap: {
    margin: 10,
    flex: 1,
    marginBottom: 10
  },
  
  swapbuttonrow:{
    height: 50,
    textAlign: 'center',
    marginTop: 30,
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
  },
  
});

export default App;
