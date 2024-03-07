import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import styles from '../styles/master-style-sheet';


export default Item = ({ itemId, itemText }) => {

    return (
        <Pressable
            onPress={() => { }}
            style={[styles.itemStyle,]}
            key={itemId}
        >

        <Text style ={[styles.itemText,]}>{itemText}</Text>

</Pressable>
            )


}