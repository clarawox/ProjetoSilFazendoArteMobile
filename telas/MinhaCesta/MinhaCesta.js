import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from './Item';
import Texto from '../../src/componentes/Texto';
import Carrossel from '../../src/mocks/Carrossel';
import StatusListaDesejos from '../../src/componentes/StatusListaDesejo';
import Cabecalho from '../../src/componentes/Cabecalho';

export default function MinhaCesta() {

    const [lista, setLista] = useState([]);

    const carregaLista = async () => {
        const storedList = await AsyncStorage.getItem('ListaDesejos');
        if (storedList !== null) {
            setLista(JSON.parse(storedList));
        }
    }

    useEffect(() => {
        carregaLista();
    }, [carregaLista]);

    const total = lista.reduce((soma, { preco, quantidade }) => soma + (preco * quantidade), 0);

    return (
        <View style={styles.container}>
            <Cabecalho/>
            <Texto style={styles.titulo}> {Carrossel.produtos.tituloCesta} </Texto>
            <FlatList
                data={lista}
                renderItem={({ item }) => (<Item {...item} />)}
                keyExtractor={({ id }) => (String(id))}
            />
            <StatusListaDesejos total={total} />
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
        textAlign: 'center',
    }
});