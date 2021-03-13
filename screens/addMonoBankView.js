
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback, Linking, Alert} from 'react-native';

import { withNavigation } from 'react-navigation';

class AddMonobankCard extends React.Component{

  constructor(props = { navigation }) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      xToken: null,
      isLoading: true,
      textInput: null,
    };
    this.sendApi = this.sendApi.bind(this);
    
  }



async  _onGetTokenVal() {
  try {
    var DEMO_TOKEN  = await AsyncStorage.getItem('TOKEN');
    return DEMO_TOKEN;
  } catch (error) {
    console.log('AsyncStorage error1: ' + error.message);
    
  }
}


async sendApi(){
var token = await this._onGetTokenVal();
  //console.log('HOME', token);
const data = {xtoken: this.state.xToken};
fetch(`http://192.168.31.76:8080/api/v1/users/me/merchants/mono`, {
  method: "POST",
  headers:  {'Authorization': 'Bearer '+token, 'Content-Type': 'application/json'},   
  body:  JSON.stringify(data)
})
.then(response => response.json())
.then(
  data =>
    this.setState({
      isLoading: false,
    })
)
.catch(error => this.setState({ error, isLoading: false }));

}





componentDidMount(){
 // this.sendApi();
}





render(){



  return (
    
     <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles.container}>
   
    <View style = {styles.headerContainer}>
                <Text style = {styles.header}>Добавить аккаунт{'\n'}Monobank</Text>
            </View>
            <View style={styles.iconsContainer}>
                <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='X-token*' onChangeText={(inp) => this.setState({xToken: inp})}/>
                <TouchableOpacity onPress={this.sendApi}><View style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Отправить</Text>
                </View></TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style = {styles.descriptionText}>
                * Чтобы получить x-Token перейдите по ссылке ниже, войдите в ваш аккаут Monobank и скопируйте сгенерированный x-Token.
              </Text>
              <Text style={styles.linkText}
                  onPress={() => Linking.openURL('https://api.monobank.ua/')}>
                   https://api.monobank.ua/
                  </Text>
                {!this.state.isLoading ? Alert.alert("Успешно добавлен!") : null}
            </View>

      <StatusBar style="auto" />
    
    
    </View></TouchableWithoutFeedback>
  );
          }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
    
  },
  iconsContainer: {
      //flex: 1,
      marginTop: 10,
      paddingTop: 20,
      flexDirection: 'column',
      backgroundColor: 'white',
      alignItems: 'center',
  
    
  },
  descriptionContainer: {
    //flex: 1,
    marginTop: 10,
    paddingTop: 20,
    flexDirection: 'column',
    backgroundColor: 'white',
    //alignItems: 'center',  
    paddingHorizontal: 30,
},
descriptionText: {
  color: '#99A2AE',
  
  fontSize: 16,

},
linkText: {
  color: '#DA5552',
  
  fontSize: 16,

},
inputIcon: {
    width: 310,
    height: 60,

  
    fontSize: 20,
    backgroundColor: '#F8F9FC', 
    borderRadius: 12,
    alignItems: 'center',
 
    paddingLeft: 10
},
submitButton: {
  width: 310,
  
  height: 60,

  borderRadius: 12,
  backgroundColor: '#323334',
  alignItems: 'center',
  marginTop: 26
},
submitButtonText: {
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 16,
  color: '#FFFFFF',
  textAlign: 'center',
  marginTop: 18,
},
 header: {
    //textAlign: 'center',
    paddingTop: 15,
    color: '#2D2E30',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,

    
  
  },
  headerContainer:{
    height: 80,
    marginTop: 2,
    marginBottom: 50
  },
  
  


  
});


export default withNavigation(AddMonobankCard);