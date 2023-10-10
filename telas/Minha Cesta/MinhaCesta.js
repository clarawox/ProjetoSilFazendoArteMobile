import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from './Item';
import StatusListaDesejos from '../../src/componentes/StatusListaDesejo';

import bolsa1 from '../../assets/produtos/bolsa1.png';
import bolsa2 from '../../assets/produtos/bolsa2.png';
import bolsa3 from '../../assets/produtos/bolsa3.png';

// const produtos =[
//     {
//         id: 1,
//         img: bolsa1,
//         nome: "Bolsa de croche",
//         preco: 39.90,
//         descricao: "Bolsa de croche azul no formato retangular com fivela metálica",
//         quantidade: 1
//     },
//     {
//         id: 2,
//         img: bolsa2,
//         nome: "Bolsa de croche",
//         preco: 39.90,
//         descricao: "Bolsa de croche branca no formato circular",
//         quantidade: 2
//     },
//     {
//         id: 3,
//         img: bolsa3,
//         nome: "Bolsa de croche",
//         preco: 39.90,
//         descricao: "Bolsa de croche rosa no formato retangular",
//         quantidade: 1
//     },
// ];

export default function MinhaCesta() {
    
    const [lista, setLista ] = useState([]);

    const carregaLista = async()=>{
        const storedList = await AsyncStorage.getItem('ListaDesejos');
        if(storedList !== null){
            setLista(JSON.parse(storedList));
        }
    }

    useEffect(()=>{
        carregaLista();
    }, []);

    const total = lista.reduce((soma, {preco, quantidade})=>soma+(preco*quantidade), 0);

    return (
        <View style={styles.container}>
            <FlatList
                data={lista}
                renderItem={({ item }) => (<Item {...item} />)}
                keyExtractor={({ key }) => (String(key))}
            />
            <StatusListaDesejos total={total}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#F2F2F2",
    }
});