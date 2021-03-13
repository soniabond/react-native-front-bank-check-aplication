import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';

class Login extends React.Component {


  constructor(props = { navigation }) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      email: '',
      password: '',
      resp: '',
      items: []
    };
  }

     pressHangler = () =>{
      
        console.log(this.state.email);
        console.log(this.state.password);
        var resp = this.callApi(this.state.email, this.state.password);
       
   
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


    async callApi(email, password){
      const data = {email: email, password: password}
      const resp = await fetch("http://192.168.31.76:8080/api/v1/token", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(data)
      });
      console.log(1);

  
    var val = await resp.json();
    console.log(2);
    await this._onValueChange('TOKEN', val.accessToken);
    console.log('VALUE', val)
    console.log( 'STORED', await this._onGetTokenVal())
    //return val;
    this.props.navigation.navigate('Home');

  }
    

  render(){


    return (
      
       <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        
          <View style={styles.container}>
     
      <View style = {styles.headerContainer}>
                  <Text style = {styles.header}>Привет!</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>Мы ждали твоего возвращения{'\n'}</Text>
                <Text style={{fontSize: 35}}>👇</Text>
              </View>
              <View style={styles.iconsContainer}>
                  <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='Email' onChangeText={(inp) => this.setState({email: inp})}/>
                  <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='Пароль' onChangeText={(inp) => this.setState({password: inp})}/>
                  <TouchableOpacity onPress={this.pressHangler}><View style={styles.submitButton}>
                      <Text style={styles.submitButtonText}>Отправить</Text>
                  </View></TouchableOpacity>
              </View>
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                  Нет учетной записи? </Text> 
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('RegisterScreen')}><Text style={styles.signUpButon}>Зарегистрироваться</Text></TouchableOpacity>
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
       // marginTop: 10,
        //paddingTop: 20,
        flexDirection: 'column',
        backgroundColor: 'white',
        alignItems: 'center',
    
      
    },
    descriptionContainer: {
      flexDirection: 'column',
      backgroundColor: 'white',  
      paddingHorizontal: 30,
      paddingBottom: 30
  },

  footerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',  
    paddingHorizontal: 40,
    paddingTop: 120,
    alignItems: 'center'
},
  descriptionText: {
    color: '#99A2AE',
    
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
      width: 320,
      height: 60,
  
    
      fontSize: 16,
      backgroundColor: '#F8F9FC', 
      borderRadius: 12,
      alignItems: 'center',
      marginBottom:26,
      paddingHorizontal: 16
  },
  submitButton: {
    width: 320,
    
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
    marginTop: 20,
  },
   header: {
      //textAlign: 'center',
      paddingTop: 15,
      color: '#2D2E30',
      fontSize: 34,
      fontWeight: 'bold',
      marginLeft: 30,
  
      
    
    },
    headerContainer:{
      height: 80,
      marginTop: 2,
      //marginBottom: 50
    },
    
    
  
  
    
  });
  

//export default withNavigation({ navigation });
export default withNavigation(Login);
