import React from 'react';
import { SafeAreaView, FlatList, StatusBar, ScrollView, View, StyleSheet } from 'react-native';

import Item from './Item';
import StatusListaDesejos from '../../src/componentes/StatusListaDesejo';

import bolsa1 from '../../assets/produtos/bolsa1.png';
import bolsa2 from '../../assets/produtos/bolsa2.png';
import bolsa3 from '../../assets/produtos/bolsa3.png';

const produtos = [
    {
        id: 1,
        img: bolsa1,
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche azul no formato retangular com fivela metálica",
        quantidade: 1
    },
    {
        id: 2,
        img: bolsa2,
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche branca no formato circular",
        quantidade: 2
    },
    {
        id: 3,
        img: bolsa3,
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche rosa no formato retangular",
        quantidade: 2
    },
];

export default function MinhaCesta() {
    const total = produtos.reduce((soma, { preco, quantidade }) => soma + (preco * quantidade), 0);
    return (
            <View style={styles.container}>
                <StatusListaDesejos />
                <View>
                    
                </View>
    
                <ScrollView>
                    
                </ScrollView>
            </View>
        )
    
    
    // <ScrollView>
    //     <SafeAreaView>
    //         <StatusBar />
    //         <StatusListaDesejos total={total} />
    //         <FlatList
    //             data={produtos}
    //             renderItem={({ item }) => (<Item {...item} />)}
    //             keyExtractor={({ id }) => (String(id))}
    //         />
    //     </SafeAreaView>
    // </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#F2F2F2",
    }
});