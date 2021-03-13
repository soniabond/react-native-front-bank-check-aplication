import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, AsyncStorage, Alert, ScrollView, TextInput, Button} from 'react-native';
import Card from '../shared/card';
import MenuCard from '../shared/menuCard';
import { Ionicons } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';






export default class Home extends React.Component{

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
      balance: '',
      isLoadingBalance: true,
    };
  }


pressHangler = () =>{
 // console.log('DISCHHHHHHHHHHHHHHHH', this.state.discharges);
    this.props.navigation.navigate('CategorySelect', {discharges : this.state.discharges});
   

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
  var d = new Date();
var month = d.getMonth()+1;
var year = d.getFullYear();
const data = {month:month, year:year};
fetch(`http://192.168.31.76:8080/api/v1/users/me/discharges?month=${encodeURIComponent(data.month)}&year=${encodeURIComponent(data.year)}`, {
  method: "GET",
  headers:  {'Authorization': 'Bearer '+token},   
})
.then(response => response.json())
.then(
  data =>
    this.setState({
      discharges: data,
      isLoading: false,
    })
)
.catch(error => this.setState({ error, isLoading: false }));

}

async sendBalanceApi(){
  var token = await this._onGetTokenVal();
    //console.log('HOME', token);
    var d = new Date();
  var month = d.getMonth()+1;
  var year = d.getFullYear();
  const data = {month:month, year:year};
  fetch(`http://192.168.31.76:8080/api/v1/users/me/balance`, {
    method: "GET",
    headers:  {'Authorization': 'Bearer '+token},   
  })
  .then(response => response.json())
  .then(
    data =>
      this.setState({
        balance: data,
        isLoadingBalance: false,
      })
  )
  .catch(error => this.setState({ error, isLoading: false }));
  
  }


showCategories(){
  
  var categoryJson = this.state.discharges;
  console.log(categoryJson);

  var prevDate = categoryJson[0].discharge.trandate.split('T')[0];
  var resultList = [];
  var tempDischagreList = [];
  var i = 0;


  for( i; i < categoryJson.length; i++){

    var currDate = categoryJson[i].discharge.trandate.split('T')[0];

    if(currDate == prevDate){
      tempDischagreList.push(<MenuCard>
        <View style={styles.menuCardContainer}>
          
        <View style={styles.menuCardIconContainer}>
          {categoryJson[i].discharge.cardamount > 0 ? 
                    <View style={styles.menuCardGreenIcon}><Ionicons name="ios-card" size={17} color="#06E084" /></View> : 
                    <View style={styles.menuCardRedIcon}><Ionicons name="ios-card" size={17} color="#FC5E5E" /></View>}
        </View>
        <View style={styles.menuCardMainTextContainer}>
          <Text style={styles.menuCardMainText}>
                {categoryJson[i].discharge.terminal} {categoryJson[i].discharge.description} 
          </Text>
        </View> 
        <View style={styles.menuCardDischargeContainer}>
        {categoryJson[i].discharge.cardamount > 0 ? 
          <Text style={styles.menuCardDischargeAmount}>{categoryJson[i].discharge.cardamount}₴</Text> : 
          <Text style={styles.menuCardDischargeAmountRed}>{categoryJson[i].discharge.cardamount}₴</Text> }
        </View>
        </View>
          
          </MenuCard>
          );
    }else{
      resultList.push(
      <View>
         <Text style={styles.header}>
             {prevDate}
          </Text>
      {tempDischagreList}
      </View>
      );

      tempDischagreList = [];
      tempDischagreList.push(<MenuCard>
        <View style={styles.menuCardContainer}>
          
        <View style={styles.menuCardIconContainer}>
          {categoryJson[i].discharge.cardamount > 0 ? 
                    <View style={styles.menuCardGreenIcon}><Ionicons name="ios-card" size={17} color="#06E084" /></View> : 
                    <View style={styles.menuCardRedIcon}><Ionicons name="ios-card" size={17} color="#FC5E5E" /></View>}
        </View>
        <View style={styles.menuCardMainTextContainer}>
          <Text style={styles.menuCardMainText}>
                {categoryJson[i].discharge.terminal} {categoryJson[i].discharge.description} 
          </Text>
        </View> 
        <View style={styles.menuCardDischargeContainer}>
        {categoryJson[i].discharge.cardamount > 0 ? 
          <Text style={styles.menuCardDischargeAmount}>{categoryJson[i].discharge.cardamount}₴</Text> : 
          <Text style={styles.menuCardDischargeAmountRed}>{categoryJson[i].discharge.cardamount}₴</Text> }
        </View>
        </View>
          
          </MenuCard>
          );
      prevDate = currDate;
    }
  }

  resultList.push(
    <View>
    <View style={styles.headerContainer}>
       <Text style={styles.header}>
           {prevDate}
        </Text>
        </View>
    {tempDischagreList}
    </View>
    );
    

      return <ScrollView>{resultList}</ScrollView>;

}



componentDidMount(){
  this.sendApi();
  this.sendBalanceApi();
}



render(){






  return (
    
    <View style={styles.container}>
      <View style = {styles.topItem}>
        <View style = {styles.mainHeaderContainer}>
           
          
                 <View style = {styles.mainHeaderCard}>
                    <Text style={styles.mainHeaderText}>Мои карты</Text>
                 </View>
    
              <View style={styles.headerButtonContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddNewCard')}>
                <Ionicons name="add-outline" size={30} color="#006DFF" />   
                </TouchableOpacity>             
              </View>      
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderContainer}>
            <View style={styles.bankAndBalanceContainer}>
              <View style={styles.bankNameContainer}>
                <Text style={styles.bankNameText}>Все банки</Text>
              </View>
              <View style={styles.bankBalanceContainer}>
                <Text style={styles.bankBalanceText}>₴{!this.state.isLoadingBalance ? this.state.balance.balance : '...'}</Text>
              </View>
            </View>
            <View style={styles.emblemContainer}>
              <MaterialCommunityIcons name="bank" size={30} color="#F79E1B" />
            </View>
          </View>
          <View style={styles.cardHolderContainer}>
            <Text style={styles.bankNameText}>Sofia Bondarenko</Text>
          </View>
        </View>
      </View>
      <View style = {styles.listStyle}>
      {!this.state.isLoading ? this.showCategories() : <Text>Loading...</Text>}

      </View>
      <View style = {styles.tabBar}>
        <TouchableOpacity >
            <View style = {styles.tabBarIconContainer}>
            
              <View style={styles.tabBarImageContainer}>
                
                <Entypo name="credit-card" size={24} color="#007AFF" blurRadius={200}/>
              
              </View>
              <View style={styles.tabBarImageContainer}>
                  <Text style={styles.tabBarTextActive}>Карты</Text>
              </View>
              
            </View></TouchableOpacity>
            
            
              <TouchableOpacity onPress={this.pressHangler}>
                <View style = {styles.tabBarIconContainer}>
              <View style={styles.tabBarImageContainer}>
                
                <Ionicons name="ios-swap-horizontal-outline" size={24} color="#99A2AE" />
              
              </View>
              
              <View style={styles.tabBarImageContainer}>
                  <Text style={styles.tabBarTextRegular}>Категории</Text>
              </View> 
            </View></TouchableOpacity>
            
              <TouchableOpacity onPress={() => this.props.navigation.navigate('HorizontalPagedFlatList', {discharges : this.state.discharges})}>
                <View style = {styles.tabBarIconContainer}>
                <View style={styles.tabBarImageContainer}>
                
                <MaterialCommunityIcons name="chart-arc" size={26} color="#99A2AE" />
              
              </View>
              
              <View style={styles.tabBarImageContainer}>
                  <Text style={styles.tabBarTextRegular}>Статистика</Text>
              </View> 
            </View></TouchableOpacity>
        </View>

      

      <StatusBar style="auto" />
    </View>
  );
          }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex:1,
    color: '#172751'
  },

  menuCardContainer: {
    flexDirection: 'row',
    width: 337,
    marginLeft: 24,
  },

  menuCardMainTextContainer: {
    width: 198,
    height: 54,

   
  },

  menuCardMainText: {
    fontSize: 14,
    color: '#2D2E30',
    
  },
  menuCardDischargeContainer: {
    width: 60,
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  menuCardDischargeAmount: {
    color: '#2D2E30',
    fontSize: 16,
    fontWeight: 'bold',

  },
  menuCardDischargeAmountRed: {
    color: '#FC5E5E',

    fontSize: 16,
    fontWeight: 'bold',

  },

  menuCardIconContainer: {
    width: 40,
    
    marginRight: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  menuCardGreenIcon: {
    width: 34,
    height: 34,
    paddingTop: 7,
    borderRadius: 15,
    backgroundColor: '#E6FCF3',
    alignItems: 'center'
    

  },
  menuCardRedIcon: {
    width: 34,
    height: 34,
    paddingTop: 7,
    borderRadius: 15,
    backgroundColor: '#FFEFEF',
    alignItems: 'center'
    

  },
  topItem:{
  
    backgroundColor: 'rgba(180, 188, 199, 0.1)',
    height: 314,
    flexDirection: 'column',
    borderRadius: 24,


  },


  mainHeaderContainer:{
    height: 29,
    marginTop: 40,
   // marginBottom: 5,
    marginLeft: 24,
    marginRight: 30,

    flexDirection: 'row',
  },
  mainHeaderCard: {
    width: 124,
 
    marginRight: 140,
  },
  mainHeaderText:{
    fontSize: 24,
    color: '#2D2E30',
    fontWeight: '700',
  },
  headerButtonContainer: {
    width: 30,
    marginLeft: 26,

    //paddingTop: 4,
    alignItems: 'center'
  },

  cardContainer: {
    marginHorizontal: 44,
    marginTop: 34,
    backgroundColor: '#333333',
    width: 287, 
    height: 166,
    borderRadius: 12,
    flexDirection: 'column',
  },
  cardHeaderContainer:{
    height: 51,
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'row',

  },
  bankAndBalanceContainer: {
    width: 172,
    marginRight: 47,


    flexDirection: 'column'
  },
  bankNameContainer: {
    height: 15,
    width: 150,
    marginBottom: 6,
  },
  bankNameText: {
    color: '#FFFFFF',
    opacity: 0.54,
  },
  bankBalanceContainer: {
    height: 30,
  },
  bankBalanceText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 24
  },
  emblemContainer: {
    width: 36,

    alignItems: 'center',


  },
  cardHolderContainer: {
    width: 150,
    height: 15,
    marginTop: 68,
    marginLeft: 16.
    
  },

  
  cardStyle:{
  
    padding: 20,

  }, 
  listStyle:{
    borderRadius: 40,
    padding: 10,
    flex: 2.1,
    
  },
  item:{
    color: '#172751'
  },

  headerContainer: {
    width: 300,
    height: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
 
  },


  header: {
    color: '#99A2AE',
    fontSize: 12,
    paddingLeft: 10,
    paddingBottom: 5
    
  },

  tabBar:{
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    opacity: 0.7,
    
  },
  tabBarIconContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',

  },
  tabBarImageContainer: {
    marginTop: 10,
    height: 24

  },
  tabBarIconNameContainer: {
    height: 12,
    marginTop: 8, 
    marginBottom: 14,
    textAlign: 'center',
  },
  tabBarTextRegular: {
    color: '#99A2AE', 
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabBarTextActive: {
    color: '#007AFF', 
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },


  
});
