import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert, AsyncStorage } from 'react-native';


export default class Register extends React.Component {


  constructor(props = { navigation }) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      email: '',
      password: '',
      name: '',
      resp: '',
      items: []
    };

  }

     pressHangler = () =>{
      
        console.log(this.state.email);
        console.log(this.state.password);
        var resp = this.callApi(this.state.email, this.state.password, this.state.name);
       
   
      }

      async _onValueChange(item, selectedValue) {
        try {
          await AsyncStorage.setItem(item, selectedValue);
        } catch (error) {
          console.log('AsyncStorage error: ' + error.message);
        }
      }

      async _onGetTokenVal() {
        try {
          var DEMO_TOKEN  = await AsyncStorage.getItem('TOKEN');
          console.log('TOKEN', DEMO_TOKEN);
        } catch (error) {
          console.log('AsyncStorage error1: ' + error.message);
          
        }
      }


    async callApi(email, password, name){
      const data = {email: email, password: password, firstName: name}
      fetch("http://192.168.31.76:8080/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
      }).then(response => response.json())

      .then(
        data =>
          this.setState({
          
            isLoading: false,
          })
      )
      .catch(error => this.setState({ error, isLoading: false }));
      
      };
      

  
    
registeredMessage(){
    Alert.alert("Вы успешно зарегистрированы! Теперь войдите в свой аккаунт!", 
    [
        {
          text: "Хорошо!",
          onPress: () => this.props.navigation.navigate('Login'),
         
        },
      ],);
}
  
    

  render(){


    return (
      
       <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        
          <View style={styles.container}>
     
            <View style = {styles.headerContainer}>
                  <Text style = {styles.header}>Давай{'\n'}зарегистрируемся{'\n'}сейчас</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>Всего пара кликов и готово</Text>
                <Text style={styles.iconStyle}>🤝</Text>
              </View>
              <View style={styles.iconsContainer}>
                  <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='Email' onChangeText={(inp) => this.setState({email: inp})}/>
                  <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='Пароль' onChangeText={(inp) => this.setState({password: inp})}/>
                  <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='Имя' onChangeText={(inp) => this.setState({name: inp})}/>
                  <TouchableOpacity onPress={this.pressHangler}><View style={styles.submitButton}>
                      <Text style={styles.submitButtonText}>Зарегистрироваться</Text>
                  </View></TouchableOpacity>
              </View>
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                 Уже есть аккаунт? </Text> 
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.signUpButon}>Войти</Text></TouchableOpacity>
              {!this.state.isLoading ? this.registeredMessage : null}
              </View>

  
        <StatusBar style="auto" />
      
      
      </View></TouchableWithoutFeedback>
    );
            
  } }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1
      
    },
    iconsContainer: {
        height: 296,
        width: 287, 
        marginLeft: 44,
        marginTop: 34,
        flexDirection: 'column',
        justifyContent: 'space-between',
        
    
      
    },
    descriptionContainer: {
      flexDirection: 'column',
      marginLeft: 34,
      marginTop: 16, 
      //height: 24,
  },

  footerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',  
    marginHorizontal: 100,
    paddingTop: 34,
    alignItems: 'center'
},
  descriptionText: {
    color: '#99A2AE',
    fontWeight: '400',
    fontSize: 18,
  
  },
  footerText: {
    color: '#99A2AE',
    fontSize: 14,
  
  },
  signUpButon: {
    fontSize: 14,
    color: '#006DFF'
  },
  linkText: {
    color: '#DA5552',
    
    fontSize: 16,
  
  },
  inputIcon: {
      width: 287,
      height: 60,
  
    
      fontSize: 14,
      backgroundColor: '#F8F9FC', 
      borderRadius: 12,
      padding: 14,

      color: '#2D2E30',
  },
  submitButton: {
    width: 287,
    
    height: 60,
  
    borderRadius: 12,
    backgroundColor: '#323334',
    alignItems: 'center',
    
  },
  submitButtonText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 22,
  },
   header: {
      //textAlign: 'center',
     
      color: '#2D2E30',
      fontSize: 34,
      fontWeight: '700',      
    
    },
    headerContainer:{
      //height: 110,
      //width: 303,
      marginTop: 60,
      marginLeft: 34,
      //marginBottom: 50
    },
    iconStyle: {
        marginTop: 14, 
        
        fontSize: 24,
    },
    
    
  
  
    
  });

  //export default withNavigation(Register);