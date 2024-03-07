import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
            marginTop: 40,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    flexRow: {
        flexDirection: 'row',
    },
    Input: {
    borderColor: 'black',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
        padding: 8, 
        alignItems: 'center',
        width: '80%',
    },
    sectionHeading: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    itemStyle: {
        borderWidth: 2,
        borderRadius: 8,
        borderStyle: 'solid',
        borderColor: 'black',
        backgroundColor: 'white',
        width: '90%',
        marginBottom: 16,
        padding: 16,
    },

    itemText: {
        fontSize: 20,

    },
    ListArea: {
        backgroundColor: 'green',
        padding: 30,
        margin: 20,
        textAlign: 'center',
        
    }



});