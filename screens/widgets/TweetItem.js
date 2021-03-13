import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
const darkColor = 'black',
      lightColor = 'white',
      // Import randomcolor from 'randomcolor';
      { width, height } = Dimensions.get('window');
import _ from 'lodash';
import PropTypes from 'prop-types';
export default class Tweet extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
}

splitCategories() {
  var categoryJson = this.state.discharges;
  var data = [];
  const keys = Object.keys(categoryJson);
  for (var i = 0; i< keys.length; i++){
    var item = {
      name: keys[i],
      amount: Math.abs(categoryJson[keys[i]].totalAmount),
      color: getRandomColor(),

    };
    if(item.amount!=0)
    data.push(item);
  }
  return data;

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



render(){
 
  const data = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      population: 8538000,
      color: '#ffffff',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      population: 11920000,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

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
  const screenWidth = Dimensions.get('window').width;
  return (
    

    <View style={styles.container}>
      <ScrollView>
      <View style = {styles.diagramBlock}>
     <PieChart
  data={data}
  width={screenWidth}
  height={350}
  chartConfig={chartConfig}
  accessor={"population"}
  backgroundColor={"transparent"}
  center={[screenWidth/4, 10]}
  hasLegend= {false}
/>
       </View> 
       <View style={styles.legendBlock}>
          {this.formLegend(data)}
       </View>
       </ScrollView>
    </View>
  );
  }

}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F6F7F9',
      flex: 1,
      flexDirection: 'column',
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
  }
  }
  );

