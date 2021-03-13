import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SectionList, TouchableOpacity, ScrollView,  AsyncStorage} from 'react-native';
import MenuCard from '../shared/menuCard';
import { Ionicons } from '@expo/vector-icons';




export default class CategoryScreen extends React.Component {

    constructor(props = { navigation }) {
        super(props);
        this.state = {
          catName: this.props.navigation.getParam('catName'),
          discharges: this.props.navigation.getParam('discharges'),
          isLoading: true,
          limit: '',
        }
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
    const data = {category:this.state.catName};
    fetch(`http://192.168.31.76:8080/api/v1/users/me/categories/limit?categoryName=${encodeURIComponent(data.category)}`, {
      method: "GET",
      headers:  {'Authorization': 'Bearer '+token},   
    })
    .then(response => response.json())
    .then(
      data =>
        this.setState({
          isLoading: false,
          limit: data.limit,
        })
    )
    .catch(error => this.setState({ error, isLoading: false }));
    
    }
    
    componentDidMount(){
      this.sendApi();

    }

   
    showCategories(){
      var categoryJson = this.state.discharges[this.state.catName].discharges;
      console.log(categoryJson);
    
      var prevDate = categoryJson[0].trandate.split('T')[0];
      var resultList = [];
      var tempDischagreList = [];
      var i = 0;
    
    
      for( i; i < categoryJson.length; i++){

        var currDate = categoryJson[i].trandate.split('T')[0];
        
    
        if(currDate == prevDate){
          tempDischagreList.push(<MenuCard>
            <View style={styles.menuCardContainer}>
              
            <View style={styles.menuCardIconContainer}>
              {categoryJson[i].cardamount > 0 ? 
                        <View style={styles.menuCardGreenIcon}><Ionicons name="ios-card" size={17} color="#06E084" /></View> : 
                        <View style={styles.menuCardRedIcon}><Ionicons name="ios-card" size={17} color="#FC5E5E" /></View>}
            </View>
            <View style={styles.menuCardMainTextContainer}>
              <Text style={styles.menuCardMainText}>
                    {categoryJson[i].terminal} {categoryJson[i].description} 
              </Text>
            </View> 
            <View style={styles.menuCardDischargeContainer}>
            {categoryJson[i].cardamount > 0 ? 
              <Text style={styles.menuCardDischargeAmount}>{categoryJson[i].cardamount}₴</Text> : 
              <Text style={styles.menuCardDischargeAmountRed}>{categoryJson[i].cardamount}₴</Text> }
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
              {categoryJson[i].cardamount > 0 ? 
                        <View style={styles.menuCardGreenIcon}><Ionicons name="ios-card" size={17} color="#06E084" /></View> : 
                        <View style={styles.menuCardRedIcon}><Ionicons name="ios-card" size={17} color="#FC5E5E" /></View>}
            </View>
            <View style={styles.menuCardMainTextContainer}>
              <Text style={styles.menuCardMainText}>
                    {categoryJson[i].terminal} {categoryJson[i].description} 
              </Text>
            </View> 
            <View style={styles.menuCardDischargeContainer}>
            {categoryJson[i].cardamount > 0 ? 
              <Text style={styles.menuCardDischargeAmount}>{categoryJson[i].cardamount}₴</Text> : 
              <Text style={styles.menuCardDischargeAmountRed}>{categoryJson[i].cardamount}₴</Text> }
            </View>
            </View>
              
              </MenuCard>
              );
          prevDate = currDate;
        }
      }

      {
        resultList.push(
          <View>
             <Text style={styles.header}>
                 {prevDate}
              </Text>
          {tempDischagreList}
          </View>
          );
      }
      
    
          return <ScrollView>{resultList}</ScrollView>;
    
    }


  
    render(){






      return (

        
        <View style={styles.container}>
         
          <View style = {styles.topItem}>    
          <View style = {styles.mainHeaderContainer}>
                 <View style = {styles.mainHeaderCard}>
                    <Text style={styles.mainHeaderText}>{this.state.catName}</Text>
                 </View>
          <View style={styles.headerButton}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeLimit', {categoryName: this.state.catName})}>
           <View style={{marginRight: 24}}>
            <Ionicons name="ios-add-outline" size={28} color="#006DFF" />
          </View>
        </TouchableOpacity>
       </View>
           </View>
            


            
            <View style = {styles.balanceContainer}>
              <View style={styles.categoryNameBlock}>
                
                  <Text style={styles.amountSpentName}>Трата</Text>
               
                
                  <Text style = {styles.amountSpentValue}>{this.state.discharges[this.state.catName].totalAmount}</Text>
                
              </View>

              <View style={styles.categoryNameRightBlock}>
              
                  <Text style={styles.amountSpentName}>Лимит</Text>
           
              
                  <Text style = {styles.limitValue}>{ !this.state.isLoading ? this.state.limit : '...'}</Text>
               
              </View>
              
            </View>

          </View>
          <View style = {styles.listStyle}>
          {this.state.discharges[this.state.catName].discharges.length == 0? <Text>No transactions yet</Text> : this.showCategories()}
    
    
        
      
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
  headerButton: {
    marginLeft: 18,
                  
  },
  topItem:{
    height : 203,
  },
  menuButtonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
 mainHeaderContainer:{
    height: 29,

    
   // marginBottom: 5,
    marginLeft: 24,
    marginRight: 30,

    flexDirection: 'row',
  },
  mainHeaderCard: {
    width: 200,
 
    marginRight: 85,
  },
  mainHeaderText:{
    fontSize: 24,
    color: '#2D2E30',
    fontWeight: '700',
  },
  balanceContainer:{
    height: 84, 
    width: 327,
    flexDirection: 'row',
    marginTop: 36,
    marginHorizontal: 24,
    borderRadius: 12,
    
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
    
  },
  categoryNameBlock : {
    flex: 1,
    height: 39,
    borderRightWidth: 1,
    borderColor: '#99A2AE',
    alignItems: 'center',
  

  },
  categoryNameRightBlock : {
    flex: 1,
    height: 39,
    alignItems: 'center',
  },
  addLimitButton : {

    height: 40,
    width: 40,  

    
  },

  amountSpentBlock : {
      paddingTop: 7,
     
  },
  amountSpentName: {
    textAlign: 'center',
    color: '#2D2E30',
    fontSize: 14,
    fontWeight: '600',
  },
  amountSpentValue: {
    marginTop: 7,
    textAlign: 'center',
    color: '#006DFF',
    fontSize: 14,
    fontWeight: '400',
  },
  limitValue: {
    marginTop: 7,
    textAlign: 'center',
    color: '#99A2AE',
    fontSize: 14,
    fontWeight: '400',
  },




  headerName: {
    textAlign: 'center',
    paddingTop: 5,
    color: '#172751',
    fontSize: 24,
    fontWeight: 'bold',
  
  },



  balanceText:{
    color: '#929CB9',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  balanceDescription: {
    textAlign:'center',
  },
  cardStyle:{
  
    padding: 20,

  }, 
  listStyle:{
    borderRadius: 20,
    marginHorizontal: 24,
    flex: 2.1,
    
  },
  item:{
    color: '#172751'
  },

  
  header: {
    color: '#99A2AE',
    fontSize: 12,
    paddingLeft: 10,
    paddingBottom: 5
    
  },
  menuCardContainer: {
    flexDirection: 'row',
   
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
    width: 70,
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


  
});



