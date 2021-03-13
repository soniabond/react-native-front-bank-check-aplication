import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, ScrollView, Dimensions ,  AsyncStorage, TouchableOpacity} from 'react-native';
import { MockTweetList } from './FakerMocks';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
  PieChart,
} from "react-native-chart-kit";
import _ from 'lodash';




function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

 class HorizontalPagedFlatList extends Component {
  constructor(props  ={navigation}) {
    super(props);
    this.state = {
      isLoading: true,
      items: MockTweetList,
      sortedCategoriesData: {},
          discharges: this.props.navigation.getParam('discharges'),
          dischargeCategoriesApi: '',

         
      // Selected: (new Map(): Map<string, boolean>),
    };
  
    this.screenRender=this.screenRender.bind(this);
    this.screenRenderLineGraph = this.screenRenderLineGraph.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.formPagination = this.formPagination.bind(this);
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

  createElements(){
    var categoryNames = this.state.dischargeCategoriesApi;
    //console.log(categoryNames);
    
    var tempCatName;
    for (var i = 0; i < categoryNames.length; i++){
      tempCatName = categoryNames[i].categoryName;
        var item = {
         
          totalAmount : 0,
          discharges : [],
        }
       item.catLimit = categoryNames[i].limit;

        this.state.sortedCategoriesData[tempCatName] = item;
    }
   

    

    for (var i = 0; i<this.state.discharges.length; i++){

      var catName = this.state.discharges[i].categoryName[0].toUpperCase() + this.state.discharges[i].categoryName.slice(1 , this.state.discharges[i].categoryName.length);
      this.state.sortedCategoriesData[catName].totalAmount += this.state.discharges[i].discharge.cardamount;
     this.state.sortedCategoriesData[catName].discharges.push(this.state.discharges[i].discharge);
    } 
    

 
  }

  
  formLegend(data) {
    var elements = [];
    for( var i = 0; i < data.length; i++){
      elements.push(<View style = {styles.legendItem}>
        <View style = { {
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: data[i].color,
      marginRight: 10
        } }></View>
      <Text>{data[i].name}    {data[i].population}</Text>
      </View>);
    }
    return elements;
  
}
  splitCategories() {
    var colors = ['#067bc2', '#84BCDA', '#ECC30B', '#F37748', '#D56062', '#631D76', '#9E4770', '#CCFBFE',  '#BFACC8', '#783F8E', '#F79256', '#FBD1A2', '#7DCFB6', '#00B2CA', '#1D4E89']
    var color;
    var categoryJson = this.state.sortedCategoriesData;
    console.log(this.state.isLoading);
    var data = [];
    const keys = Object.keys(categoryJson);
    for (var i = 0; i< keys.length; i++){
      if (categoryJson[keys[i]].totalAmount > 0){
        continue;
      }
      
      if(i<colors.length){
          color = colors[i];
      }else{
        color = getRandomColor();
      }
      
      var item = {
        name: keys[i],
        amount: Math.abs(categoryJson[keys[i]].totalAmount),
        color: color,
  
      };
      if(item.amount!=0)
      data.push(item);
    }
    return data;
  
  }

  splitCategoriesLineGraphLabel() {
    
    var categoryJson = this.state.discharges;
   var colors = ["#FBD1A2", "#7DCFB6"];
    var income = [];
    var incomeAmount = 0;
    var discharge = [];
    var dischargeAmount = 0;
    var data =[];
   
    for (var i = 0; i< categoryJson.length; i++){

     if(categoryJson[i].discharge.cardamount>0){
       income.push(categoryJson[i].discharge);
       incomeAmount += categoryJson[i].discharge.cardamount;

     }else if(categoryJson[i].discharge.cardamount<0){
      discharge.push(categoryJson[i].discharge);
      dischargeAmount += categoryJson[i].discharge.cardamount;
    }

    }
    var item = {
      name: 'Расход',
      amount: Math.abs(dischargeAmount),
      color: colors[0],

    };
    data.push(item);

    var item = {
      name: 'Доход',
      amount: Math.abs(incomeAmount),
      color: colors[1],

    };
    data.push(item);
    return data;
  
  }

  screenRenderLineGraph(){
    console.log('HELLO');
    const labels = ['доход', 'расход'];
   // console.log('______________________', this.state.sortedCategoriesData);
   const data = this.splitCategoriesLineGraphLabel();
   
   const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 10,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0,
   useShadowColorFromDataset: false, // optional
  };

  var elements = [];
  for( var i = 0; i < data.length; i++){
    elements.push(<View style = {styles.legendItem}>
      <View style = { {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: data[i].color,
    marginRight: 10
      } }></View>
    <Text style = {styles.legendText}>{data[i].name}    {data[i].amount*100/100}</Text>
    </View>);
  };
  const screenWidth = Dimensions.get('screen').width;
  return (
    
    

    <View style={styles.container}>
      <ScrollView>
      
      <View style = {styles.diagramBlock}>
       
     <PieChart
  data={data}
  width={screenWidth}
  height={350}
  chartConfig={chartConfig}
  accessor={"amount"}
  backgroundColor={"transparent"}
  center={[screenWidth/4, 10]}
  hasLegend= {false}
  />
       </View> 
       <View style={styles.legendBlock}>
          {elements}
       </View>
       </ScrollView>
    </View>
  );
  }
  
  
  screenRender(){

 
    const data = this.splitCategories();
  
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 10,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0,
     useShadowColorFromDataset: false, // optional
    };

    var elements = [];
    for( var i = 0; i < data.length; i++){
      elements.push(<View style = {styles.legendItem}>
        <View style = { {
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: data[i].color,
      marginRight: 10
        } }></View>
      <Text style = {styles.legendText}>{data[i].name}    {data[i].amount*100/100}</Text>
      </View>);
    };
    const screenWidth = Dimensions.get('screen').width;
    return (
      
      
  
      <View style={styles.container}>
        <ScrollView>
        
        <View style = {styles.diagramBlock}>
         
       <PieChart
    data={data}
    width={screenWidth}
    height={350}
    chartConfig={chartConfig}
    accessor={"amount"}
    backgroundColor={"transparent"}
    center={[screenWidth/4, 10]}
    hasLegend= {false}
    />
         </View> 
         <View style={styles.legendBlock}>
            {elements}
         </View>
         </ScrollView>
      </View>
    );
    }


  _renderItem({item}){
    if(item.index == 0) {
      return this.screenRender()
    }
    else return this.screenRenderLineGraph();
  } 
  
  _keyExtractor = (item, index) => Math.floor(Math.random()*10000)

  onViewableItemsChanged = ({ viewableItems, changed }) => this.setState({ viewableItems });

  
formPagination(){
  this.createElements();
  return(
    <View style={[ styles.container ]}>
      
  <FlatList
  
            data={this.state.items}
            horizontal
            pagingEnabled
            keyExtractor={this._keyExtractor}
            onViewableItemsChanged={this.onViewableItemsChanged}
            renderItem={this._renderItem}
        />
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
            
            
              <TouchableOpacity onPress={this.pressHangler}>
                <View style = {styles.tabBarIconContainer}>
              <View style={styles.tabBarImageContainer}>
                
                <Ionicons name="ios-swap-horizontal-outline" size={24} color="#99A2AE" />
              
              </View>
              
              <View style={styles.tabBarImageContainer}>
                  <Text style={styles.tabBarTextRegular}>Категории</Text>
              </View> 
            </View></TouchableOpacity>
            
              <TouchableOpacity>
                <View style = {styles.tabBarIconContainer}>
                <View style={styles.tabBarImageContainer}>
                
                <MaterialCommunityIcons name="chart-arc" size={26} color="#007AFF" blurRadius={200}/>
              
              </View>
              
              <View style={styles.tabBarImageContainer}>
                  <Text style={styles.tabBarTextActive}>Статистика</Text>
              </View> 
            </View></TouchableOpacity>
        </View>
        
            </View>)}

        render() {
          return (
            <View style={[ styles.container ]}>
               <View style = {styles.mainHeaderContainer}>
                 <View style = {styles.mainHeaderCard}>
                    <Text style={styles.mainHeaderText}>Аналитика трат</Text>
                 </View>
                 </View>
               {!this.state.isLoading ? this.formPagination() : <Text>Loading...</Text>}
               
              </View>);
        }
}
const styles = StyleSheet.create({
 
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    flexDirection: 'column',
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
    //width: 124,
 
    marginRight: 85,
  },
  mainHeaderText:{
    fontSize: 24,
    color: '#2D2E30',
    fontWeight: '700',
  },
  legendText: {
    color: '#0D1834',
    fontSize: 14, 
    fontWeight: '400',
  },
  pagination : {
    backgroundColor: 'red',
    
  },
  categoryCircle:{
    elevation: 6,
    borderWidth: 1,
    borderColor: '#929CB9',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',

},
diagramBlock: {
  height: 350,
  

},
legendBlock: {
  flexDirection: 'column',
  
},
legendItem:{
  flex: 1,
  flexDirection: 'row',
  paddingHorizontal: 40,
  paddingVertical: 10,
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

export default withNavigation(HorizontalPagedFlatList);