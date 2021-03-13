import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native';


export default function MenuCard(props){
    return(
        <View style={styles.card1}>
            <View style={styles.cardContent1}>
                {props.children}
           </View>
        </View>
    )
}

<MenuCard>
    <Text>hello</Text>
    <Text>hello again</Text>
</MenuCard>




const styles = StyleSheet.create({
    card1:{
        backgroundColor: '#fff',
        borderWidth: 0,
        height: 70,

     
        paddingTop: 5,
        marginVertical: 5,
        flex: 1,
        flexDirection: 'row'

    },
    cardContent1:{
       //margin: 10,
        //color: '#172751'

    },

});