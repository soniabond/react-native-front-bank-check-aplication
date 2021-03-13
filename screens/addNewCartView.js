import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { withNavigation } from 'react-navigation';

class AddNewCard extends React.Component{

  constructor(props = { navigation }) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      email: '',
      password: '',
      resp: '',
      discharges: '',
      isLoading: true,
    };
  }


render(){


  return (
    
    <View style={styles.container}>
    
    <View style = {styles.headerContainer}>
                <Text style = {styles.header}>Добавить карту</Text>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddPrivatbankCard')}><View style={styles.icon}>
                    <Image style = {styles.imageStyle} source={require('./images/privat.png')}/>
                </View></TouchableOpacity>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddMonobankCard')}><View style={styles.icon}>
                <Image style = {styles.imageStyle} source={require('./images/mono.png')}/>
                </View></TouchableOpacity>
            </View>

      <StatusBar style="auto" />
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
      paddingTop: 30,
      flexDirection: 'row',
      backgroundColor: 'white',
  },
  icon: {
    width: 70,
    height: 70,
    marginLeft: 28,
    
    backgroundColor: '#F3F3F3', 
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: 12

},
imageStyle:{
  width: 45,
  height: 45,
},
 header: {
    //textAlign: 'center',
    paddingTop: 15,
    color: '#2D2E30',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 28
  
  },
  headerContainer:{
    height: 50,
    marginTop: 2,
    marginBottom: 5
  },
  
  


  
});


export default withNavigation(AddNewCard);