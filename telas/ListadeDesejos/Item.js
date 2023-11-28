import React, { useState } from "react";

import { View, Button, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Texto from '../../src/componentes/Texto';
import estilosMinhaCesta from "../MinhaCesta/estilosMinhaCesta";
import CampoInteiro from "../../src/componentes/CampoInteiro";

export default function Item({ id, nome, descricao, preco, img }) {

    const [quantidade, setQuantidade] = useState(1);

    const [total, setTotal] = useState(preco);

    const [expandir, setExpandir] = useState(false);

    const calculaTotal = (quantidade) => { setTotal(quantidade * preco); }

    const atualizaQtdeTotal = (novaQtde) => {
        setQuantidade(novaQtde);
        calculaTotal(novaQtde);
    }

    //metodo abre e fecha
    const inverteExpandir = () => {
        setExpandir(!expandir);

        //retorna a quantidade para o estado padrão
        atualizaQtdeTotal(1);
    }

    async function addListaDesejos(id, nome, preco, descricao, quantidade) {
        const addProd = [{
            id: id,
            img: img,
            nome: nome,
            preco: preco,
            descricao: descricao,
            quantidade: quantidade,
        }]


        const listaDesejosSalva = await AsyncStorage.getItem('ListaDesejos');
        console.log(listaDesejosSalva);

        if (listaDesejosSalva !== null) {
            const listaDesejos = JSON.parse(listaDesejosSalva);

            listaDesejos.push({ id: id, nome: nome, preco: preco, descricao: descricao, quantidade: quantidade });

            const listaAtualizada = JSON.stringify(listaDesejos);
            await AsyncStorage.setItem('ListaDesejos', listaAtualizada);
            console.log('Inseriu mais um item na lista');
            console.log(listaAtualizada);

        } else {
            const listaAtualizada = JSON.stringify(addProd);
            await AsyncStorage.setItem('ListaDesejos', listaAtualizada);
            console.log('Inseriu o item na lista');
        }
    }

    return <>
        <TouchableOpacity style={estilosMinhaCesta.margem} onPress={inverteExpandir}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 25 }}>
                <Image style={estilosMinhaCesta.image} source={img} />
                <Texto style={estilosMinhaCesta.nome}>{nome}</Texto>
            </View>
            <Texto style={estilosMinhaCesta.descricao}>{descricao}</Texto>
            <Texto style={estilosMinhaCesta.preco}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco)}</Texto>
        </TouchableOpacity>

        {expandir &&
            <View style={estilosMinhaCesta.listaDesejos}>
                <View style={estilosMinhaCesta.posicao}>
                    <Texto>Quantidade: </Texto>
                    <CampoInteiro valor={quantidade} acao={atualizaQtdeTotal} />
                    <Texto>|   Total: </Texto>
                    <Texto>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</Texto>
                </View>

                <Button title="Adicionar" onPress={() => addListaDesejos(id, nome, preco, descricao, quantidade)} /> 
            </View>
        }
        <View style={estilosMinhaCesta.divisor}></View>

    </>

}