
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
        let db = null;
        if (Platform.OS === 'web') {
             db = {
                transaction: () => {
                    return {
                        executeSql: () => { },
                    }
                }
            }
        } else {
            db = SQLite.openDatabase('todo1.db');
        }
        setDb(db);

        // Create the if not exist
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists item (id integer primary key NOT NULL, done int, value text);"
            ),
                (_, error) => console.log(error),
                () => console.log("Table exists or was created")
        })
    }, [])

    //update when the database  chanfes [db, updateItems]
    useEffect(() => {
        if (db) {
            db.transaction(
                (tx) => {
                    tx.executeSql(
                        "select * from item",
                        [],
                        (_, { rows }) => setItems(rows._array),
                        (_, error) => console.log(error)
                    ),
                        (_, error) => console.log(error),
                        () => console.log("item was reloaded")
                }
            )
        }
    }, [db, updateItems])


    const addRecord = (text) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "insert into item (done, value) values (0, ?)",
                    [text],
                    () => console.log("added", text),
                    (_, error) => console.log(error)
                )
            },
            (_, error) => console.log('addRecord() failed: ', error),
            forceUpdate(f => f+1)
        )
    }
    const readRecord = () => { }

    const updateRecord = (id, done) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "update item set done = ? where id = ?",
                    [done, id],
                    () => console.log("updated record ", id),
                    (_, error) => console.log(error)
                )
            },
            (_, error) => console.log('updateRecord() failed: ', error),
            forceUpdate(f => f + 1)
        )
    }
    const deleteRecord = (id) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    "delete from item where id = ?",
                    [id],
                    () => console.log("deleted record ", id),
                    (_, error) => console.log(error)
                )
            },
            (_, error) => console.log('deleteRecord() failed: ', error),
            forceUpdate(f => f + 1)
        )
    }

  return (
      <View style={styles.container}>
          <Text style={styles.heading}>SQLite Example </Text>
          <View style ={styles.flexRow}>
          <TextInput
              onChangeText={(text) => setText(text)}
              onSubmitEditing={ () => {
                  addRecord(text);
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
                      if (!done) return (
                          <Item key={id} itemId={id} itemText={value}
                              onPress={() => updateRecord(id, 1)}
                              onLongPress={() => { deleteRecord(id) }}
                          />
                      )
                  })
                }
              <Text styles={styles.sectionHeading}>Done </Text>
              {items.map(
                  ({ id, done, value }) => {
                      if (done) return (
                          <Item key={id} itemId={id} itemText={value}
                              onPress={() => updateRecord(id, 0)}
                              onLongPress={() => { deleteRecord(id) }}
                          />
                      )
                  })
              }
          </ScrollView>
          <StatusBar style ="auto" />
    </View>
  );
}

