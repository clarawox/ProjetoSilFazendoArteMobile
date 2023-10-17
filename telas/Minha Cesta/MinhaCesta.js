import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from './Item';
import StatusListaDesejos from '../../src/componentes/StatusListaDesejo';

import bolsa1 from '../../assets/produtos/bolsa1.png';
import bolsa2 from '../../assets/produtos/bolsa2.png';
import bolsa3 from '../../assets/produtos/bolsa3.png';

export default function MinhaCesta() {

    const [lista, setLista] = useState([]);

    const carregaLista = async () => {
        const storedList = await AsyncStorage.getItem('ListaDesejos');
        if (storedList !== null) {
            setLista(JSON.parse(storedList));
        }
    }

    const handleRemoveItem = (itemId) => {
        const updatedList = lista.filter(item => item.id !== itemId);
        setLista(updatedList);
        AsyncStorage.setItem('ListaDesejos', JSON.stringify(updatedList));
    }

    useEffect(() => {
        carregaLista();
    }, [carregaLista]);

    const total = lista.reduce((soma, { preco, quantidade }) => soma + (preco * quantidade), 0);

    return (
        <View style={styles.container}>
            <FlatList
                data={lista}
                renderItem={({ item }) => (<Item {...item} onRemoveItem={handleRemoveItem()}  />)}
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