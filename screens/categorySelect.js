import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View,  TouchableOpacity, AsyncStorage} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';






 export default class CategorySelect extends React.Component{  

    constructor(props = {navigation}) {
        super(props);
        const itemColor = '#000';
        this.state = {
          isLoading: true,
          dischargeCategoriesApi: '',
          dischargeCategories : {
         'Такси' : <FontAwesome name="taxi" size={22} color={itemColor} />, 
         'Косметика': <MaterialIcons name="face-retouching-natural" size={22} color={itemColor} />,
          'Аптека': <MaterialCommunityIcons name="pill" size={22} color={itemColor} />,
         'Продукты': <AntDesign name="shoppingcart" size={22} color={itemColor} />,
          'Переводы': <FontAwesome name="money" size={22} color={itemColor} />,
         'Доставка еды': <FontAwesome5 name="shipping-fast" size={22} color={itemColor} />,
         'Книги': <Entypo name="book" size={22} color={itemColor} />,
         'Рестораны': <MaterialCommunityIcons name="food-fork-drink" size={22} color={itemColor} /> ,
         'Поступления': <AntDesign name="shrink" size={22} color="black" />,
         'Накопления': <FontAwesome5 name="coins" size={22} color="black" />, 
         'Зарплата': <FontAwesome5 name="money-bill" size={22} color="black" />, 


        },
          sortedCategoriesData: {},
          discharges: this.props.navigation.getParam('discharges'),
      
        };}

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
          const data = {month:2, year:2021};
          fetch(`http://192.168.31.76:8080/api/v1/users/me/categories/limits`, {
            method: "GET",
            headers:  {'Authorization': 'Bearer '+token},   
          })
          .then(response => response.json())
          .then(
            data =>
              this.setState({
                dischargeCategoriesApi: data,
                isLoading: false,
              })
          )
          .catch(error => this.setState({ error, isLoading: false }));
          
          }

          componentDidMount(){
            this.sendApi();
          }


      createElements = () => {


        var categoryNames = this.state.dischargeCategoriesApi;
        var categoryIcons = this.state.dischargeCategories;
        var tempCatName;
        for (var i = 0; i < categoryNames.length; i++){
          tempCatName = categoryNames[i].categoryName;
            var item = {
             
              totalAmount : 0,
              discharges : [],
            }
            var styleItem = categoryNames[i].categoryName;
           item.catLimit = categoryNames[i].limit;
            
            if (categoryIcons.hasOwnProperty(styleItem)){
                item.style = categoryIcons[styleItem];
              }

            this.state.sortedCategoriesData[tempCatName] = item;
        }

        console.log(this.state.sortedCategoriesData);




        for (var i = 0; i<this.state.discharges.length; i++){

          var catName = this.state.discharges[i].categoryName[0].toUpperCase() + this.state.discharges[i].categoryName.slice(1 , this.state.discharges[i].categoryName.length);
          this.state.sortedCategoriesData[catName].totalAmount += this.state.discharges[i].discharge.cardamount;
         this.state.sortedCategoriesData[catName].discharges.push(this.state.discharges[i].discharge);
        }

        var elements = [];
        var income = [];
        const resultDisharges = [];
        const resultIncome = [];
        const numberOfElementsInRow = 3;
        var dischargeCounter = 0;
        var incomeCounter = 0;
        var text;
        var currItem = '';


        const keys = Object.keys(this.state.sortedCategoriesData);
  
        var i = 0;
        
        keys.forEach (key => {
            text = (key.length <= 12) ? key : key.slice(0, 15);

            currItem = <View style = {styles.categoryContainer}>
          
                <TouchableOpacity onPress={() =>  this.props.navigation.navigate('CategoryScreen', {catName: key, discharges : this.state.sortedCategoriesData})}>
                {((this.state.sortedCategoriesData[key].catLimit < Math.abs(this.state.sortedCategoriesData[key].totalAmount)) &&  this.state.sortedCategoriesData[key].catLimit>0 ) ? 
                <View style={styles.redCard}>
                {this.state.sortedCategoriesData[key].style}
                </View> : 
                <View style={styles.card}>
                {this.state.sortedCategoriesData[key].style}
                </View>
                }
                </TouchableOpacity>
                <View style = {styles.categoryNameTextContainer}>
                  <Text style = {styles.caregoryNameText}>{text}</Text>
                </View>
                <View style = {styles.cardAmountContainer}>
                {this.state.sortedCategoriesData[key].totalAmount <= 0 ?
                 <Text style={styles.cardAmountTextRed}>{this.state.sortedCategoriesData[key].totalAmount*100/100}</Text>
                : <Text style={styles.cardAmountTextGreen}>+{this.state.sortedCategoriesData[key].totalAmount*100/100}</Text>}
                  
                </View>
                </View>


            if (key == 'Зарплата' || key == 'Поступления'){
              income.push(currItem);
              incomeCounter += 1;
            } else{
              elements.push(currItem);
              dischargeCounter += 1;
            }

            if (incomeCounter == 2){
              resultIncome.push(<View style = {styles.cardItemsContainer}>{income}</View>);
              incomeCounter = 0;
            }else if (dischargeCounter%numberOfElementsInRow == 0 || dischargeCounter == keys.length){
                resultDisharges.push(<View style = {styles.cardItemsContainer}>{elements}</View>);
                elements = [];
            }
            
        } );
        if (dischargeCounter%numberOfElementsInRow != 0){
          resultDisharges.push(<View style = {styles.cardItemsContainer}>{elements}</View>);
        }




        return  (<View>
            <View style = {styles.sectionIncomeNameContainer}>
                <Text style = {styles.sectionNameText}>Доход</Text>
            </View>
            
            <View>
            {resultIncome}
            </View>


            <View style = {styles.sectionOutcomeNameContainer}>
                <Text style = {styles.sectionNameText}>Расход</Text>
            </View>
            <View>
            {resultDisharges}
            </View>
            </View>);
        }


    render(){
      const { navigation } = this.props;  
     
    return ( 
        
        <View style={styles.container}>
            <View style = {styles.mainHeaderContainer}>
                 <View style = {styles.mainHeaderCard}>
                    <Text style={styles.mainHeaderText}>Категории</Text>
                 </View>
           </View>



           <ScrollView>
            <View>
            {!this.state.isLoading ? this.createElements() : <Text>Loading...</Text>}
            </View>
           </ScrollView>
            


            <View style = {styles.tabBar}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <View style = {styles.tabBarIconContainer}>
            
              <View style={styles.tabBarImageContainer}>
                
                <Entypo name="credit-card" size={24} color="#99A2AE" />
              
              </View>
              <View style={styles.tabBarImageContainer}>
                  <Text style={styles.tabBarTextRegular}>Карты</Text>
              </View>
              
            </View></TouchableOpacity>
            
            
              <TouchableOpacity>
                <View style = {styles.tabBarIconContainer}>
              <View style={styles.tabBarImageContainer}>
                
                <Ionicons name="ios-swap-horizontal-outline" size={24} color="#007AFF" blurRadius={200}/>
              
              </View>
              
              <View style={styles.tabBarImageContainer}>
                  <Text style={styles.tabBarTextActive}>Категории</Text>
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
    paddingTop: 10,
    backgroundColor: '#FFF',
    flex:1,
    color: '#172751'
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
 
    marginRight: 85,
  },
  mainHeaderText:{
    fontSize: 24,
    color: '#2D2E30',
    fontWeight: '700',
  },
 
  
  menuButtonContainer:{
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'flex-start',
  },

  cardItemsContainer: {
    
    marginTop: 34,
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'flex-start',
   
  },

  categoryContainer: {
    height: 117, 
    width: 126,

    alignItems: 'center', 

  },

  card: {
    width: 65, 

    height: 65, 
    borderRadius: 12, 
    backgroundColor: '#F3F3F3',
    alignItems: 'center', 
    paddingTop: 22,

  },
  redCard: {
    width: 65, 

    height: 65, 
    borderRadius: 12, 
    backgroundColor: '#FFEFEF',
    alignItems: 'center', 
    paddingTop: 22,

  },
  categoryNameTextContainer: {
    marginTop: 12,
    height: 17,
  },
  caregoryNameText: {
    color: '#2D2E30', 
    fontWeight: '600', 
    fontSize: 14,
  },
  cardAmountContainer: {
    marginTop: 7,
    height: 16
  },
  cardAmountTextRed: {
    fontWeight: '400', 
    color: '#FC5E5E', 
    fontSize: 14
  },
  cardAmountTextGreen: {
    fontWeight: '400', 
    color: '#06E084', 
    fontSize: 14
  },
  
  sectionIncomeNameContainer: {
    marginLeft: 24, 
    marginTop: 10, 
    height: 21, 
  },

  sectionOutcomeNameContainer: {
    marginLeft: 24, 
    marginTop: 54, 
    height: 21, 
  },

  sectionNameText: {
    color: '#2D2E30', 
    fontWeight: '600', 
    fontSize: 18, 

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
