import React from 'react';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import Cabecalho from '../../src/componentes/Cabecalho';
import Item from './Item';

const produtos = [
    {
        id: 1,
        img: require('../../assets/produtos/bolsa1.png'),
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche azul no formato retangular com fivela metálica",
        quantidade: 1
    },
    {
        id: 2,
        img: require('../../assets/produtos/bolsa2.png'),
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche branca no formato circular",
        quantidade: 2
    },
    {
        id: 3,
        img: require('../../assets/produtos/bolsa3.png'),
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche rosa no formato retangular",
        quantidade: 2
    },
    {
        id: 4,
        img: require('../../assets/produtos/bolsa1.png'),
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche no formato circular na cor bege",
        quantidade: 2
    },
    {
        id: 5,
        img: require('../../assets/produtos/bolsa2.png'),
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche retangular com babados floridos",
        quantidade: 1
    },
];

export default function ListaDeDesejos() {
    return <SafeAreaView>
        <StatusBar />
        <Cabecalho />
        <FlatList
            data={produtos}
            renderItem={({ item }) => (<Item {...item} />)}
            keyExtractor={({ key }) => (String(key))}
        />
    </SafeAreaView>
}