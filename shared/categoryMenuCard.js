import React from 'react';
import {StyleSheet, View, Text} from 'react-native';


export default function CategoryCard(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
           </View>
        </View>
    )
}


const colors = [['yellow', '#929CB9'], ['red', 'blue']];

function getRandomColor(){
    return colors[0][1];
}

const styles = StyleSheet.create({
    card:{
        elevation: 6,
        backgroundColor: '#929CB9',
        shadowOffset: {width: 2, height: 2},
        shadowColor: getRandomColor(), 
        shadowOpacity: 0.5,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: '#929CB9',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',

    },
    cardContent:{
        margin: 10,
        
    },

});