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
        img: require('../../assets/produtos/kitBanheiro.png'),
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche no formato circular na cor bege",
    },
    {
        id: 5,
        img: require('../../assets/produtos/tapete1.png'),
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche retangular com babados floridos",
    },
    {
        id: 6,
        img: require('../../assets/produtos/tapete2.png'),
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche azul no formato retangular com fivela metálica",
    },
    {
        id: 7,
        img: require('../../assets/produtos/img7.png'),
        nome: "Bolsa de croche",
        preco: 39.90,
        descricao: "Bolsa de croche branca no formato circular",
    },
    {
        id: 8,
        img: require('../../assets/produtos/img9.png'),
        nome: "Kit banheiro",
        preco: 39.90,
        descricao: "Kit banheiro na cor branca e amarela",
    },
    {
        id: 9,
        img: require('../../assets/produtos/img10.png'),
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche no formato circular na cor bege",
    },
    {
        id: 10,
        img: require('../../assets/produtos/img12.png'),
        nome: "Pano de prato",
        preco: 39.90,
        descricao: "Panos de prato bordados",
    },
    {
        id: 11,
        img: require('../../assets/produtos/img13.png'),
        nome: "Pano de prato",
        preco: 39.90,
        descricao: "Panos de prato bordados",
    },
    {
        id: 12,
        img: require('../../assets/produtos/img14.png'),
        nome: "Pano de prato",
        preco: 39.90,
        descricao: "Panos de prato bordados",
    },
    {
        id: 13,
        img: require('../../assets/produtos/img15.png'),
        nome: "Pano de prato",
        preco: 39.90,
        descricao: "Panos de prato bordados",
    },
    {
        id: 14,
        img: require('../../assets/produtos/img16.png'),
        nome: "Tapete de croche",
        preco: 39.90,
        descricao: "Tapete de croche rosa no formato retangular",
    },
    {
        id: 15,
        img: require('../../assets/produtos/img18.png'),
        nome: "Pulseira de miçangas",
        preco: 39.90,
        descricao: "Pulseira feita de miçangas",
    },
    {
        id: 16,
        img: require('../../assets/produtos/img19.png'),
        nome: "Pulseira de miçangas",
        preco: 39.90,
        descricao: "Pulseira feita de miçangas",
    },
    {
        id: 17,
        img: require('../../assets/produtos/img20.png'),
        nome: "Pingente de miçangas",
        preco: 39.90,
        descricao: "Pingente feito de miçangas",
    },
    {
        id: 18,
        img: require('../../assets/produtos/img21.png'),
        nome: "Pingente de miçangas",
        preco: 39.90,
        descricao: "Pingente feito de miçangas",
    },
    {
        id: 19,
        img: require('../../assets/produtos/img22.png'),
        nome: "Chaveiro de piçangas",
        preco: 39.90,
        descricao: "Chaveiro feito de miçangas",
    },
    {
        id: 20,
        img: require('../../assets/produtos/img23.png'),
        nome: "Mobile de miçangas",
        preco: 39.90,
        descricao: "Mobile feito com pingentes.",
    },
    {
        id: 21,
        img: require('../../assets/produtos/img24.png'),
        nome: "Pingente de miçangas",
        preco: 39.90,
        descricao: "Pingente feito miçanga",
    },
    {
        id: 22,
        img: require('../../assets/produtos/img25.png'),
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche retangular com babados floridos",
    },
    {
        id: 23,
        img: require('../../assets/produtos/img26.png'),
        nome: "Tapete de crochê",
        preco: 39.90,
        descricao: "Tapete de banheiro feito de croche retangular com babados floridos",
    },
    {
        id: 24,
        img: require('../../assets/produtos/img27.png'),
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
            keyExtractor={({ id }) => (String(id))}
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