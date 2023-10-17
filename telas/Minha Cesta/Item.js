import React, { useState } from "react";

import { View, Button, Image } from "react-native"

import Texto from '../../src/componentes/Texto';
import estilosMinhaCesta from "./estilosMinhaCesta";
import CampoInteiro from "../../src/componentes/CampoInteiro";

export default function Item({ id,  nome, descricao, preco, img, quantidade: qtdeInicial, onRemoveItem }) {

    const [quantidade, setQuantidade] = useState(qtdeInicial);

    const [selectedId, setSelectedId] = useState();
    setSelectedId(id + 1)

    const [total, setTotal] = useState(qtdeInicial * preco);

    const calculaTotal = (quantidade) => { setTotal(quantidade * preco); }

    const atualizaQtdeTotal = (novaQtde) => {
        setQuantidade(novaQtde);
        calculaTotal(novaQtde);
    }

    const handleRemoveItem = () => {
        onRemoveItem(selectedId)
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

            <Button onPress={handleRemoveItem} title="Remover" />

        </View>
        <View style={estilosMinhaCesta.divisor}></View>
    </>

}