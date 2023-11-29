import React from 'react';
import { SafeAreaView, FlatList, StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
import Cabecalho from '../../src/componentes/Cabecalho';
import Item from './Item';
import Texto from '../../src/componentes/Texto';
import Carrossel from '../../src/mocks/Carrossel';

const produtos = [
    {
        id: 1,
        img: require('../../assets/produtos/bolsa1.png'),
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche azul no formato retangular com fivela metálica",
    },
    {
        id: 2,
        img: require('../../assets/produtos/bolsa2.png'),
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche branca no formato circular",
    },
    {
        id: 3,
        img: require('../../assets/produtos/bolsa3.png'),
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche rosa no formato retangular",
    },
    {
        id: 4,
        img: require('../../assets/produtos/bolsa1.png'),
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche no formato circular na cor bege",
    },
    {
        id: 5,
        img: require('../../assets/produtos/bolsa2.png'),
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche retangular com babados floridos",
    },
];

export default function Produtos() {
    return <SafeAreaView>
        <StatusBar />
        <Cabecalho />
        <Texto style={styles.titulo}> {Carrossel.produtos.tituloProd} </Texto>
        <FlatList
            data={produtos}
            renderItem={({ item }) => (<Item {...item} />)}
            keyExtractor={({ key }) => (String(key))}
        />
    </SafeAreaView>
};

const styles = StyleSheet.create({
    titulo: {
        paddingTop: 30,
        paddingBottom: 10,
        fontSize: 26,
        fontWeight: "bold",
        color: '#660066',
        textAlign: 'center',
    }
});