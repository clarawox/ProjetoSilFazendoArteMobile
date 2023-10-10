import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import Cabecalho from '../src/componentes/Cabecalho';
import Produto from '../telas/Produto'

export default function Produtos() {
    return (
        <View style={styles.container}>
            <Cabecalho />
            <View>
                <TouchableOpacity style={{ position: "absolute", right: 0, alignSelf: 'center' }}>
                    <MaterialIcons
                        name="filter-list"
                        size={24}
                        color='#660066'
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.line}/>

            <ScrollView>
                <Produto/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#F2F2F2",
    },
    titulo: {
        paddingTop: 30,
        paddingBottom: 10,
        fontSize: 26,
        fontWeight: "bold",
        color: '#660066',
        alignContent: "center",
        textAlign: 'center',
    },
    textContainer:{
        flexDirection: 'row',
        marginVertical: '5%',
        marginHorizontal: '5%'
    },
    line:{
        borderBottomColor:'#660066',
        borderBottomWidth: 2,
    }
})