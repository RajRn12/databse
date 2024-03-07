
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import * as SQLite from 'expo-sqlite';
import Constants from 'expo-constants';
import Item from './components/item';
import styles from './styles/master-style-sheet';




export default function App() {
    const [db, setDb] = useState(null);
    const [text, setText] = useState(null);
    const [items, setItems] = useState([]);
    const [updateItems, forceUpdate] = useState(0);
    //open the database on launch
    useEffect(() => {
        if (Platform.OS === 'web') {
            const db = {
                transaction: () => {
                    return {
                        executeSql: () => { },
                    }
                }
            }
        }
        const db = SQLite.openDatabase('todo.db');
        setDb(db);

        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists item (id integer primary key NOT NULL, done int, value text):" 
            )
        })
    }, [])

    //update when the database  chanfes [db, updateItems]
    useEffect(() => {
        if (db) {
            db.transaction(
                (tx) => {
                    tx.executeSql("select * from item", [],
                        (_, { rows: { _array } }) => { setItems(_array) }

                    )
                }
            )
        }
    }, [db, updateItems])




    const createRecord = (text) => {
        db.transaction(
            (tx) => {
                tx.executeSql("insert into item (done,value) values (0,?)", [text])
                tx.executeSql("select * from item", [],
                    (_, { rows }) => console.log(JSON.stringify(rows)));
            },

            null,
            forceUpdate(f => f + 1)
        );

    }
    const readRecord = () => { }
    const updateRecord = () => { }
    const delRecord = () => { }


  return (
      <View style={styles.container}>
          <Text style={styles.heading}>SQLite Example </Text>
          <View style ={styles.flexRow}>
          <TextInput
              onChangeText={(text) => setText(text)}
              onSubmitEditing={ () => {
                  createRecord(text);
                  setText(null)
              }}
              placeholder="what do you need to do?"
                  style={styles.input}
                  value={text}
              />
              </View>
      <Text>Hey lets do mobile App!</Text>
          <ScrollView style={styles.ListArea}>
              <Text styles={styles.sectionHeading}> To Do </Text>
              {items.map(
                  ({ id, done, value }) => {
                      if (!done) returm = n(
                          <Item key={id} itemId={id} itemText={value} />
                      )
                  })
}
              <Item itemId={1} itemText={'some Text'} />
              <Item itemId={2} itemText={'some Text 2'} />
              <Item itemId={3} itemText={'some Text 3'} />
              <Item itemId={4} itemText={'some Text 4'} />
              <Text style={styles.sectionHeading}>Done</Text>
          </ScrollView>
          <StatusBar style ="auto" />
    </View>
  );
}

