import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from './Item';
import StatusListaDesejos from '../../src/componentes/StatusListaDesejo';

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
    }
});