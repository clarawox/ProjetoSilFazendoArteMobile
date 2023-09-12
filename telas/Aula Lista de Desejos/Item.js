import React, { useState } from "react";

import { View, Button, TouchableOpacity, Image } from "react-native"

import Texto from '../../src/componentes/Texto';
import estilosMinhaCesta from "../Aula Minha Cesta/estilosMinhaCesta";
import CampoInteiro from "../../src/componentes/CampoInteiro";

export default function Item({ nome, descricao, preco, img }) {

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

        //retorna a qiantidade para o estado padrão
        atualizaQtdeTotal(1);
    }

    return <>
        <TouchableOpacity style={estilosMinhaCesta.margem} onPress={inverteExpandir}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding:25}}>
                <Image style={estilosMinhaCesta.image} source={img}/>
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

                <Button title="Adicionar" />

            </View>
        }
        <View style={estilosMinhaCesta.divisor}></View>

    </>

}