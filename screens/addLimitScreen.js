
import { StatusBar } from 'expo-status-bar';import { thru } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity, AsyncStorage, TouchableWithoutFeedback,Linking, ScrollView} from 'react-native';


import { withNavigation } from 'react-navigation';

class ChangeLimit extends React.Component{

  constructor(props = { navigation }) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isLoadingOldLimit: true,
      catName: this.props.navigation.getParam('categoryName'),
      newLimit: '',
      oldLimit: '',
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
  console.log("HELLO");
var token = await this._onGetTokenVal();
  //console.log('HOME', token);
const data = {categoryName:this.state.catName, newLimit:this.state.newLimit};
fetch(`http://192.168.31.76:8080/api/v1/users/me/categories/limits/add`, {
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

async sendApiOldLimit(){
  var token = await this._onGetTokenVal();
  //console.log('HOME', token);
const data = {category:this.state.catName};
fetch(`http://192.168.31.76:8080/api/v1/users/me/categories/limit?categoryName=${encodeURIComponent(data.category)}`, {
  method: "GET",
  headers:  {'Authorization': 'Bearer '+token},   
})
.then(response => response.json())
.then(
  data =>
    this.setState({
      isLoadingOldLimit: false,
      oldLimit: data.limit,
    })
)
.catch(error => this.setState({ error, isLoading: false }));
  }
  
pressHandler(){
  this.sendApi();
}




componentDidMount(){
  this.sendApiOldLimit();
}



render(){


  return (
    
     
        <View style={styles.container}>
   <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
         <ScrollView>
    <View style = {styles.headerContainer}>
                <Text style = {styles.header}>Изменить лимит для{'\n'}"{this.state.catName}"</Text>
            </View>
            <View style={styles.iconsContainer}>
                <View style={styles.inputIcon}>
                    <Text style={styles.oldLimitText}>Текущий лимит</Text>
                    <Text style={styles.oldLimitAmount}>{!this.state.isLoadingOldLimit ? this.state.oldLimit : '...'}</Text>
                </View>
                <TextInput clearButtonMode='always' style={styles.inputIcon} placeholder='Новый лимит' onChangeText={(inp) => this.setState({newLimit: inp})}/>
                <TouchableOpacity onPress={this.sendApi}><View style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Изменить</Text>
                </View></TouchableOpacity>
            </View>
     
      <StatusBar style="auto" />
    
    </ScrollView></TouchableWithoutFeedback>
    </View>
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
    
    marginBottom:26,
    paddingHorizontal: 23
},
oldLimitText: {
  marginTop: 12, 
  //marginBottom: 6,
  fontSize: 12, 
  fontWeight: '600',
  color: '#99A2AE',
},
oldLimitAmount: {
  fontSize: 24, 
  fontWeight: '600',
  color: '#2D2E30',
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


export default withNavigation(ChangeLimit);