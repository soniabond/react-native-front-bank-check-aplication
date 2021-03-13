
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback, Linking, ScrollView} from 'react-native';

import { withNavigation } from 'react-navigation';

class AddPrivatbankCard extends React.Component{

  constructor(props = { navigation }) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      merchantId: null,
      merchantSignature: null,
      cardNumber: null,
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
const data = {merchantId:this.state.merchantId, merchantSignature:this.state.merchantSignature, cardNumber: this.state.cardNumber};
fetch(`http://192.168.31.76:8080/api/v1/users/me/merchants/privat`, {
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
         <ScrollView>
        <View style={styles.container}>
   
    <View style = {styles.headerContainer}>
                <Text style = {styles.header}>Добавить аккаунт{'\n'}Privatbank</Text>
            </View>
            <View style={styles.iconsContainer}>
                <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='ID*' onChangeText={(inp) => this.setState({merchantId: inp})}/>
                <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='Пароль*' onChangeText={(inp) => this.setState({merchantSignature: inp})}/>
                <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='Номер карты*' onChangeText={(inp) => this.setState({cardNumber: inp})}/>
                <TouchableOpacity onPress={this.sendApi}><View style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Отправить</Text>
                </View></TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style = {styles.descriptionText}>
                * Чтобы получить данные мерчанта, перейдите по ссылке ниже. Войдите в ваш аккаут Privatbank.{'\n'}
                <Text>
                    <Text style={styles.linkText}
                  onPress={() => Linking.openURL('https://privatbank.ua')}>
                   https://privatbank.ua
                  </Text>
                </Text>
                {'\n'}
                {'\n'}
                 Далее: 'Усі послуги' → 'Бізнес' → 'Мерчант' → 'Реєстрація'. {'\n'}{'\n'}
                    1. Из списка выберете вашу карту. {'\n'}
                    2. В ip-adress введите 0.0.0.0{'\n'}
                    3. Нажмите 'Далі'.{'\n'}
                    4. Скопируйте пароль, который появился у вас на экране. Введите его в графу 'Пароль' в этом приложении.{'\n'}
                    5. Перейдите в 'мои мерчанты'. Скопируйте данные из колонки 'ID' и введите его в поле 'ID' в этом приложении.{'\n'}
                    6. Скопируйте данные из колонки 'Дебетна карта' и введите его в поле 'Номер карты' в этом приложении.{'\n'}
              </Text>
              {!this.state.isLoading ? Alert.alert("Успешно добавлен!") : null}
              

            </View>
            

      <StatusBar style="auto" />
    
    
    </View></ScrollView></TouchableWithoutFeedback>
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
    paddingBottom: 100
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
    marginBottom:26,
    paddingLeft: 10
},
submitButton: {
  width: 310,
  
  height: 60,

  borderRadius: 12,
  backgroundColor: '#323334',
  alignItems: 'center',
  
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


export default withNavigation(AddPrivatbankCard);