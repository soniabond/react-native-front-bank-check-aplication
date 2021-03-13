import React from 'react';
import {StyleSheet, View, Text} from 'react-native';


export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
           </View>
        </View>
    )
}

<Card>
    <Text>hello</Text>
    <Text>hello again</Text>
</Card>



const styles = StyleSheet.create({
    card:{
        elevation: 6,
        backgroundColor: '#172751',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#32144f', 
        shadowOpacity: 0.1,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: '#8c67aa',
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',

    },
    cardContent:{
        margin: 10

    },

});