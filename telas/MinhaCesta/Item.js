import React, { useState } from "react";

import { View, Button, Image } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import Texto from '../../src/componentes/Texto';
import estilosMinhaCesta from "./estilosMinhaCesta";
import CampoInteiro from "../../src/componentes/CampoInteiro";
import { useNavigation } from '@react-navigation/native';
import Botao from "../../src/componentes/Botao";

export default function Item({ id, nome, descricao, preco, img, quantidade: qtdeInicial }) {
    const navigation = useNavigation();

    const [quantidade, setQuantidade] = useState(qtdeInicial);

    const [total, setTotal] = useState(qtdeInicial * preco);

    const calculaTotal = (quantidade) => { setTotal(quantidade * preco); }

    const atualizaQtdeTotal = (novaQtde) => {
        setQuantidade(novaQtde);
        calculaTotal(novaQtde);
    }

    async function removerItemPeloId(idParaRemover) {
        try {
            // Recupere a lista de desejos do AsyncStorage
            let listaDesejos = JSON.parse(await AsyncStorage.getItem('ListaDesejos')) || [];
            // Encontre o índice do item na lista com base no ID
            const index = listaDesejos.findIndex(Item => Item.id === idParaRemover);
            // Se o item foi encontrado, remova-o da lista de desejos
            if (index !== -1) {
                listaDesejos.splice(index, 1);// Salve a lista atualizada de volta no AsyncStorage
                await AsyncStorage.setItem('ListaDesejos', JSON.stringify(listaDesejos));

                console.log(`Item com ID ${idParaRemover} removido da lista de desejos.`);
            } else {
                console.log(`Nenhum item com ID ${idParaRemover} encontrado na lista de desejos.`);
            }
        } catch (erro) {
            console.error('Erro ao remover item da lista de desejos:', erro.message);
        }
        navigation.reset({index: 0, routes:[{name: 'Minha cesta'}]});
    }

    return <>
        <View style={estilosMinhaCesta.margem}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 25 }}>
                <Image style={estilosMinhaCesta.image} source={img} />
                <Texto style={estilosMinhaCesta.nome}>{nome}</Texto>
            </View>
            <Texto style={estilosMinhaCesta.descricao}>{descricao}</Texto>
            <Texto style={estilosMinhaCesta.preco}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco)}</Texto>
        </View>

        <View style={estilosMinhaCesta.listaDesejos}>
            <View style={estilosMinhaCesta.posicao}>
                <Texto>Quantidade: </Texto>
                <CampoInteiro valor={quantidade} acao={atualizaQtdeTotal} />
                <Texto> |   Total: </Texto>
                <Texto>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</Texto>
            </View>

            <Botao texto='Remover' onPress={()=>removerItemPeloId(id)}/>

        </View>
        <View style={estilosMinhaCesta.divisor}></View>
    </>
}