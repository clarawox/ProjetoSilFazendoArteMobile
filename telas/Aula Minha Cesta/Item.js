import React, { useState } from "react";

import { View, Button, Image, ScrollView } from "react-native"

import Texto from '../../src/componentes/Texto';
import estilosMinhaCesta from "./estilosMinhaCesta";
import CampoInteiro from "../../src/componentes/CampoInteiro";

export default function Item({ nome, descricao, preco, img, quantidade: qtdeInicial }) {

    const [quantidade, setQuantidade] = useState(qtdeInicial);

    const [total, setTotal] = useState(qtdeInicial * preco);

    const calculaTotal = (quantidade) => { setTotal(quantidade * preco); }

    const atualizaQtdeTotal = (novaQtde) => {
        setQuantidade(novaQtde);
        calculaTotal(novaQtde);
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
                <Texto>|   Total: </Texto>
                <Texto>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</Texto>
            </View>

            <Button title="Remover" />

        </View>
        <View style={estilosMinhaCesta.divisor}></View>
    </>

}