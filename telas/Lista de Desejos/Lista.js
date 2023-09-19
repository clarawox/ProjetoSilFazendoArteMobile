import React from 'react';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import Cabecalho from '../../src/componentes/Cabecalho';
import Item from './Item';
import { ScrollView } from 'react-native';
import bolsa1 from '../../assets/produtos/bolsa1.png';
import bolsa2 from '../../assets/produtos/bolsa2.png';
import bolsa3 from '../../assets/produtos/bolsa3.png';
import tapete1 from '../../assets/produtos/tapete1.png';
import tapete2 from '../../assets/produtos/tapete2.png';

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
    {
        id: 4,
        img: tapete1,
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche no formato circular na cor bege",
        quantidade: 2
    },
    {
        id: 5,
        img: tapete2,
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
            keyExtractor={({ id }) => (String(id))}
        />
    </SafeAreaView>
}