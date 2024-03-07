import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import styles from '../styles/master-style-sheet';


export default Item = ({ itemId, itemText, onPress, onLongPress }) => {

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.itemStyle,]}
            key={itemId}
        >

        <Text style ={[styles.itemText,]}>{itemText}</Text>

</Pressable>
            )


}